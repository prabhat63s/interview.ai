'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Loader2, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';

const STEPS = [
    "Verifying Profile",
    "Analyzing Experience",
    "Identifying Key Skills",
    "Finalizing Interview Setup"
];

export default function VerificationSteps({ onComplete }: { onComplete: () => void }) {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (currentStep < STEPS.length) {
            const timer = setTimeout(() => {
                setCurrentStep(prev => prev + 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            onComplete();
        }
    }, [currentStep, onComplete]);

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400">
                    <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white">Profile Analysis</h3>
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">AI-Powered Profile Review</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {STEPS.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center gap-4 p-5 rounded-xl border transition-all duration-500
                            ${index < currentStep ? 'bg-cyan-500/5 border-cyan-500/20' :
                                index === currentStep ? 'bg-white/5 border-white/10' :
                                    'bg-transparent border-transparent opacity-30'}
                        `}
                    >
                        <div className="shrink-0">
                            {index < currentStep ? (
                                <CheckCircle2 className="w-5 h-5 text-cyan-500" />
                            ) : index === currentStep ? (
                                <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                            ) : (
                                <Circle className="w-5 h-5 text-gray-800" />
                            )}
                        </div>
                        <span className={`text-sm font-bold ${index <= currentStep ? "text-gray-300" : "text-gray-700"}`}>
                            {step}
                        </span>
                        {index < currentStep && (
                            <span className="ml-auto text-[8px] font-black text-cyan-400 uppercase tracking-widest">Verified</span>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
