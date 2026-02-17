'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useInterviewStore } from '@/store/interviewStore';
import { TECH_ROLES } from '@/lib/constants';
import { Loader2, Clock, Zap, Cpu, Shield, ArrowRight, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import InterviewQuestion from '@/components/InterviewQuestion';

export default function InterviewPage() {
    const router = useRouter();
    const store = useInterviewStore();
    const {
        candidateInfo,
        questions,
        currentQuestionIndex,
        setQuestions,
        addAnswer,
        nextQuestion,
        setStartTime,
        startTime,
        suggestedDifficulty,
        recommendedLanguages
    } = store;

    const [selectedTool, setSelectedTool] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [notes, setNotes] = useState('');

    // Redirect if no profile
    useEffect(() => {
        if (!candidateInfo) {
            router.push('/profile');
        }
    }, [candidateInfo, router]);

    // Set default tool
    useEffect(() => {
        if (candidateInfo && !selectedTool) {
            const roleInfo = TECH_ROLES[candidateInfo.role];
            if (roleInfo) {
                const defaultTool = roleInfo.languages.find(l => recommendedLanguages.includes(l)) || roleInfo.languages[0];
                setSelectedTool(defaultTool);
            }
        }
    }, [candidateInfo, recommendedLanguages, selectedTool]);

    const handleStartInterview = async () => {
        if (!selectedTool) return;
        setIsGenerating(true);

        try {
            store.setCandidateInfo({ ...candidateInfo!, tool: selectedTool });

            const response = await fetch('/api/generate-questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    language: selectedTool,
                    difficulty: suggestedDifficulty
                })
            });

            if (!response.ok) throw new Error('Failed to generate questions');

            const data = await response.json();
            setQuestions(data.questions);
            setStartTime(Date.now());
        } catch (error) {
            console.error(error);
            alert('Failed to generate questions');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleNextQuestion = () => {
        if (!selectedOption) return;

        const timeTaken = (Date.now() - (startTime || Date.now())) / 1000;
        addAnswer(selectedOption, timeTaken, notes);

        setNotes('');
        setSelectedOption('');
        setStartTime(Date.now());

        if (currentQuestionIndex < questions.length - 1) {
            nextQuestion();
        } else {
            router.push('/results');
        }
    };

    if (!candidateInfo) return null;

    // Configuration View
    if (questions.length === 0) {
        const roleInfo = TECH_ROLES[candidateInfo.role];

        return (
            <div className="min-h-screen p-6 md:p-12 lg:p-24 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-5xl w-full space-y-12"
                >
                    <header className="text-center space-y-4">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-[10px] font-black tracking-widest uppercase backdrop-blur-xl"
                        >
                            <Terminal className="w-4 h-4" />
                            Interview Configuration
                        </motion.div>
                        <h1 className="text-4xl font-black tracking-tighter text-white">
                            INTERVIEW <span className="text-cyber">CONFIGURATION</span>
                        </h1>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Tool Selection */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="neural-glass rounded-3xl p-10 space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400">
                                        <Cpu className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">Choose Your Tech Stack</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {roleInfo?.languages.map((tool) => (
                                        <button
                                            key={tool}
                                            onClick={() => setSelectedTool(tool)}
                                            className={`group relative p-6 rounded-xl border transition-all duration-300 text-left overflow-hidden
                                                ${selectedTool === tool
                                                    ? 'bg-cyan-500/10 border-cyan-500/50 text-white'
                                                    : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}
                                            `}
                                        >
                                            <div className="relative z-10 flex flex-col gap-1">
                                                <span className="font-bold text-base">{tool}</span>
                                                {recommendedLanguages.includes(tool) && (
                                                    <span className="text-[8px] uppercase tracking-widest font-black text-cyan-400 flex items-center gap-1">
                                                        <Zap className="w-3 h-3" /> Recommended
                                                    </span>
                                                )}
                                            </div>
                                            {selectedTool === tool && (
                                                <motion.div
                                                    layoutId="activeTool"
                                                    className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-purple-600/10"
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Summary & Start */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="neural-glass rounded-3xl p-10 space-y-10">
                                <div className="space-y-8">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Target Role</p>
                                        <p className="text-xl font-bold text-white">{candidateInfo.role}</p>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Difficulty Matrix</p>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-4 py-2 rounded-xl text-xs font-black border
                                                ${suggestedDifficulty === 'Hard' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                                                    suggestedDifficulty === 'Medium' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' :
                                                        'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'}
                                            `}>
                                                {suggestedDifficulty.toUpperCase()}
                                            </span>
                                            <span className="text-[10px] text-gray-500 font-black flex items-center gap-1 uppercase tracking-widest">
                                                <Zap className="w-3 h-3" /> AI Suggested
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-white/5 rounded-xl border border-white/5 space-y-3">
                                        <div className="flex items-center gap-2 text-cyan-400 font-black text-[10px] uppercase tracking-widest">
                                            <Shield className="w-3.5 h-3.5" />
                                            <span>Interview Guidelines</span>
                                        </div>
                                        <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                            10 questions tailored to your {selectedTool || 'selected tool'} expertise.
                                            Real-time AI feedback active.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleStartInterview}
                                    disabled={isGenerating || !selectedTool}
                                    className="w-full py-5 bg-white text-black font-black rounded-xl flex items-center justify-center gap-3 hover:bg-cyan-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            GENERATING...
                                        </>
                                    ) : (
                                        <>
                                            START INTERVIEW
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Interview View
    const question = questions[currentQuestionIndex];

    return (
        <div className="min-h-screen p-6 md:p-12 lg:p-24">
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="space-y-6 w-full md:w-auto">
                        <div className="flex items-center gap-6">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Question</p>
                                <h2 className="text-3xl font-black text-white">
                                    {currentQuestionIndex + 1}<span className="text-gray-700 mx-2">/</span>10
                                </h2>
                            </div>
                            <div className="h-10 w-px bg-white/5" />
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Time Elapsed</p>
                                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xl font-bold">
                                    <Clock className="w-4 h-4" />
                                    {startTime ? Math.floor((Date.now() - startTime) / 1000) : 0}s
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-96 h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-linear-to-r from-cyan-400 to-purple-500 shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentQuestionIndex + 1) / 10) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-4 px-5 py-3 neural-glass rounded-xl border border-cyan-500/10">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                        <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">Analysis Active</span>
                    </div>
                </div>

                {/* Question Card */}
                <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <InterviewQuestion
                        question={question}
                        selectedOption={selectedOption}
                        onSelectOption={setSelectedOption}
                        notes={notes}
                        onNotesChange={setNotes}
                    />
                </motion.div>

                {/* Footer */}
                <div className="flex justify-end pt-12 border-t border-white/5">
                    <button
                        onClick={handleNextQuestion}
                        disabled={!selectedOption}
                        className="group px-10 py-5 bg-white text-black font-black rounded-xl flex items-center gap-3 hover:bg-cyan-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <span className="text-sm">{currentQuestionIndex < 9 ? "NEXT QUESTION" : "SUBMIT INTERVIEW"}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
