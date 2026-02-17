'use client';
import { motion } from 'framer-motion';
import { Question } from '@/types';
import { Terminal, Cpu, Zap } from 'lucide-react';

interface Props {
    question: Question;
    selectedOption: string;
    onSelectOption: (option: string) => void;
    notes: string;
    onNotesChange: (notes: string) => void;
}

export default function InterviewQuestion({ question, selectedOption, onSelectOption, notes, onNotesChange }: Props) {
    return (
        <motion.div
            key={question.question}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="neural-glass p-10 md:p-12 rounded-3xl space-y-10 relative overflow-hidden"
        >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 p-16 opacity-[0.02] pointer-events-none">
                <Cpu className="w-48 h-48" />
            </div>

            <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3 text-cyan-400">
                    <Terminal className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Technical Challenge</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tighter leading-tight text-white">
                    {question.question}
                </h1>
            </div>

            <div className="grid grid-cols-1 gap-4 relative z-10">
                {question.options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSelectOption(option)}
                        className={`group relative w-full p-6 rounded-xl text-left transition-all duration-300 border-2 overflow-hidden
                            ${selectedOption === option
                                ? 'border-cyan-500 bg-cyan-500/10 text-white shadow-[0_0_30px_rgba(0,240,255,0.1)]'
                                : 'border-white/5 bg-white/5 hover:border-white/20 text-gray-500 hover:text-gray-300'}
                        `}
                    >
                        <div className="flex items-center gap-6 relative z-10">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                                ${selectedOption === option ? 'border-cyan-500 bg-cyan-500/20' : 'border-gray-800 group-hover:border-gray-600'}
                            `}>
                                {selectedOption === option && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(0,240,255,1)]"
                                    />
                                )}
                            </div>
                            <span className="text-lg font-bold">{option}</span>
                        </div>
                        {selectedOption === option && (
                            <motion.div
                                layoutId="activeOption"
                                className="absolute inset-0 bg-linear-to-r from-cyan-500/5 to-purple-600/5"
                            />
                        )}
                    </button>
                ))}
            </div>

            <div className="pt-10 border-t border-white/5 relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                    <Zap className="w-3.5 h-3.5 text-gray-600" />
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                        Technical Rationale (Optional)
                    </label>
                </div>
                <textarea
                    value={notes}
                    onChange={(e) => onNotesChange(e.target.value)}
                    placeholder="Provide a brief technical justification for your selection..."
                    className="w-full bg-white/5 border border-white/5 rounded-xl p-6 h-32 outline-none focus:border-cyan-500/30 transition-all text-gray-400 font-medium placeholder:text-gray-700 resize-none"
                />
            </div>
        </motion.div>
    );
}
