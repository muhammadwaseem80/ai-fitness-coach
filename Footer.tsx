import React from 'react';
import { Dumbbell, ShieldCheck, X } from 'lucide-react';

interface FooterProps {
  setTab: (tab: string) => void;
}

export default function Footer({ setTab }: FooterProps) {
  const [modalType, setModalType] = React.useState<'privacy' | 'terms' | null>(null);

  const handleNav = (tabId: string) => {
    setTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-white/10 dark:border-zinc-900/50 bg-white/10 dark:bg-zinc-950/40 text-zinc-600 dark:text-zinc-400 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNav('home')}>
              <div className="p-1.5 bg-emerald-500 rounded-lg text-white">
                <Dumbbell className="h-4.5 w-4.5" />
              </div>
              <span className="font-sans font-bold text-base tracking-tight text-zinc-900 dark:text-white">
                AI <span className="text-emerald-500">Fitness Coach</span>
              </span>
            </div>
            <p className="text-xs font-light leading-relaxed max-w-sm">
              An intelligent, responsive health platform combining physical fitness metrics and deep-learning sports nutritionist models powered safely by Google Gemini AI.
            </p>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Calculators</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => handleNav('bmi')} className="hover:text-emerald-500 transition-colors">
                  Body Mass Index
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('calories')} className="hover:text-emerald-500 transition-colors">
                  Daily Caloric Burn
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('water')} className="hover:text-emerald-500 transition-colors">
                  Hydration Target
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Policy links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Corporate</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => setModalType('privacy')} className="hover:text-emerald-500 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setModalType('terms')} className="hover:text-emerald-500 transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-emerald-500 transition-colors">
                  Contact Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-white/10 dark:border-zinc-800/80 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-zinc-400 font-medium">
          <span>&copy; {new Date().getFullYear()} AI Fitness Coach Corporation. All rights reserved.</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Safe SSL Secured Session
          </span>
        </div>
      </div>

      {/* Corporate Policy Modals */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="glass-card w-full max-w-lg p-6 relative shadow-2xl space-y-4 backdrop-blur-xl">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-400"
            >
              <X className="h-5 w-5" />
            </button>

            {modalType === 'privacy' ? (
              <div className="space-y-3">
                <h3 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">Privacy Policy</h3>
                <div className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 font-light overflow-y-auto max-h-[300px] space-y-3 pr-2">
                  <p><strong>1. Information Collection:</strong> We do not actively transmit or store your personal identity profiles on our servers. All stature measurements, weights, daily water logs, and workout completion indices are stored locally inside your browser's private Web Storage database.</p>
                  <p><strong>2. Google Gemini Processing:</strong> Selecting "Generate AI Workout" or "AI Diet" transmits anonymized stat details (such as age, height, fitness goal, and weight) securely to Google's API engines to generate optimal response plans. No emails, names, or addresses are ever attached.</p>
                  <p><strong>3. Cookies:</strong> Standard web storage caches are utilized exclusively to secure user interface configurations, such as dark/light toggle selections and historical progress logs.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">Terms of Service</h3>
                <div className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 font-light overflow-y-auto max-h-[300px] space-y-3 pr-2">
                  <p><strong>1. Disclaimer of Professional Medical Consultation:</strong> The AI Fitness Coach platform utilizes advanced machine learning systems and general sports science algorithms to generate health guidelines. **Our outputs do not represent qualified medical assessments or dietary prescriptions.**</p>
                  <p><strong>2. User Assumption of Risk:</strong> Performing heavy physical weightlifting, aerobic interval drills, or significant adjustments to macro-nutrition involves inherent health risks. Users are strictly advised to consult with a primary medical practitioner prior to initiating training programs.</p>
                  <p><strong>3. Accuracy of AI outputs:</strong> Artificial intelligence outputs may sometimes generate suggestions with physical inconsistencies. Double check any specific exercise or diet plans before active execution.</p>
                </div>
              </div>
            )}

            <button
              onClick={() => setModalType(null)}
              className="w-full py-2 bg-emerald-500 text-white font-semibold text-xs rounded-lg hover:bg-emerald-400 transition-colors"
            >
              Acknowledge Policy
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
