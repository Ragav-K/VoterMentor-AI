<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# VoterMentor AI

**A multilingual, interactive election guide with AI-powered mentoring, quick lessons, glossaries, and self-assessment quizzes to help citizens navigate the voting process.**

View your app in AI Studio: https://ai.studio/apps/a408c822-6571-4b43-b55f-c2d22088c803

## ✨ Features

- **Multilingual Support:** Access election guidance in multiple languages.
- **AI-Powered Mentoring:** Smart Q&A and personalized AI assistance using the Gemini API to help answer specific voting-related questions.
- **Interactive Scenarios:** Walk through hypothetical voting day experiences.
- **Micro-Lessons & Quizzes:** Self-assessment tools and quick educational snippets about the voting process.
- **Progress Tracking:** Step-by-step guidance tailored to the user's familiarity level (Beginner, Intermediate, Advanced).

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4
- **AI Integration:** `@google/genai` (Gemini API)
- **Animations:** Motion
- **Icons:** Lucide React

## 🚀 Run Locally

### Prerequisites
- Node.js (v22 or higher recommended)
- npm or yarn
- A Gemini API Key

### Installation & Setup

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory (you can copy `.env.example` if it exists) and set your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## 📜 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production into the `dist/` directory.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs TypeScript type checking.
- `npm run clean`: Removes the `dist/` directory.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.
