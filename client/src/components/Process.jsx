import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Code, Rocket, CheckCircle } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Discovery & Strategy',
    description: 'We analyze your business objectives, target audience, technical requirements, and competitive landscape to chart a custom roadmap.',
  },
  {
    step: '02',
    icon: Compass,
    title: 'Architecture & UI Design',
    description: 'Our designers craft high-fidelity wireframes and interactive prototypes, establishing design tokens and component libraries.',
  },
  {
    step: '03',
    icon: Code,
    title: 'Agile Full-Stack Build',
    description: 'Engineering using clean MERN stack architecture, strict validation, modular controllers, and security best practices.',
  },
  {
    step: '04',
    icon: Rocket,
    title: 'Deployment & Growth',
    description: 'CI/CD deployment to production (Vercel & Render), database setup on MongoDB Atlas, real-time lead tracking, and post-launch support.',
  },
];

const Process = () => {
  return (
    <section id="process" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-4">
            How We Work
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Proven 4-Step Process
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            From initial strategy to final deployment, we ensure complete transparency and momentum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="glass-panel p-6 rounded-2xl border border-gray-800 relative group hover:border-indigo-500/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-black text-indigo-500/30 group-hover:text-indigo-400 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
