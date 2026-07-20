import React from 'react';
import { Menu, X, Dumbbell, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setTab: (tab: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ currentTab, setTab, darkMode, toggleDarkMode }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'bmi', label: 'BMI Calc' },
    { id: 'calories', label: 'Calorie Calc' },
    { id: 'water', label: 'Water Calc' },
    { id: 'workout', label: 'AI Workout' },
    { id: 'diet', label: 'AI Diet' },
    { id: 'chatbot', label: 'AI Coach Chat' },
    { id: 'tracker', label: 'Progress' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: string) => {
    setTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/45 dark:bg-[#0a0f18]/45 border-b border-white/25 dark:border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => handleNavClick('home')}
            id="nav-logo"
          >
            <div className="p-2 bg-emerald-500 rounded-lg text-white group-hover:scale-105 transition-transform shadow-md shadow-emerald-500/20">
              <Dumbbell className="h-5 w-5" />
            </div>
            <span className="font-sans font-bold text-lg tracking-tight text-zinc-950 dark:text-white">
              AI <span className="text-emerald-500">Fitness Coach</span>
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentTab === item.id
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-white/40 dark:hover:bg-white/5 hover:text-zinc-950 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              id="theme-toggle-desktop"
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white/30 dark:bg-white/5 border border-white/25 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:bg-white/50 dark:hover:bg-white/10 transition-all"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-500" />}
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              id="theme-toggle-mobile"
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white/30 dark:bg-white/5 border border-white/25 dark:border-white/10 text-zinc-600 dark:text-zinc-300 transition-all"
            >
              {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-500" />}
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-white/30 dark:hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="lg:hidden px-2 pt-2 pb-4 space-y-1 backdrop-blur-xl bg-white/95 dark:bg-[#0a0f18]/95 border-b border-white/25 dark:border-white/10 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-mobile-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
                currentTab === item.id
                  ? 'bg-emerald-500 text-white'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-white/40 dark:hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
