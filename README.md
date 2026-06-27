# Interview.ai

A premium, AI-powered technical assessment engine designed to redefine how engineering teams evaluate talent and how candidates prepare for their next big role. Built with a focus on high-end aesthetics and intelligent automation.

## ✨ Key Features

- **Smart CV Analysis**: Automatically parses professional backgrounds to tailor interview questions specifically to a candidate's experience.
- **Dynamic Questioning**: An adaptive interview engine that evolves in real-time based on candidate responses.
- **Deep Performance Insights**: Comprehensive feedback loops covering technical depth, communication skills, and role-fit analysis.
- **Premium UI/UX**: A state-of-the-art interface featuring glassmorphism, smooth micro-animations, and a sleek dark mode.
- **Identity Verification**: Integrated profile validation steps to ensure data integrity.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with persistence
- **AI Engine**: OpenAI gpt-5-mini-2025-08-07
- **Icons**: Lucide React
- **PDF Generation**: jsPDF & autoTable

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API Key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-repo/ai-interview-demo.git
   cd ai-interview-demo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your OpenAI API key:

   ```env
   OPENAI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `src/app`: Next.js App Router pages and API routes.
- `src/components`: Reusable UI components (Charts, Sidebar, Question cards).
- `src/store`: Zustand store for interview state management.
- `src/lib`: Utility functions, constants, and PDF generation logic.
- `src/types`: TypeScript interfaces and type definitions.

