import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CandidateInfo, Question, CVAnalysis } from '@/types';

interface InterviewState {
    currentQuestionIndex: number;
    questions: Question[];
    answers: string[];
    times: number[];
    notes: string[];
    startTime: number | null;
    isQuizCompleted: boolean;
    candidateId: string;
    isProfileCompleted: boolean;
    candidateInfo: CandidateInfo | null;
    isCvUploaded: boolean;
    suggestedRole: string | null;
    recommendedLanguages: string[];
    suggestedDifficulty: string;

    // Actions
    setQuestions: (questions: Question[]) => void;
    addAnswer: (answer: string, timeTaken: number, note: string) => void;
    setCandidateInfo: (info: CandidateInfo) => void;
    setCvAnalysis: (analysis: CVAnalysis) => void;
    resetSession: () => void;
    nextQuestion: () => void;
    setStartTime: (time: number) => void;
    setSuggestedRole: (role: string) => void;
    setRecommendedLanguages: (langs: string[]) => void;
    setSuggestedDifficulty: (diff: string) => void;
    setCvUploaded: (uploaded: boolean) => void;
}

export const useInterviewStore = create<InterviewState>()(
    persist(
        (set) => ({
            currentQuestionIndex: 0,
            questions: [],
            answers: [],
            times: [],
            notes: [],
            startTime: null,
            isQuizCompleted: false,
            candidateId: '',
            isProfileCompleted: false,
            candidateInfo: null,
            isCvUploaded: false,
            suggestedRole: null,
            recommendedLanguages: [],
            suggestedDifficulty: 'Medium',

            setQuestions: (questions) => set({ questions }),
            addAnswer: (answer, timeTaken, note) =>
                set((state) => ({
                    answers: [...state.answers, answer],
                    times: [...state.times, timeTaken],
                    notes: [...state.notes, note]
                })),
            setCandidateInfo: (info) => set({ candidateInfo: info, isProfileCompleted: true }),
            setCvAnalysis: (analysis) =>
                set((state) => ({
                    candidateInfo: {
                        ...state.candidateInfo!,
                        cv_analysis: analysis
                    }
                })),
            resetSession: () => set({
                currentQuestionIndex: 0,
                questions: [],
                answers: [],
                times: [],
                notes: [],
                startTime: null,
                isQuizCompleted: false,
                candidateId: Math.random().toString(36).substring(7).toUpperCase(),
                isProfileCompleted: false,
                candidateInfo: null,
                isCvUploaded: false,
                suggestedRole: null,
                recommendedLanguages: [],
                suggestedDifficulty: 'Medium'
            }),
            nextQuestion: () => set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 })),
            setStartTime: (time) => set({ startTime: time }),
            setSuggestedRole: (role) => set({ suggestedRole: role }),
            setRecommendedLanguages: (langs) => set({ recommendedLanguages: langs }),
            setSuggestedDifficulty: (diff) => set({ suggestedDifficulty: diff }),
            setCvUploaded: (uploaded) => set({ isCvUploaded: uploaded }),
        }),
        {
            name: 'interview-storage',
        }
    )
);
