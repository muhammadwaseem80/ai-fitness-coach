import React from 'react';
import { 
  ArrowRight, Search, Activity, Sparkles, User, Dumbbell, ShieldCheck, Heart, 
  HelpCircle, Quote, RefreshCw, Trophy, Target, BookOpen 
} from 'lucide-react';
import { LOCAL_EXERCISES, FITNESS_TIPS, FAQ_ITEMS, MOTIVATIONAL_QUOTES } from '../data/exercises';
import { Exercise } from '../types';

interface HomeProps {
  setTab: (tab: string) => void;
}

export default function Home({ setTab }: HomeProps) {
  // Quote State
  const [quoteIndex, setQuoteIndex] = React.useState(0);
  const getNewQuote = () => {
    const nextIndex = (quoteIndex + 1) % MOTIVATIONAL_QUOTES.length;
    setQuoteIndex(nextIndex);
  };

  // Exercise Search State
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string>('all');

  // Filtered Exercises
  const filteredExercises = React.useMemo(() => {
    return LOCAL_EXERCISES.filter(exercise => {
      const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            exercise.muscles.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  // Tips Category Filtering
  const [selectedTipCategory, setSelectedTipCategory] = React.useState<string>('all');
  const filteredTips = React.useMemo(() => {
    if (selectedTipCategory === 'all') return FITNESS_TIPS;
    return FITNESS_TIPS.filter(tip => tip.category === selectedTipCategory);
  }, [selectedTipCategory]);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  return (
    <div className="space-y-16 pb-16 animate-fadeIn">
      {/* 1. HERO BANNER */}
      <section id="hero-section" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-emerald-950 text-white py-20 px-8 md:px-12 lg:px-16 shadow-xl border border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> Next-Generation AI Fitness
          </div>
          <h1 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-white">
            Unlock Your Peak Potential with <span className="text-emerald-400 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">AI Coaching</span>
          </h1>
          <p className="text-zinc-300 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            Personalized workout scheduling, scientifically backed diet blueprints, BMI insights, and round-the-clock conversational fitness guidance powered by Google Gemini AI.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              id="hero-cta-workout"
              onClick={() => setTab('workout')}
              className="px-6 py-3.5 rounded-xl font-medium bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all flex items-center gap-2"
            >
              Generate Workout Plan <ArrowRight className="h-4 w-4" />
            </button>
            <button
              id="hero-cta-bmi"
              onClick={() => setTab('bmi')}
              className="px-6 py-3.5 rounded-xl font-medium bg-zinc-800 border border-zinc-700 text-zinc-100 hover:bg-zinc-700 active:scale-95 transition-all"
            >
              Calculate BMI
            </button>
          </div>
        </div>
      </section>

      {/* 2. MOTIVATIONAL QUOTE WIDGET */}
      <section id="motivation-section" className="glass-card-emerald rounded-3xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-500 rounded-xl text-white">
              <Quote className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Today's Motivation</p>
              <p className="text-lg md:text-xl font-medium text-zinc-900 dark:text-zinc-100 italic">
                "{MOTIVATIONAL_QUOTES[quoteIndex]}"
              </p>
            </div>
          </div>
          <button
            id="new-quote-btn"
            onClick={getNewQuote}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-750 transition-colors shadow-sm text-sm font-semibold shrink-0"
          >
            <RefreshCw className="h-4 w-4 text-emerald-500" /> New Quote
          </button>
        </div>
      </section>

      {/* 3. ABOUT & VISION */}
      <section id="about-section" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="font-sans font-bold text-3xl text-zinc-950 dark:text-white tracking-tight">
            An Intelligent Coach in Your Pocket
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed font-light text-base">
            The AI Fitness Coach represents a major leap forward in accessibility and health optimization. By bridging cutting-edge sports science with the reasoning power of artificial intelligence, we deliver custom plans that adapt perfectly to who you are, your lifestyle constraints, and where you want to go.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl glass-item">
              <span className="font-bold text-2xl text-emerald-500 block">100%</span>
              <span className="text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wide">AI Tailored Plans</span>
            </div>
            <div className="p-4 rounded-2xl glass-item">
              <span className="font-bold text-2xl text-emerald-500 block">Instant</span>
              <span className="text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wide">Nutrition Breakdown</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 glass-card hover:scale-[1.02] transition-all duration-300">
            <Trophy className="h-8 w-8 text-emerald-500 mb-4" />
            <h3 className="font-semibold text-lg text-zinc-950 dark:text-white mb-2">Track Milestones</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light">
              Log workouts, body mass index, and daily calories to observe physical progress.
            </p>
          </div>
          <div className="p-6 glass-card hover:scale-[1.02] transition-all duration-300">
            <Target className="h-8 w-8 text-emerald-500 mb-4" />
            <h3 className="font-semibold text-lg text-zinc-950 dark:text-white mb-2">Goal Precision</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light">
              Whether you want fat loss, general health, or maximum athletic strength.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CHROME CORE FEATURES */}
      <section id="features-section" className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-sans font-bold text-3xl text-zinc-950 dark:text-white tracking-tight">Features Configured For You</h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto font-light">Everything you need to master your physical health in one cohesive dashboard.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 glass-card border-t-4 border-t-emerald-500 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300">
            <div>
              <Activity className="h-8 w-8 text-emerald-500 mb-4" />
              <h3 className="font-semibold text-lg text-zinc-900 dark:text-white mb-1">Body Mass Index (BMI)</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light">
                Calculate your precise body mass index and get deep medical and lifestyle context instantly.
              </p>
            </div>
            <button onClick={() => setTab('bmi')} className="mt-4 text-emerald-500 hover:text-emerald-400 font-semibold text-sm inline-flex items-center gap-1.5 self-start">
              Calculate Now <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="p-6 glass-card border-t-4 border-t-emerald-500 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300">
            <div>
              <Heart className="h-8 w-8 text-emerald-500 mb-4" />
              <h3 className="font-semibold text-lg text-zinc-900 dark:text-white mb-1">Calorie Estimation</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light">
                Discover your active metabolic rate and customized target calories for weight shifts.
              </p>
            </div>
            <button onClick={() => setTab('calories')} className="mt-4 text-emerald-500 hover:text-emerald-400 font-semibold text-sm inline-flex items-center gap-1.5 self-start">
              Calculate Now <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="p-6 glass-card border-t-4 border-t-emerald-500 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300">
            <div>
              <Dumbbell className="h-8 w-8 text-emerald-500 mb-4" />
              <h3 className="font-semibold text-lg text-zinc-900 dark:text-white mb-1">AI Workout Planner</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light">
                Generate high-performance 7-day calendars matching gym gear, experience level, and targets.
              </p>
            </div>
            <button onClick={() => setTab('workout')} className="mt-4 text-emerald-500 hover:text-emerald-400 font-semibold text-sm inline-flex items-center gap-1.5 self-start">
              Plan Workouts <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. SEARCH & EXERCISE CATEGORIES */}
      <section id="exercise-library-section" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-sans font-bold text-2xl text-zinc-950 dark:text-white tracking-tight">Interactive Exercise Library</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light">Explore targeted movements, body mechanics, and step-by-step instructions.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['all', 'strength', 'cardio', 'core', 'flexibility'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all border ${
                  selectedCategory === cat 
                    ? 'bg-emerald-500 text-white border-emerald-500' 
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 glass-card p-4 rounded-2xl">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 h-4 w-4" />
            <input
              type="text"
              id="exercise-search-input"
              placeholder="Search exercise or targeted muscle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 glass-input text-sm dark:text-white"
            />
          </div>
          <div>
            <select
              id="difficulty-filter"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 glass-input text-sm dark:text-white"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="text-right flex items-center justify-end text-xs text-zinc-550 dark:text-zinc-400">
            Showing {filteredExercises.length} of {LOCAL_EXERCISES.length} movements
          </div>
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map(exercise => (
            <div 
              key={exercise.id} 
              id={`exercise-card-${exercise.id}`}
              className="p-5 glass-card flex flex-col justify-between hover:scale-[1.01] transition-transform duration-250"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    exercise.category === 'strength' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400' :
                    exercise.category === 'cardio' ? 'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400' :
                    exercise.category === 'core' ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-400' :
                    'bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-400'
                  }`}>
                    {exercise.category}
                  </span>
                  <span className="text-[11px] text-zinc-450 font-medium capitalize">
                    {exercise.difficulty}
                  </span>
                </div>
                <h4 className="font-sans font-bold text-base text-zinc-900 dark:text-white mb-2">{exercise.name}</h4>
                <p className="text-zinc-550 dark:text-zinc-400 text-xs font-light line-clamp-3 mb-4 leading-relaxed">
                  {exercise.instructions}
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1 items-center">
                <span className="text-[10px] font-semibold text-zinc-450 mr-1.5">Targets:</span>
                {exercise.muscles.map(m => (
                  <span key={m} className="bg-white/40 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 text-[10px] px-2 py-0.5 border border-black/5 dark:border-white/5 rounded">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {filteredExercises.length === 0 && (
            <div className="col-span-full py-12 text-center text-zinc-500 dark:text-zinc-400">
              No movements found matching the active search parameters. Try clearing some filters!
            </div>
          )}
        </div>
      </section>

      {/* 6. TRAINER FITNESS TIPS WIDGET */}
      <section id="tips-section" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-sans font-bold text-2xl text-zinc-950 dark:text-white tracking-tight">Expert Fitness Blueprints</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light">Practical nuggets compiled by our sports sciences department.</p>
          </div>
          <div className="flex gap-2">
            {['all', 'workout', 'nutrition', 'mindset', 'recovery'].map(tipCat => (
              <button
                key={tipCat}
                onClick={() => setSelectedTipCategory(tipCat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  selectedTipCategory === tipCat 
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' 
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-350'
                }`}
              >
                {tipCat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTips.map(tip => (
            <div 
              key={tip.id} 
              id={`tip-card-${tip.id}`}
              className="p-6 glass-card flex gap-4 items-start"
            >
              <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg shrink-0">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{tip.category}</span>
                <h4 className="font-semibold text-base text-zinc-900 dark:text-white">{tip.title}</h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light leading-relaxed">{tip.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section id="testimonials-section" className="space-y-8 glass-card py-12 px-6">
        <div className="text-center space-y-2">
          <h2 className="font-sans font-bold text-2xl text-zinc-950 dark:text-white tracking-tight">Loved by Real Athletes</h2>
          <p className="text-zinc-550 dark:text-zinc-400 text-sm max-w-sm mx-auto font-light">See how our custom AI programs are transforming daily training routines.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 glass-item flex flex-col justify-between">
            <p className="text-zinc-600 dark:text-zinc-350 text-sm italic font-light leading-relaxed">
              "The 7-Day AI Workout planner changed my approach. I selected intermediate muscle building, and it calibrated sets and lifts perfectly to what I actually have in my garage."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600 text-sm">
                MK
              </div>
              <div>
                <span className="block text-xs font-semibold text-zinc-900 dark:text-white">Markus K.</span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wide">Amateur Weightlifter</span>
              </div>
            </div>
          </div>
          <div className="p-6 glass-item flex flex-col justify-between">
            <p className="text-zinc-600 dark:text-zinc-350 text-sm italic font-light leading-relaxed">
              "Calculating my active calories and daily fluid volume took seconds. Plus, chatting with the AI Coach gives me immediate healthy substitutes when I crave sweet mid-afternoon snacks."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600 text-sm">
                SL
              </div>
              <div>
                <span className="block text-xs font-semibold text-zinc-900 dark:text-white">Sarah L.</span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wide">Marathon Runner</span>
              </div>
            </div>
          </div>
          <div className="p-6 glass-item flex flex-col justify-between">
            <p className="text-zinc-600 dark:text-zinc-350 text-sm italic font-light leading-relaxed">
              "I used the Diet generator to track 2200 kcal meals. Having ingredients broken out step-by-step saves me 30 minutes of meal planning every single Sunday."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600 text-sm">
                DJ
              </div>
              <div>
                <span className="block text-xs font-semibold text-zinc-900 dark:text-white">Daniel J.</span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wide">Active Professional</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section id="faq-section" className="space-y-6 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="font-sans font-bold text-2xl text-zinc-950 dark:text-white tracking-tight">Frequently Answered Queries</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light">Got questions? We have compiled direct explanations.</p>
        </div>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="glass-card overflow-hidden"
              >
                <button
                  id={`faq-btn-${idx}`}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-medium text-sm text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="h-4.5 w-4.5 text-emerald-500" />
                    {item.question}
                  </span>
                  <ArrowRight className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                {isOpen && (
                  <div id={`faq-answer-${idx}`} className="p-4 pt-0 border-t border-zinc-100 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-light">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA FOOTER JUMP */}
      <section className="p-12 glass-card-emerald text-center space-y-6 shadow-xl shadow-emerald-500/5">
        <h2 className="font-sans font-extrabold text-3xl tracking-tight text-zinc-900 dark:text-white">Ready to Transform Your Fitness Journey?</h2>
        <p className="text-zinc-700 dark:text-emerald-50 max-w-xl mx-auto font-light text-base">
          Start generating premium workout calendars, logging daily stats, and planning healthy nutrient structures with artificial intelligence today.
        </p>
        <button
          onClick={() => setTab('workout')}
          className="px-8 py-4 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-emerald-400 text-sm font-bold shadow-lg shadow-zinc-950/20 active:scale-95 transition-all inline-flex items-center gap-2"
        >
          Create Free Workout Plan <Sparkles className="h-4 w-4" />
        </button>
      </section>
    </div>
  );
}
