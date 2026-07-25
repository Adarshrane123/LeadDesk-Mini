import React from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

const whyUsPoints = [
  {
    icon: Target,
    title: 'Outcome-Driven Architecture',
    desc: 'We focus on business metrics—conversions, performance, latency, and security—not just lines of code.',
  },
  {
    icon: Clock,
    title: 'Rapid Agile Sprints',
    desc: 'Iterative development cycles ensure transparent milestones, rapid feedback loops, and on-time launches.',
  },
  {
    icon: ShieldAlert,
    title: 'Production-Grade Security',
    desc: 'Built with enterprise standards: password hashing with bcrypt, JWT protection, helmet headers, and sanitized inputs.',
  },
  {
    icon: Sparkles,
    title: 'Pixel-Perfect UI & UX',
    desc: 'Crafted with Tailwind CSS and Framer Motion for liquid-smooth animations, responsive layouts, and modern aesthetic.',
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-20 relative bg-gray-950/40 border-y border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-4">
              Why Partner With Us
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Engineered for Speed, Built for Scalability.
            </h2>
            <p className="mt-4 text-gray-300 text-base sm:text-lg leading-relaxed">
              We eliminate traditional software bloat. Our team builds light, modular, and performant digital experiences that deliver real, measurable commercial impact from day one.
            </p>

            <div className="mt-8 space-y-4">
              {[
                'Direct communication with senior engineers and architects',
                'Transparent timeline and deliverables with zero hidden costs',
                'Comprehensive code documentation and full intellectual property transfer',
                'Integrated lead desk dashboard for instant lead capture and pipeline tracking',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                  <span className="text-sm font-medium text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyUsPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass-panel p-6 rounded-2xl border border-gray-800/80 hover:border-indigo-500/40 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{point.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{point.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
