'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInterviewStore } from '@/store/interviewStore';
import TimeChart from '@/components/charts/TimeChart';
import PieChart from '@/components/charts/PieChart';
import ScatterChart from '@/components/charts/ScatterChart';
import { Download, RefreshCw, CheckCircle, AlertTriangle, Lightbulb, Loader2, Trophy, Target, Clock, Activity, Zap, Terminal } from 'lucide-react';
import { AnalyticsData } from '@/types';
import { generatePDF } from '@/lib/pdf';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResultsPage() {
    const router = useRouter();
    const store = useInterviewStore();
    const {
        candidateInfo,
        questions,
        answers,
        times,
        notes,
        resetSession
    } = store;

    const [analytics, setAnalytics] = useState<AnalyticsData['notes_analysis']>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!candidateInfo) {
            router.push('/profile');
            return;
        }

        const fetchAnalytics = async () => {
            try {
                const response = await fetch('/api/analytics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        notes: notes,
                        role: candidateInfo.role
                    })
                });

                const data = await response.json();
                setAnalytics(data.analysis);
            } catch (error) {
                console.error('Failed to fetch analytics', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [candidateInfo, notes, router]);

    if (!candidateInfo) return null;

    const correctCount = questions.reduce((acc, q, i) =>
        acc + (answers[i] === q.correct_answer ? 1 : 0), 0);
    const score = (correctCount / questions.length) * 100;
    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    const totalTime = times.reduce((a, b) => a + b, 0);

    const scatterData = questions.map((q, i) => ({
        question: `Q${i + 1}`,
        time: parseFloat(times[i].toFixed(1)),
        isCorrect: answers[i] === q.correct_answer
    }));

    const downloadPDF = () => {
        generatePDF(
            candidateInfo,
            score,
            questions,
            correctCount,
            avgTime,
            totalTime,
            analytics
        );
    };

    return (
        <div className="min-h-screen p-6 md:p-12 lg:p-24">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Mission Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-end gap-12"
                >
                    <div className="space-y-6">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-[10px] font-black tracking-widest uppercase backdrop-blur-xl"
                        >
                            <Terminal className="w-4 h-4" />
                            Interview Complete
                        </motion.div>
                        <h1 className="text-4xl font-black tracking-tighter text-white">
                            INTERVIEW <span className="text-cyber">FEEDBACK</span>
                        </h1>
                        <p className="text-gray-500 font-medium">Detailed feedback for <span className="text-white">{candidateInfo.name}</span></p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={downloadPDF}
                            className="group px-8 py-3 bg-white text-black font-black rounded-xl flex items-center gap-3 hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        >
                            <Download className="w-5 h-5" />
                            DOWNLOAD FEEDBACK
                        </button>
                        <button
                            onClick={() => { resetSession(); router.push('/'); }}
                            className="px-8 py-3 bg-white/5 border border-white/5 text-white font-black rounded-xl flex items-center gap-3 hover:border-white/20 transition-all"
                        >
                            <RefreshCw className="w-5 h-5" />
                            START NEW SESSION
                        </button>
                    </div>
                </motion.div>

                {/* Key Telemetry */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: "Success Rate", value: `${score.toFixed(1)}%`, icon: Trophy, color: "cyan" },
                        { label: "Avg Response Time", value: `${avgTime.toFixed(1)}s`, icon: Clock, color: "purple" },
                        { label: "Interview Duration", value: `${Math.floor(totalTime / 60)}m ${Math.floor(totalTime % 60)}s`, icon: Activity, color: "pink" },
                        { label: "Correct Answers", value: `${correctCount}/${questions.length}`, icon: Target, color: "cyan" }
                    ].map((metric, idx) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="neural-glass p-8 rounded-4xl relative overflow-hidden group"
                        >
                            <div className="relative z-10 space-y-6">
                                <div className={`w-10 h-10 bg-${metric.color}-500/10 rounded-xl flex items-center justify-center text-${metric.color}-400`}>
                                    <metric.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{metric.label}</p>
                                    <p className="text-3xl font-black mt-2 text-white">{metric.value}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Visual Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-8 neural-glass p-10 rounded-3xl space-y-10"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold flex items-center gap-4">
                                <Activity className="w-5 h-5 text-cyan-400" />
                                Response Time Analysis
                            </h3>
                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">S / Question</span>
                        </div>
                        <div className="h-[400px] w-full">
                            <TimeChart times={times} />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-4 neural-glass p-10 rounded-3xl space-y-10"
                    >
                        <h3 className="text-lg font-bold flex items-center gap-4">
                            <Target className="w-5 h-5 text-purple-400" />
                            Distribution
                        </h3>
                        <div className="h-[400px] w-full flex items-center justify-center">
                            <PieChart correct={correctCount} incorrect={questions.length - correctCount} />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-12 neural-glass p-10 rounded-3xl space-y-10"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold flex items-center gap-4">
                                <Activity className="w-5 h-5 text-pink-400" />
                                Performance Matrix
                            </h3>
                            <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest">
                                <span className="flex items-center gap-2 text-cyan-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> SUCCESS
                                </span>
                                <span className="flex items-center gap-2 text-pink-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400" /> FAILURE
                                </span>
                            </div>
                        </div>
                        <div className="h-[400px] w-full">
                            <ScatterChart data={scatterData} />
                        </div>
                    </motion.div>
                </div>

                {/* AI Neural Feedback */}
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-32 neural-glass rounded-3xl space-y-8"
                        >
                            <div className="relative">
                                <Loader2 className="w-16 h-16 animate-spin text-cyan-500" />
                                <div className="absolute inset-0 blur-2xl bg-cyan-500/30 animate-pulse" />
                            </div>
                            <div className="text-center space-y-2">
                                <p className="text-xl font-black text-white">GENERATING FEEDBACK...</p>
                                <p className="text-gray-500 text-xs font-medium">Our AI is analyzing your responses and technical depth.</p>
                            </div>
                        </motion.div>
                    ) : analytics ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                        >
                            <div className="neural-glass p-10 rounded-3xl space-y-8 relative overflow-hidden">
                                <h3 className="text-xl font-black flex items-center gap-4 text-cyan-400">
                                    <CheckCircle className="w-6 h-6" /> KEY STRENGTHS
                                </h3>
                                <div className="space-y-4">
                                    {analytics.strengths.map((s, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5"
                                        >
                                            <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-500 shrink-0 shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
                                            <p className="text-gray-400 font-medium leading-relaxed">{s}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="neural-glass p-10 rounded-3xl space-y-8 relative overflow-hidden">
                                <h3 className="text-xl font-black flex items-center gap-4 text-pink-400">
                                    <AlertTriangle className="w-6 h-6" /> GROWTH AREAS
                                </h3>
                                <div className="space-y-4">
                                    {analytics.areas_of_improvement.map((s, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5"
                                        >
                                            <div className="mt-1.5 w-2 h-2 rounded-full bg-pink-500 shrink-0 shadow-[0_0_10px_rgba(255,0,122,0.5)]" />
                                            <p className="text-gray-400 font-medium leading-relaxed">{s}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:col-span-2 neural-glass p-10 rounded-3xl space-y-12 relative overflow-hidden">
                                <h3 className="text-xl font-black flex items-center gap-4 text-purple-400">
                                    <Lightbulb className="w-6 h-6" /> RECOMMENDATIONS
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {analytics.recommendations.map((s, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="group p-8 bg-white/5 hover:bg-white/10 rounded-3xl border border-white/5 transition-all"
                                        >
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
                                                    <Zap className="w-5 h-5" />
                                                </div>
                                                <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Protocol {i + 1}</span>
                                            </div>
                                            <p className="text-gray-400 font-medium leading-relaxed">{s}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </div>
    );
}
