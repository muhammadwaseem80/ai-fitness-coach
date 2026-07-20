import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, AlertCircle, Sparkles, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [subject, setSubject] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');

  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending form details to support
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 animate-fadeIn">
      {/* 1. CONTACT CHANNELS (5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="glass-card p-6 space-y-6">
          <div className="space-y-1">
            <h2 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">Get In Touch</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs">Have inquiries or custom enterprise coaching needs?</p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex gap-4 items-start">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Email Address</span>
                <a href="mailto:support@aifitness.coach" className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:text-emerald-500 transition-colors">
                  support@aifitness.coach
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl shrink-0">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Phone Support</span>
                <a href="tel:+18005553488" className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:text-emerald-500 transition-colors">
                  +1 (800) 555-FITT (3488)
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Global Headquarters</span>
                <span className="text-sm font-light text-zinc-700 dark:text-zinc-350">
                  100 Fitness Way, Suite 400<br />Silicon Valley, CA 94025
                </span>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="pt-6 border-t border-white/10 dark:border-zinc-800/80 space-y-2">
            <span className="block text-xs font-bold uppercase tracking-wider text-zinc-400">Social Connections</span>
            <div className="flex gap-3">
              {['Twitter', 'Instagram', 'YouTube', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href={`https://${social.toLowerCase()}.com`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 glass-item hover:scale-[1.02] hover:bg-emerald-500 hover:text-white dark:text-zinc-350 text-zinc-700 text-xs font-medium transition-all"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Vector/Iframe Map Placeholder */}
        <div id="map-section-placeholder" className="overflow-hidden glass-card h-48 relative flex items-center justify-center text-center hover:scale-[1.01] transition-all duration-200">
          {/* We can use standard stylized Google map embed placeholder */}
          <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-950 opacity-40"></div>
          <div className="relative z-10 max-w-xs space-y-2 p-4">
            <MapPin className="h-8 w-8 text-emerald-500 mx-auto" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Active Google Map</h4>
            <p className="text-[10px] text-zinc-400 leading-normal">Our sports science labs are situated in Mountain View, California. Stop by for complete bodily VO2 max training assessments.</p>
          </div>
        </div>
      </div>

      {/* 2. FORM PANEL (7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        <div className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-2.5">
            <MessageSquare className="h-5 w-5 text-emerald-500" />
            <h3 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">Inquire Or Submit Feedback</h3>
          </div>

          {submitted ? (
            <div id="contact-success-card" className="p-6 glass-card-emerald text-center space-y-4 animate-scaleUp">
              <div className="h-12 w-12 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-base text-zinc-900 dark:text-white">Inquiry Sent Successfully!</h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs font-light max-w-md mx-auto leading-relaxed">
                  Thank you for contacting the AI Fitness Coach support squad. A human sports science representative will review your message and reach back within 24 business hours.
                </p>
              </div>
              <button
                id="reset-contact-btn"
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold rounded-lg transition-all"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-zinc-600 dark:text-zinc-350 uppercase tracking-wide mb-1.5">Full Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 glass-input text-sm dark:text-white font-semibold"
                    placeholder="e.g. Markus Aurelius"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-zinc-600 dark:text-zinc-350 uppercase tracking-wide mb-1.5">Email Address</label>
                  <input
                    type="email"
                    id="contact-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 glass-input text-sm dark:text-white font-semibold"
                    placeholder="e.g. mark@gmail.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-semibold text-zinc-600 dark:text-zinc-350 uppercase tracking-wide mb-1.5">Subject</label>
                <input
                  type="text"
                  id="contact-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 glass-input text-sm dark:text-white font-semibold"
                  placeholder="e.g. Enterprise Gym Program partnership"
                  required
                />
              </div>

              <div>
                <label htmlFor="contact-msg" className="block text-xs font-semibold text-zinc-600 dark:text-zinc-350 uppercase tracking-wide mb-1.5">Your Message</label>
                <textarea
                  id="contact-msg"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 glass-input text-sm dark:text-white placeholder-zinc-450"
                  placeholder="How can we help optimize your daily athletic routine..."
                  required
                />
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-white font-bold rounded-xl active:scale-98 hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Transmitting Message...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Dispatch support request
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
