import React from 'react';
import { Droplet, HelpCircle, Plus, RotateCcw, Sparkles } from 'lucide-react';

export default function WaterCalculator() {
  const [weight, setWeight] = React.useState<number>(75);
  const [exerciseTime, setExerciseTime] = React.useState<number>(30); // minutes of training
  const [recommended, setRecommended] = React.useState<number>(2.6);  // Liters
  const [loggedAmount, setLoggedAmount] = React.useState<number>(0);  // Liters

  // Hydration Calculation formula
  // Standard is weight in kg * 35 ml + 350 ml for every 30 mins of physical activity
  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const baseRequirement = weight * 0.035; // Liters
    const trainingLoss = (exerciseTime / 30) * 0.35; // 350ml per 30 mins of sweat
    const total = Number((baseRequirement + trainingLoss).toFixed(1));
    setRecommended(total);
  };

  // Recalculate whenever inputs change for real-time responsiveness
  React.useEffect(() => {
    handleCalculate();
  }, [weight, exerciseTime]);

  const addWater = (amount: number) => {
    setLoggedAmount(prev => {
      const next = prev + amount;
      return Number(next.toFixed(2));
    });
  };

  const resetWater = () => {
    setLoggedAmount(0);
  };

  // Log percentage
  const pct = Math.min(100, Math.round((loggedAmount / recommended) * 100));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 animate-fadeIn">
      {/* Parameters (5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl">
              <Droplet className="h-5 w-5 fill-emerald-500/10" />
            </div>
            <div>
              <h2 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">Hydration Target Calculator</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs">Estimate critical hydration levels based on sweat rates.</p>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div>
              <label htmlFor="water-weight" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-350 uppercase tracking-wide mb-2">
                Your Weight (kg)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="water-weight"
                  min="30"
                  max="200"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full px-4 py-3 glass-input text-sm font-semibold dark:text-white"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-zinc-400">kg</span>
              </div>
            </div>

            <div>
              <label htmlFor="water-exercise" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-350 uppercase tracking-wide mb-2">
                Daily Exercise Duration (Minutes)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="water-exercise"
                  min="0"
                  max="300"
                  value={exerciseTime}
                  onChange={(e) => setExerciseTime(Number(e.target.value))}
                  className="w-full px-4 py-3 glass-input text-sm font-semibold dark:text-white"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-zinc-400">Min</span>
              </div>
            </div>
          </form>

          {/* Target Highlight */}
          <div className="p-5 glass-card-emerald text-center space-y-1">
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Your Recommended Intake</span>
            <h3 className="text-3xl font-sans font-extrabold text-zinc-950 dark:text-white">
              {recommended} <span className="text-sm font-semibold text-zinc-500">Liters / day</span>
            </h3>
            <p className="text-[10px] text-zinc-400">Equal to roughly {Math.round(recommended * 4)} large glasses of water.</p>
          </div>
        </div>
      </div>

      {/* Interactive Logger (7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        <div id="water-logger-card" className="glass-card p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">Active Fluid Tracker</h3>
            <button
              onClick={resetWater}
              className="text-xs font-semibold text-zinc-400 hover:text-emerald-500 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Clear Logs
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-4">
            {/* Liquid Fill Animation */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="relative w-40 h-56 border-4 border-zinc-300 dark:border-zinc-700 rounded-b-3xl rounded-t-lg overflow-hidden bg-white/20 dark:bg-zinc-900/40 shadow-inner flex items-end backdrop-blur-md">
                {/* Wave Fluid Fill */}
                <div 
                  className="w-full bg-gradient-to-t from-sky-500 to-emerald-400/80 transition-all duration-500 relative"
                  style={{ height: `${pct}%` }}
                >
                  {pct > 0 && (
                    <div className="absolute top-0 left-0 right-0 h-2.5 bg-white/20 animate-pulse"></div>
                  )}
                </div>
                {/* Centered Percentage Stat */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-extrabold text-zinc-800 dark:text-white drop-shadow-sm">{pct}%</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{loggedAmount}L / {recommended}L</span>
                </div>
              </div>
              <span className="text-xs text-zinc-400 font-medium">Click buttons to hydrate</span>
            </div>

            {/* Quick Log Buttons */}
            <div className="space-y-4">
              <span className="block text-xs font-bold uppercase tracking-wider text-zinc-400">Quick Log Units</span>
              
              <div className="grid grid-cols-1 gap-2.5">
                <button
                  onClick={() => addWater(0.25)}
                  className="py-3 px-4 glass-item hover:scale-[1.02] flex items-center justify-between group transition-all text-sm font-semibold text-zinc-700 dark:text-zinc-200 active:scale-98"
                >
                  <span className="flex items-center gap-2">
                    <Droplet className="h-4 w-4 text-sky-400 group-hover:scale-110 transition-all" /> Standard Glass
                  </span>
                  <span>+ 250 ml</span>
                </button>

                <button
                  onClick={() => addWater(0.5)}
                  className="py-3 px-4 glass-item hover:scale-[1.02] flex items-center justify-between group transition-all text-sm font-semibold text-zinc-700 dark:text-zinc-200 active:scale-98"
                >
                  <span className="flex items-center gap-2">
                    <Droplet className="h-4.5 w-4.5 text-sky-500 group-hover:scale-110 transition-all" /> Large Bottle
                  </span>
                  <span>+ 500 ml</span>
                </button>

                <button
                  onClick={() => addWater(0.75)}
                  className="py-3 px-4 glass-item hover:scale-[1.02] flex items-center justify-between group transition-all text-sm font-semibold text-zinc-700 dark:text-zinc-200 active:scale-98"
                >
                  <span className="flex items-center gap-2">
                    <Droplet className="h-5 w-5 text-indigo-500 group-hover:scale-110 transition-all" /> Sports Shaker
                  </span>
                  <span>+ 750 ml</span>
                </button>
              </div>

              {pct >= 100 && (
                <div id="water-completed-alert" className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs rounded-lg font-medium flex gap-2">
                  <Sparkles className="h-4 w-4 shrink-0" />
                  <span>Hydration goals achieved for today! Incredible work.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
