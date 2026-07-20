import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // Lazy initialize Gemini API client
  let ai: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined in environment variables.");
      }
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return ai;
  }

  // API Route: Generate Workout Plan
  app.post("/api/workout", async (req, res) => {
    try {
      const { level, goal, age, preferences } = req.body;
      const client = getGeminiClient();

      const systemInstruction = `You are an elite certified personal fitness trainer.
Create a personalized 7-day workout plan based on the user's details:
- Fitness Level: ${level}
- Fitness Goal: ${goal}
- Age: ${age || 'N/A'}
- Custom preferences/limitations: ${preferences || 'None'}

Provide precise exercises, sets, reps, rest periods, and clear execution instructions for each day. Ensure the program incorporates active recovery or rest days appropriate for their level (e.g., beginners need 2-3 rest days, advanced might need 1-2). Also include 3-5 general professional training tips.`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: "Generate a structured 7-day fitness program following the system instruction.",
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "Name of the workout plan (e.g. '7-Day Shred & Strength')"
              },
              level: { type: Type.STRING },
              goal: { type: Type.STRING },
              plan: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.STRING, description: "e.g. 'Day 1: Monday'" },
                    focus: { type: Type.STRING, description: "Focus area (e.g. 'Chest and Core', 'Active Recovery')" },
                    exercises: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          name: { type: Type.STRING },
                          sets: { type: Type.STRING },
                          reps: { type: Type.STRING },
                          rest: { type: Type.STRING, description: "Rest between sets (e.g. '60s', '90s')" },
                          instructions: { type: Type.STRING }
                        },
                        required: ["name", "sets", "reps", "rest", "instructions"]
                      }
                    }
                  },
                  required: ["day", "focus", "exercises"]
                }
              },
              tips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3-5 high-value trainer tips"
              }
            },
            required: ["title", "level", "goal", "plan", "tips"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response from AI model");
      }
      const data = JSON.parse(responseText.trim());
      res.json(data);
    } catch (error: any) {
      console.error("Workout generation error:", error);
      res.status(500).json({ error: error.message || "Failed to generate workout plan." });
    }
  });

  // API Route: Generate Diet Plan
  app.post("/api/diet", async (req, res) => {
    try {
      const { age, weight, height, goal, dietaryPreference } = req.body;
      const client = getGeminiClient();

      const systemInstruction = `You are a certified sports nutritionist.
Create a high-performance personalized 1-day meal structure that serves as a detailed template for their goals:
- User Age: ${age} years old
- Current Weight: ${weight} kg
- Current Height: ${height} cm
- Fitness Goal: ${goal}
- Dietary Preferences/Restrictions: ${dietaryPreference || 'None'}

Generate a structured diet plan including Breakfast, Lunch, Dinner, and 1-2 healthy snacks.
Calculate appropriate calories and macro ratios (Protein, Carbs, Fats) suited to their goal.
Specify recommended daily water intake (Liters) based on weight/activity and general protein advice.`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: "Generate a structured high-performance meal plan following the instructions.",
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              goal: { type: Type.STRING },
              breakfast: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  calories: { type: Type.INTEGER },
                  protein: { type: Type.STRING },
                  ingredients: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["name", "calories", "protein", "ingredients"]
              },
              lunch: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  calories: { type: Type.INTEGER },
                  protein: { type: Type.STRING },
                  ingredients: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["name", "calories", "protein", "ingredients"]
              },
              dinner: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  calories: { type: Type.INTEGER },
                  protein: { type: Type.STRING },
                  ingredients: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["name", "calories", "protein", "ingredients"]
              },
              snacks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    calories: { type: Type.INTEGER },
                    protein: { type: Type.STRING },
                    ingredients: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["name", "calories", "protein", "ingredients"]
                }
              },
              waterIntake: { type: Type.NUMBER, description: "Recommended daily water intake in Liters" },
              proteinRecommendation: { type: Type.STRING, description: "Explanation of daily protein target in grams" },
              macroRatio: {
                type: Type.OBJECT,
                properties: {
                  carbs: { type: Type.INTEGER, description: "Percentage of daily carbs (e.g. 40)" },
                  protein: { type: Type.INTEGER, description: "Percentage of daily protein (e.g. 30)" },
                  fat: { type: Type.INTEGER, description: "Percentage of daily fats (e.g. 30)" }
                },
                required: ["carbs", "protein", "fat"]
              }
            },
            required: ["goal", "breakfast", "lunch", "dinner", "snacks", "waterIntake", "proteinRecommendation", "macroRatio"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response from AI model");
      }
      const data = JSON.parse(responseText.trim());
      res.json(data);
    } catch (error: any) {
      console.error("Diet generation error:", error);
      res.status(500).json({ error: error.message || "Failed to generate diet plan." });
    }
  });

  // API Route: Fitness Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const client = getGeminiClient();

      // Configure chat
      const chat = client.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: "You are an advanced, friendly, and supportive AI Fitness & Nutrition Coach. Provide helpful, scientifically grounded, and motivating advice about workouts, diet, weight loss, muscle building, and overall wellness. Do not give medical diagnosis, and always remind the user to consult with professionals if they report injury.",
        }
      });

      // Send chat history and current message
      // We can iterate over history and load previous context or simply pass the current question
      // with a neat prefix of conversation history to keep it fast and light.
      let prompt = "";
      if (history && history.length > 0) {
        prompt += "Here is the conversation history so far for context:\n";
        history.forEach((msg: any) => {
          prompt += `${msg.role === 'user' ? 'User' : 'Coach'}: ${msg.text}\n`;
        });
        prompt += `\nNow reply to the User's latest question: ${message}`;
      } else {
        prompt = message;
      }

      const response = await chat.sendMessage({ message: prompt });
      res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Chat error:", error);
      res.status(500).json({ error: error.message || "Failed to process chat response." });
    }
  });

  // API Route: Dynamic BMI Suggestions
  app.post("/api/bmi-advice", async (req, res) => {
    try {
      const { height, weight, bmi, category } = req.body;
      const client = getGeminiClient();

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `The user has a BMI of ${bmi} (Category: ${category}) with height ${height}cm and weight ${weight}kg.
Provide 3 highly practical, actionable, and encouraging fitness & lifestyle tips to improve or maintain their health. Keep each tip concise (max 2 sentences).`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              advice: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["advice"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response from AI model");
      }
      const data = JSON.parse(responseText.trim());
      res.json(data);
    } catch (error: any) {
      console.error("BMI Advice error:", error);
      res.status(500).json({ error: error.message || "Failed to generate health advice." });
    }
  });

  // Vite middleware setup for Development or static server for Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
