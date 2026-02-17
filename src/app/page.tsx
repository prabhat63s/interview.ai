'use client';

import { useRouter } from 'next/navigation';
import { useInterviewStore } from '@/store/interviewStore';
import { motion } from 'framer-motion';
import { Target, Zap, ChevronRight, Shield, Cpu, Globe } from 'lucide-react';

export default function WelcomePage() {
  const router = useRouter();
  const resetSession = useInterviewStore((state) => state.resetSession);
  const handleStart = () => {
    resetSession();
    router.push('/profile');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-6xl w-full text-center space-y-16 relative z-10"
      >
        <div className="space-y-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-xl"
          >
            <Cpu className="w-4 h-4 animate-pulse" />
            Protocol Status: Active
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-tight">
            <span className="block text-white">AI-POWERED</span>
            <span className="text-cyber">INTERVIEWS</span>
          </h1>

          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Master your next technical interview with
            <span className="text-gray-300"> M37 Labs&apos; intelligent simulation engine.</span>
          </p>
        </div>

        {/* Action Area */}
        <div className="flex flex-col items-center gap-8">
          <motion.button
            whileHover={{ scale: 1.02, letterSpacing: "0.05em" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
            className="group relative px-10 py-5 bg-white text-black font-black text-lg rounded-xl overflow-hidden transition-all glow-primary"
          >
            <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center gap-3">
              START MOCK INTERVIEW
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          <div className="flex items-center gap-6 text-gray-600 text-[10px] font-bold tracking-widest uppercase">
            <span className="flex items-center gap-2"><Shield className="w-3.5 h-3.5" /> Secure</span>
            <span className="w-1 h-1 bg-gray-800 rounded-full" />
            <span className="flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> Global Standards</span>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
          {[
            { icon: Cpu, title: "Smart CV Analysis", desc: "Our AI parses your background to tailor questions specifically to your experience.", color: "cyan" },
            { icon: Target, title: "Dynamic Questioning", desc: "Experience an adaptive interview that evolves based on your real-time responses.", color: "purple" },
            { icon: Zap, title: "Deep Insights", desc: "Receive comprehensive feedback on your technical depth and communication skills.", color: "pink" }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="neural-glass p-10 rounded-3xl text-left group hover:border-cyan-500/50 transition-all relative overflow-hidden"
            >
              {/* Glossy Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              </div>

              <div className={`w-12 h-12 mb-8 flex items-center justify-center rounded-2xl bg-${feature.color}-500/10 text-${feature.color}-400 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="pt-20 border-t border-white/5">
          <div className="flex flex-wrap justify-center gap-4">
            {["RUST", "GO", "PYTHON", "REACT", "AWS", "K8S", "AI/ML"].map((tech) => (
              <span key={tech} className="px-6 py-2 rounded-full border border-white/5 text-[10px] font-black tracking-widest text-gray-600 hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
