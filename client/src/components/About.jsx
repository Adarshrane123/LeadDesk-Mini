import React from 'react';
import { motion } from 'framer-motion';
import { Award, Code2, Rocket, Globe2, ShieldCheck, Cpu } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 relative bg-gray-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Visual Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4 relative"
          >
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/30 to-gray-900 border border-indigo-500/20">
                <Rocket className="w-8 h-8 text-indigo-400 mb-3" />
                <div className="text-3xl font-extrabold text-white">99.9%</div>
                <div className="text-xs text-gray-400 mt-1">Uptime & Reliability</div>
              </div>
              <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800">
                <Code2 className="w-8 h-8 text-cyan-400 mb-3" />
                <div className="text-3xl font-extrabold text-white">200K+</div>
                <div className="text-xs text-gray-400 mt-1">Lines of Production Code</div>
              </div>
            </div>
            <div className="space-y-4 pt-6">
              <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800">
                <Globe2 className="w-8 h-8 text-purple-400 mb-3" />
                <div className="text-3xl font-extrabold text-white">15+</div>
                <div className="text-xs text-gray-400 mt-1">Global Markets Served</div>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-900/30 to-gray-900 border border-cyan-500/20">
                <ShieldCheck className="w-8 h-8 text-emerald-400 mb-3" />
                <div className="text-3xl font-extrabold text-white">100%</div>
                <div className="text-xs text-gray-400 mt-1">Security Compliant</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-4">
              About Digital Heroes
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              We Craft Software & Digital Strategies That Scale Businesses.
            </h2>
            <p className="mt-4 text-gray-300 leading-relaxed text-base">
              At LeadDesk Mini (powered by Digital Heroes), we engineer custom digital solutions that bridge technical complexity and user engagement. Founded by senior architects and product strategists, we specialize in high-converting SaaS applications, enterprise full-stack web platforms, and automated marketing funnels.
            </p>
            <p className="mt-3 text-gray-400 leading-relaxed text-sm">
              Our multidisciplinary team combines deep domain expertise in Node.js, React, MongoDB, and modern DevOps with human-centered product design to deliver results that compound over time.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mt-1">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Award-Winning UI/UX</h4>
                  <p className="text-xs text-gray-400">Custom tailored interfaces optimized for user retention.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mt-1">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Enterprise Security</h4>
                  <p className="text-xs text-gray-400">JWT auth, encrypted MongoDB storage, and strict validation.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
