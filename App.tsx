import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BMICalculator from './components/BMICalculator';
import CalorieCalculator from './components/CalorieCalculator';
import WaterCalculator from './components/WaterCalculator';
import WorkoutPlanner from './components/WorkoutPlanner';
import DietPlanner from './components/DietPlanner';
import Chatbot from './components/Chatbot';
import ProgressTracker from './components/ProgressTracker';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { TrackerLog } from './types';
import { ArrowUp } from 'lucide-react';

// Seeding standard high-fidelity sample tracker records so that charts and stats show up immediately
const MOCK_INITIAL_LOGS: TrackerLog[] = [
  {
    id: 'log-1',
    date: '2026-07-19',
    weight: 74.2,
    height: 175,
    bmi: 24.2,
    caloriesIntake: 2200,
    caloriesBurned: 500,
    waterIntake: 2.8,
    workoutCompleted: true,
    workoutName: 'Pull Day Hypertrophy'
  },
  {
    id: 'log-2',
    date: '2026-07-18',
    weight: 74.5,
    height: 175,
    bmi: 24.3,
    caloriesIntake: 2350,
    caloriesBurned: 400,
    waterIntake: 2.5,
    workoutCompleted: true,
    workoutName: 'Active Stretch & Core'
  },
  {
    id: 'log-3',
    date: '2026-07-17',
    weight: 74.9,
    height: 175,
    bmi: 24.5,
    caloriesIntake: 2100,
    caloriesBurned: 600,
    waterIntake: 3.2,
    workoutCompleted: true,
    workoutName: 'HIIT Cardio Session'
  },
  {
    id: 'log-4',
    date: '2026-07-16',
    weight: 75.4,
    height: 175,
    bmi: 24.6,
    caloriesIntake: 2250,
    caloriesBurned: 450,
    waterIntake: 2.7,
    workoutCompleted: true,
    workoutName: 'Legs & Glutes Power'
  }
];

export default function App() {
  const [currentTab, setTab] = React.useState<string>('home');
  const [darkMode, setDarkMode] = React.useState<boolean>(true);
  const [logs, setLogs] = React.useState<TrackerLog[]>([]);
  const [showScrollTop, setShowScrollTop] = React.useState<boolean>(false);

  // 1. Initialize Dark Theme & Logs
  React.useEffect(() => {
    // Theme preference check
    const savedTheme = localStorage.getItem('ai_fitness_dark_mode');
    if (savedTheme !== null) {
      const isDark = savedTheme === 'true';
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Default to dark theme for a modern athletic feel
      document.documentElement.classList.add('dark');
    }

    // Logs Initialization
    const savedLogs = localStorage.getItem('ai_fitness_metric_logs');
    if (savedLogs) {
      try {
        setLogs(JSON.parse(savedLogs));
      } catch (err) {
        console.error('Error parsing progress logs', err);
        setLogs(MOCK_INITIAL_LOGS);
      }
    } else {
      // Seed initial mock logs so charts look stunning on first load
      setLogs(MOCK_INITIAL_LOGS);
      localStorage.setItem('ai_fitness_metric_logs', JSON.stringify(MOCK_INITIAL_LOGS));
    }

    // Scroll listener for Scroll to Top button
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Toggle Dark Theme
  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    localStorage.setItem('ai_fitness_dark_mode', String(nextDark));
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // 3. Add Custom Progress Log
  const handleAddCustomLog = (entry: Omit<TrackerLog, 'id' | 'date'>) => {
    const todayStr = new Date().toISOString().split('T')[0];
    
    // Check if we already logged today - if so, let's filter out today's old log to replace it cleanly
    const filteredLogs = logs.filter(log => log.date !== todayStr);

    const newLog: TrackerLog = {
      id: Date.now().toString(),
      date: todayStr,
      ...entry
    };

    const updated = [newLog, ...filteredLogs];
    setLogs(updated);
    localStorage.setItem('ai_fitness_metric_logs', JSON.stringify(updated));
    alert('Day stats saved successfully! Visual chart updated.');
  };

  // 4. Quick weight logger directly from BMI Calc
  const handleAddQuickBmiLog = (entry: { weight: number; height: number; bmi: number }) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const filteredLogs = logs.filter(log => log.date !== todayStr);

    const newLog: TrackerLog = {
      id: Date.now().toString(),
      date: todayStr,
      weight: entry.weight,
      height: entry.height,
      bmi: entry.bmi,
      caloriesIntake: 2200, // standard default
      caloriesBurned: 400,
      waterIntake: 2.5,
      workoutCompleted: false
    };

    const updated = [newLog, ...filteredLogs];
    setLogs(updated);
    localStorage.setItem('ai_fitness_metric_logs', JSON.stringify(updated));
  };

  // 5. Clear tracker logs
  const handleClearLogs = () => {
    if (confirm("Are you sure you want to permanently clear your logged statistics? This cannot be undone.")) {
      setLogs([]);
      localStorage.removeItem('ai_fitness_metric_logs');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col bg-[#f0f4f8] dark:bg-[#0a0f18] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Aesthetic Background Ambient Glowing Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute top-[30%] right-[-100px] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-teal-600/5 dark:bg-teal-600/10 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] left-[-80px] w-[350px] sm:w-[480px] h-[350px] sm:h-[480px] bg-emerald-600/5 dark:bg-emerald-600/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none z-0"></div>

      {/* Navbar Navigation */}
      <div className="relative z-20">
        <Navbar 
          currentTab={currentTab} 
          setTab={setTab} 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
      </div>

      {/* Primary Workspace Container */}
      <main className="relative z-10 flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentTab === 'home' && <Home setTab={setTab} />}
        {currentTab === 'bmi' && <BMICalculator onAddLog={handleAddQuickBmiLog} />}
        {currentTab === 'calories' && <CalorieCalculator />}
        {currentTab === 'water' && <WaterCalculator />}
        {currentTab === 'workout' && <WorkoutPlanner />}
        {currentTab === 'diet' && <DietPlanner />}
        {currentTab === 'chatbot' && <Chatbot />}
        {currentTab === 'tracker' && (
          <ProgressTracker 
            logs={logs} 
            onAddCustomLog={handleAddCustomLog} 
            onClearLogs={handleClearLogs} 
          />
        )}
        {currentTab === 'contact' && <Contact />}
      </main>

      {/* Global Footer */}
      <Footer setTab={setTab} />

      {/* Scroll to Top Trigger */}
      {showScrollTop && (
        <button
          id="scroll-to-top-btn"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-500/20 transition-all hover:-translate-y-1 active:scale-95 animate-fadeIn"
          aria-label="Scroll to Top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
