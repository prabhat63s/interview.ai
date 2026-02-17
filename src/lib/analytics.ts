import { Question } from '@/types';

export const calculateScore = (questions: Question[], answers: string[]) => {
    const correctCount = questions.reduce((acc, q, i) =>
        acc + (answers[i] === q.correct_answer ? 1 : 0), 0);
    return (correctCount / questions.length) * 100;
};

export const calculateStats = (questions: Question[], answers: string[], times: number[]) => {
    const correctCount = questions.reduce((acc, q, i) =>
        acc + (answers[i] === q.correct_answer ? 1 : 0), 0);
    const score = (correctCount / questions.length) * 100;
    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    const totalTime = times.reduce((a, b) => a + b, 0);

    return { correctCount, score, avgTime, totalTime };
};
