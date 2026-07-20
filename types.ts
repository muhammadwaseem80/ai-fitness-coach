export interface Exercise {
  id: string;
  name: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'core';
  muscles: string[];
  equipment: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions: string;
  videoPlaceholder?: string;
}

export interface DayWorkout {
  day: string;
  focus: string;
  exercises: {
    name: string;
    sets: string;
    reps: string;
    rest: string;
    instructions: string;
  }[];
}

export interface WorkoutPlan {
  title: string;
  level: string;
  goal: string;
  plan: DayWorkout[];
  tips: string[];
}

export interface Meal {
  name: string;
  calories: number;
  protein: string;
  ingredients: string[];
}

export interface DietPlan {
  goal: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal[];
  waterIntake: number; // in liters
  proteinRecommendation: string; // text explanation
  macroRatio: {
    carbs: number;
    protein: number;
    fat: number;
  };
}

export interface TrackerLog {
  id: string;
  date: string;
  weight: number; // kg
  height: number; // cm
  bmi: number;
  caloriesIntake: number;
  caloriesBurned: number;
  waterIntake: number; // Liters
  workoutCompleted: boolean;
  workoutName?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FitnessTip {
  id: string;
  title: string;
  category: 'workout' | 'nutrition' | 'mindset' | 'recovery';
  text: string;
}
