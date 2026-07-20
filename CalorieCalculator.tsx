import React from 'react';
import { Flame, Scale, TrendingUp, Sparkles, User, Info, AlertCircle } from 'lucide-react';

export default function CalorieCalculator() {
  const [age, setAge] = React.useState<number>(25);
  const [gender, setGender] = React.useState<'male' | 'female'>('male');
  const [height, setHeight] = React.useState<number>(175);
  const [weight, setWeight] = React.useState<number>(75);
  const [activity, setActivity] = React.useState<string>('moderate');

  const [results, setResults] = React.useState<{
    bmr: number;
    maintenance: number;
    weightLoss: number;
    weightGain: number;
  } | null>(null);

  const [activeMetric, setActiveMetric] = React.useState<'maintenance' | 'loss' | 'gain'>('maintenance');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    // Mifflin-St Jeor Formula
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    // Activity Multipliers
    let multiplier = 1.2;
    if (activity === 'sedentary') multiplier = 1.2;
    else if (activity === 'light') multiplier = 1.375;
    else if (activity === 'moderate') multiplier = 1.55;
    else if (activity === 'very') multiplier = 1.725;
    else if (activity === 'extra') multiplier = 1.9;

    const maintenance = Math.round(bmr * multiplier);
    const weightLoss = Math.round(maintenance - 500); // 500 kcal deficit
    const weightGain = Math.round(maintenance + 500);  // 500 kcal surplus

    setResults({
      bmr: Math.round(bmr),
      maintenance,
      weightLoss,
      weightGain
    });
  };

  // Get current active details
  const getActiveMetricDetails = () => {
    if (!results) return null;
    if (activeMetric === 'maintenance') {
      return {
        title: 'Weight Maintenance',
        desc: 'Sustain your current body mass index while fueling active exercises.',
        value: results.maintenance,
        carbPct: 50,
        proteinPct: 25,
        fatPct: 25,
        colorClass: 'text-emerald-500 border-emerald-500 bg-emerald-500/10'
      };
    } else if (activeMetric === 'loss') {
      return {
        title: 'Healthy Weight Loss',
        desc: 'Provides a standard 500 calorie deficit to burn localized fat stores sustainably.',
        value: results.weightLoss,
        carbPct: 40,
        proteinPct: 35,
        fatPct: 25,
        colorClass: 'text-rose-500 border-rose-500 bg-rose-500/10'
      };
    } else {
      return {
        title: 'Muscular Weight Gain',
        desc: 'Establishes a 500 calorie surplus to drive protein synthesis and muscle building.',
        value: results.weightGain,
        carbPct: 55,
        proteinPct: 25,
        fatPct: 20,
        colorClass: 'text-sky-500 border-sky-500 bg-sky-500/10'
      };
    }
  };

  const currentMetric = getActiveMetricDetails();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 animate-fadeIn">
      {/* Parameters (5 columns) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">Active Calorie Estimator</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs">Calculate your daily Total Energy Expenditure (TDEE).</p>
            </div>
          </div>

          <form onSubmit={handleCalculate} className="space-y-4">
            {/* Gender Toggle */}
            <div>
              <span className="block text-xs font-semibold text-zinc-700 dark:text-zinc-350 uppercase tracking-wide mb-2">
                Biological Gender
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  id="gender-male"
                  onClick={() => setGender('male')}
                  className={`py-3 rounded-xl border text-sm font-semibold transition-all ${
                    gender === 'male'
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/25'
                      : 'bg-white/30 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border-white/20 dark:border-white/5'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  id="gender-female"
                  onClick={() => setGender('female')}
                  className={`py-3 rounded-xl border text-sm font-semibold transition-all ${
                    gender === 'female'
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/25'
                      : 'bg-white/30 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border-white/20 dark:border-white/5'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cal-age" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-350 uppercase tracking-wide mb-1.5">
                  Age
                </label>
                <input
                  type="number"
                  id="cal-age"
                  min="10"
                  max="100"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-4 py-2.5 glass-input text-sm font-semibold dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="cal-weight" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-350 uppercase tracking-wide mb-1.5">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  id="cal-weight"
                  min="30"
                  max="200"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full px-4 py-2.5 glass-input text-sm font-semibold dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="cal-height" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-350 uppercase tracking-wide mb-1.5">
                Height (cm)
              </label>
              <input
                type="number"
                id="cal-height"
                min="100"
                max="250"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full px-4 py-2.5 glass-input text-sm font-semibold dark:text-white"
                required
              />
            </div>

            {/* Activity Select */}
            <div>
              <label htmlFor="cal-activity" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-350 uppercase tracking-wide mb-1.5">
                Weekly Activity Level
              </label>
              <select
                id="cal-activity"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full px-4 py-3 glass-input text-sm font-semibold dark:text-white"
              >
                <option value="sedentary">Sedentary (No exercise / Office Job)</option>
                <option value="light">Lightly Active (Light exercise 1-3 days/week)</option>
                <option value="moderate">Moderately Active (Moderate exercise 3-5 days/week)</option>
                <option value="very">Very Active (Hard workouts 6-7 days/week)</option>
                <option value="extra">Extra Active (Brutal workouts & physical occupation)</option>
              </select>
            </div>

            <button
              id="calculate-calories-btn"
              type="submit"
              className="w-full py-3.5 mt-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl hover:shadow-lg shadow-emerald-500/10 active:scale-98 transition-all"
            >
              Calculate Daily Calories
            </button>
          </form>
        </div>
      </div>

      {/* Results (7 columns) */}
      <div className="lg:col-span-7 space-y-6">
        {results ? (
          <div className="space-y-6">
            <div id="calorie-results-card" className="glass-card p-6 space-y-6 animate-fadeIn">
              <h3 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">Your Caloric Expenditure Profile</h3>

              {/* Stat Tab Selector */}
              <div className="grid grid-cols-3 gap-2 p-1.5 glass-item">
                <button
                  id="tab-maintenance"
                  onClick={() => setActiveMetric('maintenance')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    activeMetric === 'maintenance'
                      ? 'bg-white dark:bg-zinc-700 text-emerald-500 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  Maintenance
                </button>
                <button
                  id="tab-loss"
                  onClick={() => setActiveMetric('loss')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    activeMetric === 'loss'
                      ? 'bg-white dark:bg-zinc-700 text-rose-500 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  Weight Loss
                </button>
                <button
                  id="tab-gain"
                  onClick={() => setActiveMetric('gain')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    activeMetric === 'gain'
                      ? 'bg-white dark:bg-zinc-700 text-sky-500 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  Muscle Gain
                </button>
              </div>

              {/* Interactive Selected Target Stat */}
              {currentMetric && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-5 glass-item">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Target Daily Intake</span>
                      <h4 className="font-sans font-extrabold text-3xl md:text-4xl text-zinc-950 dark:text-white mt-1">
                        {currentMetric.value} <span className="text-sm font-medium text-zinc-500">kcal / day</span>
                      </h4>
                    </div>
                    <div className={`px-4 py-2.5 rounded-xl border font-bold text-sm ${currentMetric.colorClass}`}>
                      {currentMetric.title}
                    </div>
                  </div>

                  <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light leading-relaxed">
                    {currentMetric.desc}
                  </p>

                  {/* Macro Split Breakdown */}
                  <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                    <span className="block text-xs font-bold uppercase tracking-wider text-zinc-400">Recommended Daily Macro Ratio</span>
                    <div className="h-6 w-full rounded-lg overflow-hidden flex text-white text-[10px] font-bold">
                      <div className="bg-emerald-500 flex items-center justify-center transition-all" style={{ width: `${currentMetric.carbPct}%` }}>
                        Carbs {currentMetric.carbPct}%
                      </div>
                      <div className="bg-orange-500 flex items-center justify-center transition-all" style={{ width: `${currentMetric.proteinPct}%` }}>
                        Protein {currentMetric.proteinPct}%
                      </div>
                      <div className="bg-sky-500 flex items-center justify-center transition-all" style={{ width: `${currentMetric.fatPct}%` }}>
                        Fats {currentMetric.fatPct}%
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center pt-1 text-xs">
                      <div>
                        <span className="block text-zinc-400 font-medium">Carbohydrates</span>
                        <span className="font-bold text-zinc-800 dark:text-white">{Math.round((currentMetric.value * (currentMetric.carbPct / 100)) / 4)}g</span>
                      </div>
                      <div>
                        <span className="block text-zinc-400 font-medium">Protein</span>
                        <span className="font-bold text-zinc-800 dark:text-white">{Math.round((currentMetric.value * (currentMetric.proteinPct / 100)) / 4)}g</span>
                      </div>
                      <div>
                        <span className="block text-zinc-400 font-medium">Healthy Fats</span>
                        <span className="font-bold text-zinc-800 dark:text-white">{Math.round((currentMetric.value * (currentMetric.fatPct / 100)) / 9)}g</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Base Metabolic Info */}
              <div className="p-3 glass-item text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-light flex gap-2">
                <Info className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
                <span>
                  Your calculated **Basal Metabolic Rate (BMR)** is **{results.bmr} kcal**. This represents the absolute baseline energy your body requires simply to function at complete rest without any physical movement.
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center glass-card p-12 text-center">
            <div className="max-w-xs space-y-3">
              <Scale className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mx-auto" />
              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Analyze Daily Calories</p>
              <p className="text-xs text-zinc-400">Specify your statistics, biological gender, and physical habits to calculate your daily metabolic ceiling.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
