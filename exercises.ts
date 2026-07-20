import { Exercise, FitnessTip, FAQItem } from '../types';

export const LOCAL_EXERCISES: Exercise[] = [
  {
    id: 'push-up',
    name: 'Standard Push-Up',
    category: 'strength',
    muscles: ['Chest', 'Triceps', 'Front Deltoids', 'Core'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: 'Start in a plank position with hands slightly wider than shoulder-width. Lower your body until your chest nearly touches the floor, keeping your elbows at a 45-degree angle. Push back up to the starting position.'
  },
  {
    id: 'barbell-squat',
    name: 'Barbell Back Squat',
    category: 'strength',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Lower Back'],
    equipment: 'Barbell',
    difficulty: 'intermediate',
    instructions: 'Place a barbell on your upper back. Stand with feet shoulder-width apart. Lower your hips back and down as if sitting in a chair. Keep your knees aligned with toes and chest upright. Drive back up to standing.'
  },
  {
    id: 'deadlift',
    name: 'Conventional Barbell Deadlift',
    category: 'strength',
    muscles: ['Hamstrings', 'Glutes', 'Erector Spinae', 'Upper Back'],
    equipment: 'Barbell',
    difficulty: 'advanced',
    instructions: 'Stand with mid-foot under the barbell. Bend over and grab the bar with a shoulder-width grip. Keep your back flat, drop your hips, and pull the bar up along your shins by extending hips and knees. Stand tall and squeeze glutes.'
  },
  {
    id: 'burpee',
    name: 'Cardio Burpee',
    category: 'cardio',
    muscles: ['Full Body', 'Cardiovascular System'],
    equipment: 'Bodyweight',
    difficulty: 'intermediate',
    instructions: 'Stand upright. Drop into a squat position, place your hands on the ground, and kick your feet back into a push-up position. Perform a push-up, jump feet back to hands, then explosively jump into the air with hands high.'
  },
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    category: 'cardio',
    muscles: ['Calves', 'Shoulders', 'Cardiovascular System'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: 'Stand with feet together and arms at your sides. Simultaneously jump your feet out to the sides and swing your arms above your head. Quickly jump back to the starting position.'
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    category: 'cardio',
    muscles: ['Core', 'Shoulders', 'Hip Flexors', 'Cardio'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: 'Start in a high plank position. Alternately drive your knees toward your chest as fast as possible while keeping your core tight and hips level.'
  },
  {
    id: 'plank',
    name: 'Forearm Plank',
    category: 'core',
    muscles: ['Rectus Abdominis', 'Transverse Abdominis', 'Obliques', 'Shoulders'],
    equipment: 'Bodyweight',
    difficulty: 'beginner',
    instructions: 'Place your forearms on the floor, elbows aligned under shoulders. Extend your legs straight behind you, toes tucked. Engage your core, glutes, and thighs to form a straight, rigid line from head to heels.'
  },
  {
    id: 'russian-twist',
    name: 'Russian Twist',
    category: 'core',
    muscles: ['Obliques', 'Transverse Abdominis', 'Lower Back'],
    equipment: 'Bodyweight / Medicine Ball',
    difficulty: 'intermediate',
    instructions: 'Sit on the floor with knees bent and feet slightly elevated. Lean back slightly, keeping your spine straight. Twist your torso from side to side, tapping the floor (or your medicine ball) beside your hips.'
  },
  {
    id: 'hanging-leg-raise',
    name: 'Hanging Leg Raise',
    category: 'core',
    muscles: ['Lower Abs', 'Hip Flexors', 'Grip Strength'],
    equipment: 'Pull-Up Bar',
    difficulty: 'advanced',
    instructions: 'Hang from a pull-up bar with arms straight. Keeping your legs straight or slightly bent, engage your lower abdominals to raise your legs until they are parallel to the floor, then lower them slowly.'
  },
  {
    id: 'cobra-stretch',
    name: 'Cobra Stretch',
    category: 'flexibility',
    muscles: ['Abdominals', 'Hip Flexors', 'Chest', 'Lower Back'],
    equipment: 'Yoga Mat',
    difficulty: 'beginner',
    instructions: 'Lie face down on the floor with hands under shoulders. Hug your elbows to your sides. Press your tops of feet into the floor, engage back muscles, and press hands to lift your chest off the ground, opening the front body.'
  },
  {
    id: 'downward-dog',
    name: 'Downward Facing Dog',
    category: 'flexibility',
    muscles: ['Hamstrings', 'Calves', 'Shoulders', 'Spine'],
    equipment: 'Yoga Mat',
    difficulty: 'beginner',
    instructions: 'Start on hands and knees. Tuck your toes, lift your knees, and push your hips up and back to form an inverted V-shape. Press your heels down and push the floor away to lengthen your spine.'
  },
  {
    id: 'pigeon-pose',
    name: 'Pigeon Pose Stretch',
    category: 'flexibility',
    muscles: ['Glutes', 'Piriformis', 'Psoas', 'Hip Opener'],
    equipment: 'Yoga Mat',
    difficulty: 'intermediate',
    instructions: 'From hands and knees, bring your right knee forward and place it behind your right wrist, angling your shin. Slide your left leg straight back behind you. Lower your hips to the floor and fold forward over your front leg.'
  }
];

export const FITNESS_TIPS: FitnessTip[] = [
  {
    id: 'tip-1',
    title: 'Prioritize Progressive Overload',
    category: 'workout',
    text: 'To build muscle or increase strength, you must gradually challenge your body. Increase the weight, reps, or sets over time to keep making solid progress!'
  },
  {
    id: 'tip-2',
    title: 'The Rule of 80/20 Nutrition',
    category: 'nutrition',
    text: 'Aim to get 80% of your daily calories from whole, nutrient-dense foods (lean proteins, vegetables, complex carbs, healthy fats). Let the remaining 20% be for your favorite treats.'
  },
  {
    id: 'tip-3',
    title: 'Hydrate for Strength',
    category: 'nutrition',
    text: 'A drop of even 2% in body hydration can lead to a 10% decrease in athletic performance and recovery speed. Keep that water bottle full!'
  },
  {
    id: 'tip-4',
    title: 'Mindset: Consistency beats Intensity',
    category: 'mindset',
    text: 'A moderate workout done 4 times a week consistently for months is infinitely more effective than a high-intensity, brutal workout done once a month.'
  },
  {
    id: 'tip-5',
    title: 'Never Skip Active Recovery',
    category: 'recovery',
    text: 'Light walking, swimming, or gentle yoga on rest days increases blood circulation to fatigued muscles, which accelerates repair and reduces soreness.'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How many days a week should I workout?',
    answer: 'For beginners, 3 days a week of full-body training is ideal. Intermediate and advanced trainers typically benefit from 4 to 5 days, splitting their focus between upper and lower body or muscle-specific groups.'
  },
  {
    question: 'How do I calculate my optimal water intake?',
    answer: 'A standard rule is to drink about 35ml of water per kilogram of body weight. For example, an 80kg person needs around 2.8 Liters of water daily, adding more if they are working out or in hot climates.'
  },
  {
    question: 'Should I do cardio before or after lifting weights?',
    answer: 'If your main goal is muscle gain or strength, do cardio after weights so you can lift with maximum energy. If cardiovascular endurance is your top priority, perform cardio first.'
  },
  {
    question: 'What is a healthy weight loss speed?',
    answer: 'A healthy and sustainable rate of weight loss is 0.5 to 1 kilogram (1 to 2 lbs) per week. Faster weight loss often leads to muscle loss and a slower metabolism.'
  },
  {
    question: 'How does the AI create my fitness programs?',
    answer: 'Our smart AI integration analyzes your age, fitness level, goals, weight, and height to generate custom exercise and meal profiles calculated according to scientific principles.'
  }
];

export const MOTIVATIONAL_QUOTES = [
  "Your body can stand almost anything. It's your mind that you have to convince.",
  "The only bad workout is the one that didn't happen.",
  "Success isn't always about greatness. It's about consistency.",
  "Energy and persistence conquer all things.",
  "Action is the foundational key to all success.",
  "The clock is ticking. Are you becoming the person you want to be?",
  "Small daily improvements over time lead to stunning results.",
  "It never gets easier, you just get better."
];
