import React from 'react';
import { Apple, Sparkles, AlertCircle, Save, Trash2, Droplet, Dumbbell, ShieldCheck, PieChart } from 'lucide-react';
import { DietPlan } from '../types';

export default function DietPlanner() {
  const [age, setAge] = React.useState<number>(25);
  const [weight, setWeight] = React.useState<number>(75);
  const [height, setHeight] = React.useState<number>(175);
  const [goal, setGoal] = React.useState<string>('Muscle Gain');
  const [dietaryPreference, setDietaryPreference] = React.useState<string>('none');

  const [dietPlan, setDietPlan] = React.useState<DietPlan | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string>('');
  const [statusMsg, setStatusMsg] = React.useState<string>('');

  // Load saved diet from local storage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('ai_fitness_saved_diet_plan');
    if (saved) {
      try {
        setDietPlan(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse saved diet plan', err);
      }
    }
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setStatusMsg('');
    setDietPlan(null);

    try {
      const response = await fetch('/api/diet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age, weight, height, goal, dietaryPreference })
      });

      if (!response.ok) {
        throw new Error('Failed to generate plan. Please verify active server configurations.');
      }

      const data = await response.json();
      setDietPlan(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred while calling the Gemini API Coach.');
    } finally {
      setLoading(false);
    }
  };

  const saveToLocalStorage = () => {
    if (!dietPlan) return;
    localStorage.setItem('ai_fitness_saved_diet_plan', JSON.stringify(dietPlan));
    setStatusMsg('Diet plan saved to browser storage!');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const deleteSavedPlan = () => {
    localStorage.removeItem('ai_fitness_saved_diet_plan');
    setDietPlan(null);
    setStatusMsg('Saved diet plan removed.');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 animate-fadeIn">
      {/* Parameter Panel (5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl">
              <Apple className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">AI Nutritionist Architect</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs">Formulate healthy metabolic templates using AI.</p>
            </div>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            {/* Input fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="diet-age" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-350 uppercase tracking-wide mb-1.5">
                  Age
                </label>
                <input
                  type="number"
                  id="diet-age"
                  min="10"
                  max="90"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-4 py-2.5 glass-input text-sm font-semibold dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="diet-weight" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-350 uppercase tracking-wide mb-1.5">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  id="diet-weight"
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
              <label htmlFor="diet-height" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-350 uppercase tracking-wide mb-1.5">
                Height (cm)
              </label>
              <input
                type="number"
                id="diet-height"
                min="100"
                max="250"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full px-4 py-2.5 glass-input text-sm font-semibold dark:text-white"
                required
              />
            </div>

            {/* Goal */}
            <div>
              <label htmlFor="diet-goal" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-350 uppercase tracking-wide mb-2">
                Primary Objective
              </label>
              <select
                id="diet-goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-4 py-3 glass-input text-sm font-semibold dark:text-white"
              >
                <option value="Weight Loss">Weight Loss (Mild caloric deficit)</option>
                <option value="Muscle Gain">Muscle Gain (Clean bulk, protein focused)</option>
                <option value="Fat Loss">Fat Loss (Keto, low carb, lean preservation)</option>
                <option value="Strength">Strength (Fueling heavy loads, recovery focus)</option>
                <option value="General Fitness">General Fitness (Equilibrium daily fuel)</option>
              </select>
            </div>

            {/* Dietary Preference */}
            <div>
              <label htmlFor="diet-pref" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-350 uppercase tracking-wide mb-2">
                Dietary Restriction
              </label>
              <select
                id="diet-pref"
                value={dietaryPreference}
                onChange={(e) => setDietaryPreference(e.target.value)}
                className="w-full px-4 py-3 glass-input text-sm font-semibold dark:text-white"
              >
                <option value="none">No Restrictions (Standard Omnivore)</option>
                <option value="vegetarian">Vegetarian (No meat, plant-based)</option>
                <option value="vegan">Vegan (No animal derivatives)</option>
                <option value="keto">Keto (High fat, ultra low carbohydrate)</option>
                <option value="gluten-free">Gluten-Free</option>
                <option value="dairy-free">Dairy-Free</option>
              </select>
            </div>

            <button
              id="generate-diet-btn"
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-white font-bold rounded-xl hover:shadow-lg shadow-emerald-500/10 transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Formulating Plan...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" /> Generate Meal Template
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

      {/* Results Side (7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        {dietPlan ? (
          <div id="diet-plan-display" className="space-y-6 animate-fadeIn">
            {statusMsg && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs rounded-xl font-medium animate-pulse">
                {statusMsg}
              </div>
            )}
            {/* Header Controls */}
            <div className="flex items-center justify-between glass-card p-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">AI Nutrition Plan</span>
                <h3 className="font-sans font-bold text-lg text-zinc-900 dark:text-white leading-tight">
                  Target: {dietPlan.goal}
                </h3>
              </div>
              <div className="flex gap-2">
                <button
                  id="save-diet-btn"
                  onClick={saveToLocalStorage}
                  className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-250 hover:bg-zinc-50 dark:hover:bg-zinc-750 transition-colors shadow-sm text-xs font-semibold flex items-center gap-1.5"
                  title="Save Meal Plan to Local Storage"
                >
                  <Save className="h-4 w-4 text-emerald-500" /> Save
                </button>
                <button
                  id="delete-diet-btn"
                  onClick={deleteSavedPlan}
                  className="p-2.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/10 transition-colors shadow-sm text-xs font-semibold flex items-center gap-1.5"
                  title="Remove saved diet plan"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>

            {/* Macro Percentages Ring/Bar */}
            {dietPlan.macroRatio && (
              <div className="glass-card p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <PieChart className="h-4 w-4 text-emerald-500" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Target Macro Distribution</h4>
                </div>
                <div className="h-4 w-full bg-zinc-100 rounded-full overflow-hidden flex text-[10px] text-white font-bold">
                  <div className="bg-emerald-500 flex items-center justify-center transition-all" style={{ width: `${dietPlan.macroRatio.carbs}%` }}>
                    Carbs {dietPlan.macroRatio.carbs}%
                  </div>
                  <div className="bg-orange-500 flex items-center justify-center transition-all" style={{ width: `${dietPlan.macroRatio.protein}%` }}>
                    Protein {dietPlan.macroRatio.protein}%
                  </div>
                  <div className="bg-sky-500 flex items-center justify-center transition-all" style={{ width: `${dietPlan.macroRatio.fat}%` }}>
                    Fat {dietPlan.macroRatio.fat}%
                  </div>
                </div>
              </div>
            )}

            {/* Meals breakdown list */}
            <div className="space-y-4">
              {/* Breakfast, Lunch, Dinner */}
              {[
                { label: 'Breakfast Meal', key: 'breakfast', meal: dietPlan.breakfast },
                { label: 'Lunch Meal', key: 'lunch', meal: dietPlan.lunch },
                { label: 'Dinner Meal', key: 'dinner', meal: dietPlan.dinner },
              ].map(item => (
                <div 
                  key={item.key} 
                  className="glass-card p-5 space-y-3"
                >
                  <div className="flex justify-between items-center pb-2.5 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-xs font-extrabold text-emerald-500 uppercase tracking-widest">{item.label}</span>
                    <div className="flex gap-1.5 text-[10px] font-bold">
                      <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-500">
                        {item.meal.calories} kcal
                      </span>
                      <span className="bg-emerald-500/10 px-2 py-0.5 rounded text-emerald-500">
                        Protein: {item.meal.protein}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-sans font-bold text-base text-zinc-950 dark:text-white">{item.meal.name}</h4>
                  <div className="space-y-1">
                    <span className="block text-[10px] font-bold uppercase text-zinc-400">Ingredients:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.meal.ingredients.map((ing, idx) => (
                        <span key={idx} className="glass-item text-zinc-600 dark:text-zinc-350 text-xs px-2.5 py-1">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Snacks array */}
              {dietPlan.snacks && dietPlan.snacks.length > 0 && (
                <div className="glass-card p-5 space-y-4">
                  <span className="block text-xs font-extrabold text-emerald-500 uppercase tracking-widest pb-2 border-b border-zinc-100 dark:border-zinc-800">Healthy Snacks</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dietPlan.snacks.map((snack, idx) => (
                      <div key={idx} className="p-3 glass-item space-y-2 hover:scale-[1.01] transition-all duration-200">
                        <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400">
                          <span>Snack {idx + 1}</span>
                          <span>{snack.calories} kcal</span>
                        </div>
                        <h5 className="font-semibold text-sm text-zinc-900 dark:text-white">{snack.name}</h5>
                        <div className="flex flex-wrap gap-1">
                          {snack.ingredients.map((ing, ingIdx) => (
                            <span key={ingIdx} className="bg-white/20 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-white/10 dark:border-zinc-750 text-[10px] text-zinc-500 dark:text-zinc-350">
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Protein recommendations and water target */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 glass-card-sky rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-sky-500">
                  <Droplet className="h-5 w-5 fill-sky-500/10" />
                  <h4 className="font-semibold text-sm">Recommended Daily Hydration</h4>
                </div>
                <p className="text-2xl font-sans font-extrabold text-zinc-950 dark:text-white">
                  {dietPlan.waterIntake} <span className="text-xs font-semibold text-zinc-500">Liters / day</span>
                </p>
                <p className="text-xs text-zinc-500 leading-normal font-light">Critical for muscle cell volume, cardiovascular function, and metabolic clearance.</p>
              </div>

              <div className="p-5 glass-card-emerald rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-500">
                  <Dumbbell className="h-5 w-5" />
                  <h4 className="font-semibold text-sm">Target Protein Synthesis</h4>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                  {dietPlan.proteinRecommendation}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center glass-card p-12 text-center">
            <div className="max-w-xs space-y-3">
              <Apple className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mx-auto" />
              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Formulate Meal Structure</p>
              <p className="text-xs text-zinc-400">Provide your bio-metrics and fitness targets to let Gemini generate a certified athletic meal plan.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
