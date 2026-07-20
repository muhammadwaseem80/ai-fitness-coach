import React from 'react';
import { Activity, Sparkles, AlertCircle, TrendingUp, Info } from 'lucide-react';

interface BMICalculatorProps {
  onAddLog: (entry: { weight: number; height: number; bmi: number }) => void;
}

export default function BMICalculator({ onAddLog }: BMICalculatorProps) {
  const [height, setHeight] = React.useState<number>(170); // cm
  const [weight, setWeight] = React.useState<number>(70);  // kg
  const [bmiResult, setBmiResult] = React.useState<{
    score: number;
    category: string;
    color: string;
    bgColor: string;
    barWidth: string;
    healthAdvice: string;
  } | null>(null);

  const [aiAdvice, setAiAdvice] = React.useState<string[]>([]);
  const [loadingAi, setLoadingAi] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string>('');

  // Calculate BMI Local Formula
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setAiAdvice([]); // Reset old AI advice on new calculation

    if (height <= 0 || weight <= 0) {
      setErrorMsg('Please specify values greater than zero.');
      return;
    }

    const heightInMeters = height / 100;
    const score = Number((weight / (heightInMeters * heightInMeters)).toFixed(1));

    let category = '';
    let color = '';
    let bgColor = '';
    let barWidth = '';
    let healthAdvice = '';

    if (score < 18.5) {
      category = 'Underweight';
      color = 'text-amber-500';
      bgColor = 'bg-amber-500';
      barWidth = '25%';
      healthAdvice = 'Your weight is in the lower range. Focus on nutrient-rich calorie-dense foods and strength building exercises to safely build lean tissue.';
    } else if (score >= 18.5 && score < 25) {
      category = 'Normal weight';
      color = 'text-emerald-500';
      bgColor = 'bg-emerald-500';
      barWidth = '50%';
      healthAdvice = 'Congratulations! Your BMI is in the healthy zone. Aim to maintain this category with steady physical activity and balanced, whole food macros.';
    } else if (score >= 25 && score < 30) {
      category = 'Overweight';
      color = 'text-orange-500';
      bgColor = 'bg-orange-500';
      barWidth = '75%';
      healthAdvice = 'You are slightly above the standard range. A mild caloric reduction combined with cardiovascular intervals and lifting will help improve your status.';
    } else {
      category = 'Obese';
      color = 'text-red-500';
      bgColor = 'bg-red-500';
      barWidth = '100%';
      healthAdvice = 'Your body mass is in the high health-risk category. Consistently lowering processed foods, performing daily steps, and tracking calorie intake is highly recommended.';
    }

    setBmiResult({ score, category, color, bgColor, barWidth, healthAdvice });

    // Instantly log this log in local storage via parent callback
    onAddLog({ weight, height, bmi: score });
  };

  // Fetch AI recommendations from server
  const fetchAiAdvice = async () => {
    if (!bmiResult) return;
    setLoadingAi(true);
    setErrorMsg('');
    try {
      const response = await fetch('/api/bmi-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          height,
          weight,
          bmi: bmiResult.score,
          category: bmiResult.category
        })
      });
      if (!response.ok) {
        throw new Error('Could not calculate customized AI health tips.');
      }
      const data = await response.json();
      setAiAdvice(data.advice || []);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred while generating AI guidance.');
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 animate-fadeIn">
      {/* Inputs Side (5 Cols) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">Calculate Body Mass Index</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs">Clinical metric correlating stature and weight.</p>
            </div>
          </div>

          <form onSubmit={handleCalculate} className="space-y-5">
            <div>
              <label htmlFor="height-input" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-350 uppercase tracking-wide mb-2">
                Height (cm)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="height-input"
                  min="100"
                  max="250"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full px-4 py-3 glass-input text-sm font-semibold dark:text-white"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-zinc-400">cm</span>
              </div>
              <input
                type="range"
                min="100"
                max="250"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-1 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-emerald-500 mt-3"
              />
            </div>

            <div>
              <label htmlFor="weight-input" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-350 uppercase tracking-wide mb-2">
                Weight (kg)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="weight-input"
                  min="30"
                  max="200"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full px-4 py-3 glass-input text-sm font-semibold dark:text-white"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-zinc-400">kg</span>
              </div>
              <input
                type="range"
                min="30"
                max="200"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-1 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-emerald-500 mt-3"
              />
            </div>

            <button
              id="calculate-bmi-btn"
              type="submit"
              className="w-full py-3.5 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-400 hover:shadow-lg shadow-emerald-500/10 transition-all active:scale-98"
            >
              Analyze Stature
            </button>
          </form>

          {errorMsg && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs flex gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      </div>

      {/* Results Side (7 Cols) */}
      <div className="lg:col-span-7 space-y-6">
        {bmiResult ? (
          <div className="space-y-6">
            <div id="bmi-result-card" className="glass-card p-6 space-y-6">
              <h3 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">Your Stature Evaluation</h3>
              
              {/* Score Highlight Grid */}
              <div className="grid grid-cols-2 gap-4 items-center glass-item p-5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Your BMI score</span>
                  <span className="block text-4xl md:text-5xl font-sans font-extrabold text-zinc-950 dark:text-white mt-1">
                    {bmiResult.score}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Clinical Status</span>
                  <span className={`block text-xl md:text-2xl font-bold mt-1 ${bmiResult.color}`}>
                    {bmiResult.category}
                  </span>
                </div>
              </div>

              {/* Graphical indicator bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] text-zinc-400 font-bold uppercase">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
                <div className="h-3.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex relative">
                  <div className="absolute top-0 bottom-0 left-0 bg-amber-400" style={{ width: '18.5%' }}></div>
                  <div className="absolute top-0 bottom-0 left-[18.5%] bg-emerald-500" style={{ width: '25%' }}></div>
                  <div className="absolute top-0 bottom-0 left-[43.5%] bg-orange-400" style={{ width: '25%' }}></div>
                  <div className="absolute top-0 bottom-0 left-[68.5%] bg-red-500" style={{ width: '31.5%' }}></div>
                  
                  {/* Dynamic Pointer Marker */}
                  <div 
                    id="bmi-pointer"
                    className="absolute top-0 bottom-0 w-2 bg-zinc-950 dark:bg-white border-2 border-white dark:border-zinc-950 transition-all duration-500 shadow-md"
                    style={{ left: bmiResult.barWidth }}
                  ></div>
                </div>
              </div>

              {/* Standard advice */}
              <div className="p-4 glass-card-emerald text-zinc-700 dark:text-zinc-300 text-sm rounded-xl font-light leading-relaxed flex gap-3">
                <Info className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{bmiResult.healthAdvice}</span>
              </div>

              {/* AI Button trigger */}
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                {aiAdvice.length === 0 ? (
                  <button
                    id="generate-ai-bmi-btn"
                    onClick={fetchAiAdvice}
                    disabled={loadingAi}
                    className="w-full py-3 px-4 rounded-xl border border-emerald-500/30 dark:border-emerald-500/20 hover:border-emerald-500 text-emerald-500 bg-emerald-500/5 font-semibold text-sm active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    {loadingAi ? (
                      <>
                        <div className="h-4 w-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                        Consulting Fitness Engine...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 text-emerald-500" />
                        Generate AI Health Advice for my BMI
                      </>
                    )}
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-emerald-500" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                        Tailored Expert AI Recommendations
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {aiAdvice.map((advice, idx) => (
                        <div 
                          key={idx} 
                          id={`ai-bmi-tip-${idx}`}
                          className="p-3.5 glass-item text-sm font-light text-zinc-700 dark:text-zinc-300 leading-relaxed flex gap-2.5"
                        >
                          <TrendingUp className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{advice}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center glass-card p-12 text-center">
            <div className="max-w-xs space-y-3">
              <Activity className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mx-auto" />
              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Calculate Your BMI Above</p>
              <p className="text-xs text-zinc-400">Provide your height and body mass metrics to analyze health classification and fetch AI recommendations.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
