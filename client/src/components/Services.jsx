import React from 'react';
import { motion } from 'framer-motion';
import { Code, Monitor, BarChart3, Database, Smartphone, Zap } from 'lucide-react';

const servicesList = [
  {
    icon: Code,
    title: 'Full-Stack Web Development',
    description: 'Scalable React, Node.js, and MongoDB web applications engineered with modern MVC architecture, RESTful APIs, and optimized database queries.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    icon: Monitor,
    title: 'Custom UI/UX & Product Design',
    description: 'Human-centric design systems, wireframes, and interactive prototypes tailored to increase visitor retention and maximize conversion rates.',
    tags: ['Figma', 'Design System', 'User Research', 'Prototyping'],
  },
  {
    icon: BarChart3,
    title: 'Digital Marketing & Growth Lead Gen',
    description: 'Data-driven performance marketing, SEO acceleration, and custom lead generation funnels designed to fill your sales pipeline with qualified opportunities.',
    tags: ['Lead Gen', 'Conversion Optimization', 'SEO', 'PPC Funnels'],
  },
  {
    icon: Database,
    title: 'Cloud Architecture & API Systems',
    description: 'Robust server backend infrastructure, secure JWT authentication systems, MongoDB database schema design, and microservices integration.',
    tags: ['MongoDB Atlas', 'JWT Auth', 'REST API', 'DevOps'],
  },
  {
    icon: Smartphone,
    title: 'Custom CRM & Dashboard Portals',
    description: 'Tailor-made admin dashboards, custom analytics tools, real-time lead management portals, and workflow automation for your team.',
    tags: ['Admin Dashboards', 'Lead Desk', 'Data Viz', 'Role Access'],
  },
  {
    icon: Zap,
    title: 'Performance & Security Audit',
    description: 'Comprehensive code reviews, core web vitals speed optimization, vulnerability assessments, and OWASP compliance auditing.',
    tags: ['Speed Audit', 'Helmet.js Security', 'CORS', 'Code Quality'],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-4">
            Capabilities & Services
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Comprehensive Digital Engineering Solutions
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            End-to-end digital expertise engineered to take your product from concept to market supremacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-8 rounded-2xl border border-gray-800 hover:border-indigo-500/50 transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-800/60">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-gray-900 border border-gray-800 text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
