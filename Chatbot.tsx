import React from 'react';
import { Send, Sparkles, MessageSquare, AlertCircle, Dumbbell, Apple, Trophy, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../types';

export default function Chatbot() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string>('');
  const [confirmClear, setConfirmClear] = React.useState<boolean>(false);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Load chat history from local storage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('ai_fitness_saved_chat_history');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse saved chat history', err);
      }
    } else {
      // Seed first introductory greeting message
      const introMessage: ChatMessage = {
        id: 'intro',
        role: 'model',
        text: "Hello! I am your AI Fitness & Nutrition Coach. I can help answer complex training questions, design stretching routines, suggest healthy food swaps, or keep you motivated. What are your health goals today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([introMessage]);
    }
  }, []);

  // Save chat to local storage whenever message list changes
  const saveChatHistory = (list: ChatMessage[]) => {
    localStorage.setItem('ai_fitness_saved_chat_history', JSON.stringify(list));
  };

  // Scroll to bottom on new message
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    setErrorMsg('');
    const userMessageText = textToSend.trim();
    setInputValue('');

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userMessageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedList = [...messages, newMsg];
    setMessages(updatedList);
    saveChatHistory(updatedList);
    setLoading(true);

    try {
      // Call the server API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessageText,
          // Send latest 6 messages for context to keep payload efficient
          history: updatedList.slice(-6).map(m => ({ role: m.role, text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response. Make sure server is online.');
      }

      const data = await response.json();

      const coachMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: data.reply || "I'm sorry, I couldn't formulate a response. Let me try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const finalMessages = [...updatedList, coachMsg];
      setMessages(finalMessages);
      saveChatHistory(finalMessages);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred while connecting with the Coach.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const clearChat = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
      return;
    }
    const introMessage: ChatMessage = {
      id: 'intro',
      role: 'model',
      text: "Hello! I am your AI Fitness & Nutrition Coach. I can help answer complex training questions, design stretching routines, suggest healthy food swaps, or keep you motivated. What are your health goals today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([introMessage]);
    localStorage.removeItem('ai_fitness_saved_chat_history');
    setConfirmClear(false);
  };

  const promptChips = [
    { text: 'How do I lose fat without losing muscle?', icon: Trophy },
    { text: 'List 5 high-protein vegetarian snacks', icon: Apple },
    { text: 'Give me a 5-minute core burn routine', icon: Dumbbell },
    { text: 'Suggest water target calculation secrets', icon: Sparkles }
  ];

  return (
    <div id="ai-chat-container" className="flex flex-col h-[600px] glass-card overflow-hidden animate-fadeIn shadow-xl shadow-emerald-500/5">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 bg-white/20 dark:bg-zinc-900/40 border-b border-white/10 dark:border-zinc-800/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500 rounded-xl text-white relative">
            <MessageSquare className="h-4.5 w-4.5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-emerald-300 border border-emerald-500 animate-ping"></span>
          </div>
          <div>
            <h3 className="font-sans font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-1.5">
              Active Coach Chat <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.2 rounded font-bold uppercase">Online</span>
            </h3>
            <p className="text-[10px] text-zinc-400">Ask any workout, cardio, recipe, or wellness questions.</p>
          </div>
        </div>
        <button
          id="clear-chat-btn"
          onClick={clearChat}
          className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
            confirmClear 
              ? 'bg-red-500/10 text-red-500 border border-red-500/20 animate-pulse' 
              : 'text-zinc-400 hover:text-red-500'
          }`}
        >
          <RefreshCw className={`h-3 w-3 ${confirmClear ? 'animate-spin' : ''}`} /> 
          {confirmClear ? 'Are you sure? Click again' : 'Reset Chat'}
        </button>
      </div>

      {/* Messages body */}
      <div id="chat-messages-box" className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/5 dark:bg-zinc-950/10">
        {messages.map((msg) => (
          <div
            key={msg.id}
            id={`chat-message-${msg.id}`}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm text-sm leading-relaxed font-light ${
              msg.role === 'user'
                ? 'bg-emerald-500 text-white rounded-br-none shadow-md shadow-emerald-500/10'
                : 'glass-item text-zinc-800 dark:text-zinc-200 rounded-bl-none border border-white/10 dark:border-zinc-800'
            }`}>
              <div className="whitespace-pre-line">{msg.text}</div>
              <span className={`block text-[9px] mt-1.5 text-right font-medium ${
                msg.role === 'user' ? 'text-emerald-100' : 'text-zinc-400'
              }`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div id="chat-loading-bubble" className="flex justify-start">
            <div className="glass-item rounded-bl-none p-4 flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="h-2 w-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
              <span className="text-xs font-light text-zinc-400">Coach is thinking...</span>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-xl flex gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      {messages.length <= 1 && !loading && (
        <div className="px-4 py-2 border-t border-white/10 dark:border-zinc-800/80 bg-white/10 dark:bg-zinc-900/10 flex flex-wrap gap-2">
          {promptChips.map((chip, idx) => {
            const Icon = chip.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip.text)}
                className="px-3 py-1.5 glass-item hover:scale-[1.02] text-xs font-medium text-zinc-600 dark:text-zinc-350 hover:border-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 active:scale-95"
              >
                <Icon className="h-3 w-3" /> {chip.text}
              </button>
            );
          })}
        </div>
      )}

      {/* Message input bar */}
      <form onSubmit={handleFormSubmit} className="p-3 border-t border-white/10 dark:border-zinc-800/80 bg-white/10 dark:bg-zinc-900/40 flex gap-2">
        <input
          type="text"
          id="chat-user-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your fitness question..."
          className="flex-1 px-4 py-2.5 glass-input text-sm dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-emerald-500"
          disabled={loading}
        />
        <button
          id="chat-send-btn"
          type="submit"
          disabled={!inputValue.trim() || loading}
          className="p-3 bg-emerald-500 hover:bg-emerald-450 disabled:bg-zinc-100 dark:disabled:bg-zinc-800 disabled:text-zinc-400 text-white rounded-xl shadow-sm transition-all active:scale-95"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
