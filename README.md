# AI Fitness Coach 🏋️‍♂️🤖

AI Fitness Coach is a premium, fully responsive full-stack fitness coaching and physical optimization platform. It utilizes server-side **Google Gemini AI** (`gemini-3.5-flash`) via the standard `@google/genai` SDK to generate customized, high-performance training schedules, diet configurations, metabolic tips, and answer athletic wellness questions in a high-fidelity chatbot.

---

## 🌌 Folder Structure

The repository is modular and structured as follows:

```bash
├── server.ts                  # Secure full-stack Express backend serving Gemini API proxy routes
├── index.html                 # HTML5 document shell
├── metadata.json              # App capabilities metadata configured with server capabilities
├── package.json               # Node dependency tree, bundler configuration, & starting scripts
├── vite.config.ts             # React + Tailwind compilation aliases and HMR switches
├── tsconfig.json              # TypeScript compilation rules
└── src
    ├── main.tsx               # Frontend client application entry
    ├── index.css              # Global styles including tailwind directives and theme mappings
    ├── types.ts               # Shared robust TS interfaces (Meal, Exercise, WorkoutPlan, TrackerLog, ChatMessage)
    ├── data
    │   └── exercises.ts       # Offline catalog for exercise search, experts tips, and FAQs
    └── components             # Premium modular user interfaces
        ├── Navbar.tsx         # Sticky navigation with fluid Light/Dark theme toggle
        ├── Home.tsx           # Hero page, Exercise search filters, and Testimonials
        ├── BMICalculator.tsx  # Dynamic body index visualizer + custom AI health suggestions
        ├── CalorieCalculator.tsx # Active metabolic calorie calculator (Mifflin-St Jeor equation)
        ├── WaterCalculator.tsx # Hydration targets plus interactive water logger filled container
        ├── WorkoutPlanner.tsx # Selection panel feeding AI 7-day training schedule planner
        ├── DietPlanner.tsx    # Daily meal nutritionist and target protein synthesizers
        ├── Chatbot.tsx        # High fidelity 24/7 AI Coach conversational assistant
        ├── ProgressTracker.tsx # Local storage logs trend tracking with interactive SVG line charting
        ├── Contact.tsx        # Responsive contacts channels & Google map placeholder
        └── Footer.tsx         # Legal modals and secure corporate footer links
```

---

## 💎 Features Documentation

### 1. Interactive Home Tab
*   **Aesthetic Hero Banner**: Immersive call-to-action directing users to AI trainers.
*   **Offline Exercise Library**: Real-time interactive search across target muscles and difficulties (Beginner/Intermediate/Advanced) utilizing local vector collections.
*   **Motivational Quotes**: Instantly cycle through deep athletic mantras.
*   **Expert Advice Slider**: Short expert sport tips covering nutrition, mindset, and active recovery.

### 2. BMI Calculator & AI Advice
*   **Real-time estimation**: Dynamic sliders immediately calculate Body Mass Index.
*   **Visual Status Tracker**: Graphical progress bar pointing color indicators to clinical status (Underweight, Healthy, Overweight, Obese).
*   **Google Gemini Advice**: Instantly triggers server `/api/bmi-advice` to fetch 3 concise tips for the computed status.

### 3. Calorie Calculator (AMR/TDEE)
*   **Mifflin-St Jeor Engine**: Calculates accurate active calories by crossing gender, age, weight, and activity multipliers.
*   **Target Breakdowns**: High-contrast tabs illustrating exact targets for Maintenance, Deficit (Loss), and Surplus (Gain) alongside daily gram levels of Carbs, Proteins, and Healthy Fats.

### 4. Interactive Fluid Tracker
*   **Water Estimator**: Evaluates sweat losses by combining body weight and training durations.
*   **Aesthetic Liquid Container**: Visual glassmorphic bottle that fills dynamically as you log glasses of water (+250ml, +500ml, +750ml).

### 5. AI 7-Day Workout Scheduler
*   **Level & Goal Specifics**: Adapts to user levels and target focuses (Fat Loss, Hypertrophy, Neurological strength).
*   **Collapsible Day Drills**: Displays exercises, exact sets, rep counts, rest clocks, and trainer form tips generated securely by Gemini.

### 6. AI Daily Nutritionist
*   **Meal Structure templates**: High performance ingredients and calories for Breakfast, Lunch, Dinner, and multiple Snacks matching dietary criteria (Vegan, Keto, Vegetarian, Gluten-Free).

### 7. 24/7 AI Coach Chatbot
*   Interactive panel enabling athletes to troubleshoot workout injuries, request healthy substitute snacks, and load suggestions chips easily.

### 8. Progress Logs & SVG Charts
*   Saves weights, daily water quantities, and workout drills to Local Storage.
*   Plots progression automatically on a gorgeous hand-crafted SVG line trendline.

---

## ⚡ Local Installation Instructions

To start developing or running this application locally on your computer:

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) and **npm** installed.

### 2. Configure Environment Variables
Create a file named `.env` in the root folder (or duplicate `.env.example`) and add your Google AI Studio secret key:
```env
GEMINI_API_KEY="YOUR_ACTUAL_GOOGLE_STUDIO_API_KEY"
APP_URL="http://localhost:3000"
```

### 3. Install Dependencies
Run the package manager from your console:
```bash
npm install
```

### 4. Boot Full-Stack Development Server
Start the Express API backend alongside the Vite React frontend:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Compile Production Bundle
Bundle the client React bundles and compile the backend `server.ts` into a fast, standalone CommonJS executable inside `dist/`:
```bash
npm run build
npm run start
 




---

## 📸 Screenshots

### 1. Home Page
[Home Page](fitness%202.jpeg)

### 2. Workout Page  
[Workout Page](fitness%203.jpeg)

### 3. Result Page
[Result Page](fitness%201.jpeg)





