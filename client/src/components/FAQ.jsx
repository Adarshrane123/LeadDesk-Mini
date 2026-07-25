import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'What is the typical timeline for a custom web development project?',
    a: 'Most custom full-stack web platforms or SaaS applications are completed within 3 to 6 weeks, depending on the scope of features, design complexity, and API integrations.',
  },
  {
    q: 'How does LeadDesk Mini handle incoming leads and inquiries?',
    a: 'Every inquiry submitted via our public lead form is validated both on the front-end and back-end, then stored directly in our secure MongoDB database. Admins can track, filter, and manage these leads in real time through the protected Admin Dashboard.',
  },
  {
    q: 'Can we request custom features for our admin dashboard?',
    a: 'Absolutely. We design and develop bespoke admin portals with custom permissions, real-time analytics, export functionality, status workflows, and automated email notifications tailored to your operational needs.',
  },
  {
    q: 'What technologies do you use for development?',
    a: 'We specialize in the full MERN stack (MongoDB, Express.js, React, Node.js) styled with Tailwind CSS and Framer Motion, utilizing JWT for secure authentication and RESTful API standards.',
  },
  {
    q: 'How do you ensure data security and compliance?',
    a: 'We implement industry best practices: password hashing with bcrypt, JSON Web Tokens (JWT) for session management, Helmet HTTP headers, CORS policies, and sanitized inputs to protect against OWASP security vulnerabilities.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-4">
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            Everything you need to know about our digital agency services and process.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl border border-gray-800 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-white hover:text-indigo-400 transition-colors focus:outline-none"
              >
                <span className="text-base sm:text-lg flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0" />
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                    openIndex === idx ? 'rotate-180 text-indigo-400' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-sm text-gray-300 border-t border-gray-800/50 leading-relaxed pl-14">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
