import React from 'react';
import { Trophy, Scale, Flame, Activity, Sparkles, Plus, Trash2, Calendar, Target, CheckCircle, ListTodo } from 'lucide-react';
import { TrackerLog } from '../types';

interface ProgressTrackerProps {
  logs: TrackerLog[];
  onAddCustomLog: (log: Omit<TrackerLog, 'id' | 'date'>) => void;
  onClearLogs: () => void;
}

export default function ProgressTracker({ logs, onAddCustomLog, onClearLogs }: ProgressTrackerProps) {
  // Input states
  const [weight, setWeight] = React.useState<number>(75);
  const [height, setHeight] = React.useState<number>(175);
  const [calIntake, setCalIntake] = React.useState<number>(2200);
  const [calBurned, setCalBurned] = React.useState<number>(450);
  const [water, setWater] = React.useState<number>(2.5);
  const [workoutDone, setWorkoutDone] = React.useState<boolean>(true);
  const [workoutName, setWorkoutName] = React.useState<string>('Full Body Strength');

  const [confirmClear, setConfirmClear] = React.useState<boolean>(false);

  const handleClear = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
      return;
    }
    onClearLogs();
    setConfirmClear(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Compute BMI
    const hM = height / 100;
    const computedBmi = Number((weight / (hM * hM)).toFixed(1));

    onAddCustomLog({
      weight,
      height,
      bmi: computedBmi,
      caloriesIntake: calIntake,
      caloriesBurned: calBurned,
      waterIntake: water,
      workoutCompleted: workoutDone,
      workoutName: workoutDone ? workoutName : ''
    });

    // Reset input fields slightly
    setWorkoutName('Hypertrophy Upper Body');
  };

  // Summarize stats from logs
  const totalLogs = logs.length;
  const currentWeight = totalLogs > 0 ? logs[0].weight : 75; // Most recent is first
  const initialWeight = totalLogs > 0 ? logs[totalLogs - 1].weight : 75;
  const weightChange = Number((currentWeight - initialWeight).toFixed(1));

  const totalWorkoutsCompleted = logs.filter(l => l.workoutCompleted).length;
  const avgCalIntake = totalLogs > 0 
    ? Math.round(logs.reduce((acc, curr) => acc + curr.caloriesIntake, 0) / totalLogs) 
    : 0;

  // Render SVG Line Chart for weight
  // Order logs by date ascending to plot left-to-right
  const chronologicalLogs = [...logs].reverse();
  const maxWeight = chronologicalLogs.length > 0 ? Math.max(...chronologicalLogs.map(l => l.weight)) + 3 : 85;
  const minWeight = chronologicalLogs.length > 0 ? Math.min(...chronologicalLogs.map(l => l.weight)) - 3 : 65;
  const weightRange = maxWeight - minWeight || 10;

  // Compute SVG Points
  const svgWidth = 500;
  const svgHeight = 150;
  const padding = 20;

  const points = chronologicalLogs.map((log, index) => {
    const x = padding + (index / Math.max(1, chronologicalLogs.length - 1)) * (svgWidth - padding * 2);
    const y = svgHeight - padding - ((log.weight - minWeight) / weightRange) * (svgHeight - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* 1. PROGRESS HIGHLIGHT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div id="stat-card-weight" className="glass-card p-5 space-y-2">
          <div className="flex justify-between items-center text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Weight Profile</span>
            <Scale className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-zinc-950 dark:text-white">{currentWeight} kg</h4>
            <span className={`text-[11px] font-bold ${weightChange <= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
              {weightChange === 0 ? 'No net change' : `${weightChange > 0 ? '+' : ''}${weightChange} kg from start`}
            </span>
          </div>
          <div className="h-1.5 w-full bg-zinc-150 dark:bg-zinc-850 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 animate-pulse" style={{ width: '65%' }}></div>
          </div>
        </div>

        <div id="stat-card-bmi" className="glass-card p-5 space-y-2">
          <div className="flex justify-between items-center text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Current BMI</span>
            <Activity className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-zinc-950 dark:text-white">
              {totalLogs > 0 ? logs[0].bmi : 'N/A'}
            </h4>
            <span className="text-[11px] text-zinc-500 font-medium capitalize">
              {totalLogs > 0 ? (logs[0].bmi < 18.5 ? 'Underweight' : logs[0].bmi < 25 ? 'Healthy Stature' : 'Overweight') : 'Log stats to calculate'}
            </span>
          </div>
          <div className="h-1.5 w-full bg-zinc-150 dark:bg-zinc-850 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: '50%' }}></div>
          </div>
        </div>

        <div id="stat-card-workouts" className="glass-card p-5 space-y-2">
          <div className="flex justify-between items-center text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Exercises Done</span>
            <Trophy className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-zinc-950 dark:text-white">{totalWorkoutsCompleted}</h4>
            <span className="text-[11px] text-zinc-500 font-bold">completed workout sessions</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-150 dark:bg-zinc-850 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, (totalWorkoutsCompleted / 7) * 100)}%` }}></div>
          </div>
        </div>

        <div id="stat-card-nutrition" className="glass-card p-5 space-y-2">
          <div className="flex justify-between items-center text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Calories Eaten</span>
            <Flame className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-zinc-950 dark:text-white">{avgCalIntake} kcal</h4>
            <span className="text-[11px] text-zinc-500 font-medium">calculated daily average</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-150 dark:bg-zinc-850 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>

      {/* 2. CORE LAYOUT SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Entry logger form (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 space-y-6">
            <div className="flex items-center gap-2.5">
              <Plus className="h-5 w-5 text-emerald-500" />
              <h3 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">Log Current Metrics</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="log-weight" className="block text-xs font-semibold text-zinc-600 dark:text-zinc-350 uppercase tracking-wide mb-1.5">Weight (kg)</label>
                  <input
                    type="number"
                    id="log-weight"
                    step="0.1"
                    min="30"
                    max="200"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full px-3 py-2 glass-input text-sm font-semibold dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="log-height" className="block text-xs font-semibold text-zinc-600 dark:text-zinc-350 uppercase tracking-wide mb-1.5">Height (cm)</label>
                  <input
                    type="number"
                    id="log-height"
                    min="100"
                    max="250"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full px-3 py-2 glass-input text-sm font-semibold dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="log-eat" className="block text-xs font-semibold text-zinc-600 dark:text-zinc-350 uppercase tracking-wide mb-1.5">Eaten (kcal)</label>
                  <input
                    type="number"
                    id="log-eat"
                    min="500"
                    max="8000"
                    value={calIntake}
                    onChange={(e) => setCalIntake(Number(e.target.value))}
                    className="w-full px-3 py-2 glass-input text-sm font-semibold dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="log-burn" className="block text-xs font-semibold text-zinc-600 dark:text-zinc-350 uppercase tracking-wide mb-1.5">Burned (kcal)</label>
                  <input
                    type="number"
                    id="log-burn"
                    min="0"
                    max="4000"
                    value={calBurned}
                    onChange={(e) => setCalBurned(Number(e.target.value))}
                    className="w-full px-3 py-2 glass-input text-sm font-semibold dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <div>
                  <label htmlFor="log-water" className="block text-xs font-semibold text-zinc-600 dark:text-zinc-350 uppercase tracking-wide mb-1.5">Water logged (L)</label>
                  <input
                    type="number"
                    id="log-water"
                    step="0.1"
                    min="0"
                    max="10"
                    value={water}
                    onChange={(e) => setWater(Number(e.target.value))}
                    className="w-full px-3 py-2 glass-input text-sm font-semibold dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="log-done" className="block text-xs font-semibold text-zinc-600 dark:text-zinc-350 uppercase tracking-wide mb-2.5">Workout Done?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      <input
                        type="radio"
                        name="log-done"
                        checked={workoutDone}
                        onChange={() => setWorkoutDone(true)}
                        className="accent-emerald-500"
                      /> Yes
                    </label>
                    <label className="flex items-center gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      <input
                        type="radio"
                        name="log-done"
                        checked={!workoutDone}
                        onChange={() => setWorkoutDone(false)}
                        className="accent-emerald-500"
                      /> No
                    </label>
                  </div>
                </div>
              </div>

              {workoutDone && (
                <div>
                  <label htmlFor="log-workout-name" className="block text-xs font-semibold text-zinc-600 dark:text-zinc-350 uppercase tracking-wide mb-1.5">Workout Drill Name</label>
                  <input
                    type="text"
                    id="log-workout-name"
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    className="w-full px-3 py-2 glass-input text-sm font-semibold dark:text-white"
                    placeholder="e.g. Legs Hypertrophy, Cardiocore"
                    required
                  />
                </div>
              )}

              <button
                id="submit-log-btn"
                type="submit"
                className="w-full py-3 bg-zinc-950 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white font-bold rounded-xl active:scale-98 hover:shadow-lg transition-all text-sm"
              >
                Log metrics and complete day
              </button>
            </form>
          </div>
        </div>

        {/* Charts & Table (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Weight Chart */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-sans font-bold text-lg text-zinc-900 dark:text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald-500" /> Weight Progression Trend
            </h3>
            {logs.length >= 2 ? (
              <div className="space-y-2">
                <div className="border border-white/10 dark:border-zinc-800 rounded-xl bg-white/5 dark:bg-zinc-950/20 p-3 flex justify-center">
                  <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full max-h-[160px] overflow-visible">
                    {/* Fill Gradient Area under line */}
                    {points && (
                      <path
                        d={`M ${padding},${svgHeight - padding} L ${points} L ${svgWidth - padding},${svgHeight - padding} Z`}
                        fill="url(#chart-grad)"
                        className="transition-all duration-300"
                      />
                    )}

                    {/* Gradient Definition */}
                    <defs>
                      <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Grid Lines */}
                    <line x1={padding} y1={padding} x2={svgWidth - padding} y2={padding} stroke="rgba(120,120,120,0.06)" />
                    <line x1={padding} y1={svgHeight / 2} x2={svgWidth - padding} y2={svgHeight / 2} stroke="rgba(120,120,120,0.06)" />
                    <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="rgba(120,120,120,0.1)" />

                    {/* Plotting Line */}
                    {points && (
                      <polyline
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3.5"
                        points={points}
                        className="transition-all duration-300"
                      />
                    )}

                    {/* Plot circles */}
                    {chronologicalLogs.map((log, index) => {
                      const x = padding + (index / Math.max(1, chronologicalLogs.length - 1)) * (svgWidth - padding * 2);
                      const y = svgHeight - padding - ((log.weight - minWeight) / weightRange) * (svgHeight - padding * 2);
                      return (
                        <g key={index}>
                          <circle
                            cx={x}
                            cy={y}
                            r="5"
                            className="fill-emerald-500 stroke-white dark:stroke-zinc-900 transition-all duration-300"
                            strokeWidth="2.5"
                          />
                          {/* Weight numbers text */}
                          <text 
                            x={x} 
                            y={y - 10} 
                            className="fill-zinc-600 dark:fill-zinc-400 text-[10px] font-bold text-center" 
                            textAnchor="middle"
                          >
                            {log.weight}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
                <div className="flex justify-between text-[10px] text-zinc-400 font-bold uppercase px-1">
                  <span>{chronologicalLogs[0]?.date}</span>
                  <span>{chronologicalLogs[chronologicalLogs.length - 1]?.date}</span>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-zinc-400 text-xs font-light">
                Add at least 2 logs to generate a visual weight progression trendline.
              </div>
            )}
          </div>

          {/* Historical Log list */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-sans font-bold text-lg text-zinc-900 dark:text-white flex items-center gap-2">
                <ListTodo className="h-5 w-5 text-emerald-500" /> Historical Logs
              </h3>
              <button
                onClick={handleClear}
                className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
                  confirmClear 
                    ? 'bg-red-500/10 text-red-500 border border-red-500/20 animate-pulse' 
                    : 'text-zinc-400 hover:text-red-500'
                }`}
              >
                <Trash2 className="h-3.5 w-3.5" /> {confirmClear ? 'Sure? Tap again' : 'Clear All'}
              </button>
            </div>

            <div className="overflow-x-auto max-h-[250px] border border-white/10 dark:border-zinc-850 rounded-xl bg-white/5 dark:bg-zinc-900/10">
              <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-300 font-light">
                <thead className="bg-zinc-50 dark:bg-zinc-800/60 font-semibold text-xs uppercase tracking-wider text-zinc-500">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Weight</th>
                    <th className="p-3">BMI</th>
                    <th className="p-3">Net Cal</th>
                    <th className="p-3">Water</th>
                    <th className="p-3">Workout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                      <td className="p-3 whitespace-nowrap text-xs font-semibold text-zinc-900 dark:text-white">{log.date}</td>
                      <td className="p-3 whitespace-nowrap font-bold">{log.weight} kg</td>
                      <td className="p-3 whitespace-nowrap">{log.bmi}</td>
                      <td className="p-3 whitespace-nowrap">
                        <span className="text-emerald-500">+{log.caloriesIntake}</span> / <span className="text-orange-500">-{log.caloriesBurned}</span>
                      </td>
                      <td className="p-3 whitespace-nowrap">{log.waterIntake}L</td>
                      <td className="p-3 whitespace-nowrap">
                        {log.workoutCompleted ? (
                          <span className="text-emerald-500 inline-flex items-center gap-1 font-semibold text-xs">
                            <CheckCircle className="h-3.5 w-3.5" /> {log.workoutName || 'Done'}
                          </span>
                        ) : (
                          <span className="text-zinc-400 text-xs">Rest Day</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {logs.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-zinc-400 text-sm font-light">
                        No metric logs added yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
