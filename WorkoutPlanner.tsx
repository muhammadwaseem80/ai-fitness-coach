import React from 'react';
import { Dumbbell, Sparkles, AlertCircle, ChevronDown, ChevronUp, Save, Clock, Trash2, FolderOpen } from 'lucide-react';
import { WorkoutPlan } from '../types';

export default function WorkoutPlanner() {
  const [level, setLevel] = React.useState<string>('intermediate');
  const [goal, setGoal] = React.useState<string>('Muscle Gain');
  const [age, setAge] = React.useState<number>(25);
  const [preferences, setPreferences] = React.useState<string>('');

  const [workoutPlan, setWorkoutPlan] = React.useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string>('');
  const [statusMsg, setStatusMsg] = React.useState<string>('');

  // Day collapse states
  const [openDayIdx, setOpenDayIdx] = React.useState<number | null>(0); // First day open by default

  // Load saved plan from local storage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('ai_fitness_saved_workout_plan');
    if (saved) {
      try {
        setWorkoutPlan(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse saved workout plan', err);
      }
    }
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setStatusMsg('');
    setWorkoutPlan(null);

    try {
      const response = await fetch('/api/workout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level, goal, age, preferences })
      });

      if (!response.ok) {
        throw new Error('Failed to generate plan. Please verify active server configurations.');
      }

      const data = await response.json();
      setWorkoutPlan(data);
      setOpenDayIdx(0); // Open first day
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred while calling the Gemini API Coach.');
    } finally {
      setLoading(false);
    }
  };

  const saveToLocalStorage = () => {
    if (!workoutPlan) return;
    localStorage.setItem('ai_fitness_saved_workout_plan', JSON.stringify(workoutPlan));
    setStatusMsg('Workout plan saved to browser storage!');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const deleteSavedPlan = () => {
    localStorage.removeItem('ai_fitness_saved_workout_plan');
    setWorkoutPlan(null);
    setStatusMsg('Saved plan removed.');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 animate-fadeIn">
      {/* Selection Panel (5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl">
              <Dumbbell className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">AI Workout Architect</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs">Calibrate a bespoke 7-day program using AI.</p>
            </div>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            {/* Level Selector */}
            <div>
              <label htmlFor="workout-level" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-350 uppercase tracking-wide mb-2">
                Your Fitness Level
              </label>
              <select
                id="workout-level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-3 glass-input text-sm font-semibold dark:text-white"
              >
                <option value="beginner">Beginner (New to training / Returning)</option>
                <option value="intermediate">Intermediate (Consistent lifting or sports history)</option>
                <option value="advanced">Advanced (Heavy lifter / High metabolic capacity)</option>
              </select>
            </div>

            {/* Goal Selector */}
            <div>
              <label htmlFor="workout-goal" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-350 uppercase tracking-wide mb-2">
                Primary Objective
              </label>
              <select
                id="workout-goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-4 py-3 glass-input text-sm font-semibold dark:text-white"
              >
                <option value="Weight Loss">Weight Loss (Fat reduction, conditioning)</option>
                <option value="Muscle Gain">Muscle Gain (Hypertrophy, structural density)</option>
                <option value="Fat Loss">Fat Loss (Retaining lean mass, vascularity)</option>
                <option value="Strength">Strength (Max lifting power, neurological efficiency)</option>
                <option value="General Fitness">General Fitness (Mobility, cardiorespiratory health)</option>
              </select>
            </div>

            {/* Age */}
            <div>
              <label htmlFor="workout-age" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-350 uppercase tracking-wide mb-1.5">
                Age
              </label>
              <input
                type="number"
                id="workout-age"
                min="10"
                max="90"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-4 py-2.5 glass-input text-sm font-semibold dark:text-white"
                required
              />
            </div>

            {/* Preferences (Text area) */}
            <div>
              <label htmlFor="workout-prefs" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-350 uppercase tracking-wide mb-2">
                Custom Preferences / Gear / Injuries
              </label>
              <textarea
                id="workout-prefs"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                placeholder="e.g. Dumbbells only, At-home, Avoid jumping, Back injury..."
                rows={3}
                className="w-full px-4 py-3 glass-input text-sm dark:text-white placeholder-zinc-400"
              />
            </div>

            <button
              id="generate-workout-btn"
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-white font-bold rounded-xl hover:shadow-lg shadow-emerald-500/10 transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Assembling Program...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" /> Generate 7-Day AI Plan
                </>
              )}
            </button>
          </form>

          {errorMsg && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-lg flex gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      </div>

      {/* Results Display Panel (7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        {workoutPlan ? (
          <div id="workout-plan-display" className="space-y-6 animate-fadeIn">
            {statusMsg && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs rounded-xl font-medium animate-pulse">
                {statusMsg}
              </div>
            )}
            {/* Header Controls */}
            <div className="flex items-center justify-between glass-card p-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">AI Plan Generated</span>
                <h3 className="font-sans font-bold text-lg text-zinc-900 dark:text-white leading-tight">
                  {workoutPlan.title}
                </h3>
              </div>
              <div className="flex gap-2">
                <button
                  id="save-plan-btn"
                  onClick={saveToLocalStorage}
                  className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-250 hover:bg-zinc-50 dark:hover:bg-zinc-750 transition-colors shadow-sm text-xs font-semibold flex items-center gap-1.5"
                  title="Save Plan to Local Storage"
                >
                  <Save className="h-4 w-4 text-emerald-500" /> Save
                </button>
                <button
                  id="delete-plan-btn"
                  onClick={deleteSavedPlan}
                  className="p-2.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/10 transition-colors shadow-sm text-xs font-semibold flex items-center gap-1.5"
                  title="Remove saved workout"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>

            {/* Daily schedule plans */}
            <div className="space-y-3">
              {workoutPlan.plan.map((dayPlan, idx) => {
                const isOpen = openDayIdx === idx;
                return (
                  <div 
                    key={idx} 
                    className="glass-card overflow-hidden"
                  >
                    {/* Header trigger */}
                    <button
                      id={`workout-day-trigger-${idx}`}
                      onClick={() => setOpenDayIdx(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left font-sans font-semibold text-base text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-500 font-extrabold text-sm uppercase tracking-wide">{dayPlan.day}</span>
                        <span className="text-zinc-300 dark:text-zinc-700">|</span>
                        <span className="text-zinc-700 dark:text-zinc-350">{dayPlan.focus}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-light text-zinc-400 mr-1">
                          {dayPlan.exercises.length} Movements
                        </span>
                        {isOpen ? <ChevronUp className="h-5 w-5 text-zinc-400" /> : <ChevronDown className="h-5 w-5 text-zinc-400" />}
                      </div>
                    </button>

                    {/* Drill Exercises */}
                    {isOpen && (
                      <div 
                        id={`workout-day-content-${idx}`}
                        className="p-5 border-t border-white/10 dark:border-zinc-800/85 bg-white/5 dark:bg-zinc-900/10 space-y-4"
                      >
                        {dayPlan.exercises.length === 0 ? (
                          <div className="py-6 text-center text-zinc-400 text-sm font-light">
                            Rest / Active recovery day. Go for a brisk walk, hydrate, and stretch.
                          </div>
                        ) : (
                          dayPlan.exercises.map((ex, exIdx) => (
                            <div 
                              key={exIdx} 
                              className="p-4 glass-item space-y-2 hover:scale-[1.01] transition-all duration-200"
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <h4 className="font-sans font-bold text-zinc-950 dark:text-white text-sm">
                                  {ex.name}
                                </h4>
                                <div className="flex gap-1.5 items-center">
                                  <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] font-bold">
                                    {ex.sets} Sets
                                  </span>
                                  <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] font-bold">
                                    {ex.reps} Reps
                                  </span>
                                  {ex.rest && (
                                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold flex items-center gap-1">
                                      <Clock className="h-2.5 w-2.5" /> Rest: {ex.rest}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <p className="text-zinc-500 dark:text-zinc-400 text-xs font-light leading-relaxed">
                                {ex.instructions}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Trainer Tips */}
            {workoutPlan.tips && workoutPlan.tips.length > 0 && (
              <div className="glass-card-emerald p-6 space-y-3">
                <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> Certified AI Coach Wisdom
                </span>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300 font-light list-disc pl-5 leading-relaxed">
                  {workoutPlan.tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center glass-card p-12 text-center">
            <div className="max-w-xs space-y-3">
              <Dumbbell className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mx-auto" />
              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Generate Custom Program</p>
              <p className="text-xs text-zinc-400">Specify your fitness level and physical objectives above to trigger the server-side Gemini AI coach.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
