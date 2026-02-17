'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { useInterviewStore } from '@/store/interviewStore';
import { TECH_ROLES, CTC_RANGES } from '@/lib/constants';
import VerificationSteps from '@/components/VerificationSteps';
import { Upload, Check, Loader2, Shield, Cpu, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalysisResult {
    candidate_name: string;
    suggested_role: string;
    years_of_experience: string;
    confidence: number;
    recommended_languages: string[];
}

export default function ProfilePage() {
    const router = useRouter();
    const {
        candidateInfo,
        setCandidateInfo,
        setSuggestedDifficulty,
        setRecommendedLanguages
    } = useInterviewStore();

    const [file, setFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [isVerified, setIsVerified] = useState(false);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const uploadedFile = acceptedFiles[0];
        setFile(uploadedFile);
        setIsAnalyzing(true);

        const formData = new FormData();
        formData.append('file', uploadedFile);

        try {
            const response = await fetch('/api/cv-analyze', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setAnalysisResult(data);
            setCandidateInfo({
                name: data.candidate_name,
                role: data.suggested_role,
                experience: data.years_of_experience,
                currentCTC: '',
                expectedCTC: '',
                relocation: 'No'
            });
            setSuggestedDifficulty(data.confidence > 0.8 ? 'Hard' : data.confidence > 0.5 ? 'Medium' : 'Easy');
            setRecommendedLanguages(data.recommended_languages);
        } catch (error) {
            console.error('Analysis failed', error);
        } finally {
            setIsAnalyzing(false);
        }
    }, [setCandidateInfo, setSuggestedDifficulty, setRecommendedLanguages]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/interview');
    };

    return (
        <div className="min-h-screen p-6 md:p-12 lg:p-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left Column: Data Input & Analysis */}
                <div className="lg:col-span-7 space-y-12">
                    <header className="space-y-4">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="flex items-center gap-2 text-cyan-400 text-xs font-black tracking-widest uppercase"
                        >
                            <Shield className="w-4 h-4" />
                            Profile Verification
                        </motion.div>
                        <h1 className="text-4xl font-black tracking-tighter text-white">
                            INTERVIEW <span className="text-cyber">SETUP</span>
                        </h1>
                    </header>

                    {/* Upload Zone */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 to-purple-600 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000" />
                        <div
                            {...getRootProps()}
                            className={`relative neural-glass rounded-3xl p-12 border-2 border-dashed transition-all cursor-pointer overflow-hidden
                                ${isDragActive ? 'border-cyan-500 bg-cyan-500/5' : 'border-white/5 hover:border-white/20'}
                                ${file ? 'border-solid border-cyan-500/50' : ''}
                            `}
                        >
                            <input {...getInputProps()} />

                            {/* Scanning Animation */}
                            {isAnalyzing && (
                                <motion.div
                                    initial={{ top: 0 }}
                                    animate={{ top: '100%' }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-1 bg-cyan-500 shadow-[0_0_15px_rgba(0,240,255,0.5)] z-20"
                                />
                            )}

                            <div className="flex flex-col items-center text-center space-y-6">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all
                                    ${file ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-gray-500'}
                                `}>
                                    {isAnalyzing ? <Loader2 className="w-8 h-8 animate-spin" /> :
                                        file ? <Check className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-white">
                                        {file ? file.name : "Upload CV (PDF)"}
                                    </h3>
                                    <p className="text-gray-500 text-xs font-medium">
                                        {isAnalyzing ? "Analyzing your professional profile..." : "PDF format recommended for optimal analysis"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Analysis Results */}
                    <AnimatePresence>
                        {analysisResult && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="neural-glass rounded-3xl p-10 space-y-8"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[10px] font-black tracking-widest text-gray-500 uppercase">Analysis Summary</h3>
                                    <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black">
                                        MATCH: {(analysisResult.confidence * 100).toFixed(0)}%
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Detected Role</p>
                                        <p className="text-lg font-bold text-white">{analysisResult.suggested_role}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Experience</p>
                                        <p className="text-lg font-bold text-white">{analysisResult.years_of_experience}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Technical Stack</p>
                                    <div className="flex flex-wrap gap-2">
                                        {analysisResult.recommended_languages.map((lang: string) => (
                                            <span key={lang} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-300">
                                                {lang}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Verification Steps */}
                    {file && !isAnalyzing && (
                        <VerificationSteps onComplete={() => setIsVerified(true)} />
                    )}
                </div>

                {/* Right Column: Additional Parameters */}
                <div className="lg:col-span-5">
                    <div className="sticky top-12 space-y-8">
                        <form onSubmit={handleFormSubmit} className="neural-glass rounded-3xl p-10 space-y-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={candidateInfo?.name || ''}
                                        onChange={(e) => setCandidateInfo({ ...candidateInfo!, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-white font-bold outline-none focus:border-cyan-500/50 transition-all"
                                        placeholder="Candidate Name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Target Role</label>
                                    <select
                                        required
                                        value={candidateInfo?.role || ''}
                                        onChange={(e) => setCandidateInfo({ ...candidateInfo!, role: e.target.value })}
                                        className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-white font-bold outline-none focus:border-cyan-500/50 transition-all appearance-none"
                                    >
                                        {Object.keys(TECH_ROLES).map(role => (
                                            <option key={role} value={role} className="bg-black">{role}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Current CTC</label>
                                        <select
                                            required
                                            value={candidateInfo?.currentCTC || ''}
                                            onChange={(e) => setCandidateInfo({ ...candidateInfo!, currentCTC: e.target.value })}
                                            className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-white font-bold outline-none focus:border-cyan-500/50 transition-all appearance-none"
                                        >
                                            <option value="" className="bg-black">Select</option>
                                            {CTC_RANGES.map(range => <option key={range} value={range} className="bg-black">{range}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Expected CTC</label>
                                        <select
                                            required
                                            value={candidateInfo?.expectedCTC || ''}
                                            onChange={(e) => setCandidateInfo({ ...candidateInfo!, expectedCTC: e.target.value })}
                                            className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-white font-bold outline-none focus:border-cyan-500/50 transition-all appearance-none"
                                        >
                                            <option value="" className="bg-black">Select</option>
                                            {CTC_RANGES.map(range => <option key={range} value={range} className="bg-black">{range}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Relocation Readiness</label>
                                    <div className="flex gap-4">
                                        {['Yes', 'No', 'Remote Only'].map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() => setCandidateInfo({ ...candidateInfo!, relocation: option })}
                                                className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all border
                                                    ${candidateInfo?.relocation === option
                                                        ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400'
                                                        : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}
                                                `}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!isVerified}
                                className="w-full py-5 bg-white text-black font-black rounded-xl flex items-center justify-center gap-3 hover:bg-cyan-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
                            >
                                PROCEED TO ASSESSMENT
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        <div className="p-8 neural-glass rounded-3xl border border-cyan-500/10">
                            <div className="flex items-center gap-4 text-cyan-400 mb-4">
                                <Cpu className="w-5 h-5" />
                                <h4 className="font-black text-[10px] uppercase tracking-widest">System Note</h4>
                            </div>
                            <p className="text-gray-500 text-xs leading-relaxed font-medium">
                                Our AI analyzes your professional background to create a personalized interview experience.
                                <span className="text-gray-400"> Ensure your CV is up to date for the most relevant questions.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
