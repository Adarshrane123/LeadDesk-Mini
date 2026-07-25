import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonialsData = [
  {
    name: 'Sarah Jenkins',
    role: 'VP of Growth',
    company: 'FinPulse SaaS',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote: 'LeadDesk Mini revolutionized how we handle incoming enterprise inquiries. The custom platform built by Digital Heroes increased our demo conversions by 240% in under two months.',
    rating: 5,
  },
  {
    name: 'Marcus Thorne',
    role: 'Founder & CEO',
    company: 'Apex Cloud Solutions',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote: 'The speed and architectural cleanliness of their team is remarkable. Their full-stack React and Express backend handled our viral traffic launch with zero downtime.',
    rating: 5,
  },
  {
    name: 'Elena Rostova',
    role: 'Chief Marketing Officer',
    company: 'Veloce Logistics',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    quote: 'From UI/UX design to MongoDB integration, Digital Heroes delivered a top-tier digital product. The real-time lead tracking dashboard gives us complete control over our sales pipeline.',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 relative bg-gray-950/60 border-t border-gray-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-4">
            Client Success
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            Read how we help high-growth companies engineer scalable web solutions and drive revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-8 rounded-2xl border border-gray-800 flex flex-col justify-between relative group hover:border-indigo-500/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-indigo-500/20 group-hover:text-indigo-500/40 transition-colors" />
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic mb-8">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-800/80">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-indigo-500/30"
                />
                <div>
                  <h4 className="text-white font-bold text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-400">{item.role}, <span className="text-indigo-400">{item.company}</span></p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
