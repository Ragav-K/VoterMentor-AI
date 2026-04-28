import { GoogleGenAI } from "@google/genai";
import { UserLevel } from "../types.ts";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function askElectionBot(prompt: string, level: UserLevel, history: { role: 'user' | 'model', text: string }[], language: string = 'EN') {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      { role: 'user', parts: [{ text: `You are an Election Guide AI. Your goal is to help users understand elections. 
      The current user's familiarity level is: ${level}. 
      The current preferred language is: ${language}.
      Always maintain a neutral, friendly, and educational tone. 
      Avoid political bias or party promotion. 
      Be concise but informative. 
      Use simple language for BEGINNER, standard terms for INTERMEDIATE, and deep insights for ADVANCED.
      If the user is confused, simplify further with an analogy.
      If the language is not EN, respond in the requested language.` }] },
      ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
      { role: 'user', parts: [{ text: prompt }] }
    ]
  });

  const response = await model;
  return response.text;
}
