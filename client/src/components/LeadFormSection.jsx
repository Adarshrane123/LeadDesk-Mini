import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, User, Mail, Building2, Phone, Briefcase, DollarSign, MessageSquare, Loader2 } from 'lucide-react';
import api from '../services/api';

const serviceOptions = [
  'Full-Stack Web Development',
  'Custom UI/UX Design',
  'Growth Lead Generation',
  'Cloud Architecture & API',
  'Custom CRM Portal',
  'Performance Audit',
];

const budgetOptions = [
  '$1,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000+',
];

const LeadFormSection = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSubmittedSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const response = await api.post('/leads', data);
      if (response.data.success) {
        toast.success(response.data.message || 'Lead submitted successfully!', {
          duration: 4000,
          position: 'top-right',
        });
        setSubmittedSubmittedSuccess(true);
        reset();
      } else {
        toast.error(response.data.message || 'Failed to submit inquiry.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      const errorMessage =
        error.response?.data?.message || 'Server error occurred. Please try again.';
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-right',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-gray-950/80 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left info column */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-4">
              Start Your Journey
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready to Accelerate Your Growth?
            </h2>
            <p className="mt-4 text-gray-300 text-base leading-relaxed">
              Fill out the form to schedule a project consultation. Our strategy leads will review your inquiry and respond within 24 hours with a custom project proposal.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base">Instant Processing</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Your inquiry is logged in real-time on our secure MongoDB backend.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base">NDA & Data Privacy</h4>
                  <p className="text-xs text-gray-400 mt-0.5">All business specifications and intellectual property remain 100% confidential.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Lead Form column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 sm:p-10 rounded-3xl border border-gray-800 shadow-2xl relative"
            >
              {submittedSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Your inquiry was submitted! We will reach out shortly.</span>
                  </div>
                  <button
                    onClick={() => setSubmittedSubmittedSuccess(false)}
                    className="text-xs underline hover:text-white"
                  >
                    Submit another
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        {...register('fullName', { required: 'Full Name is required' })}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-900/90 border ${
                          errors.fullName ? 'border-red-500' : 'border-gray-800 focus:border-indigo-500'
                        } rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all`}
                      />
                    </div>
                    {errors.fullName && (
                      <span className="text-xs text-red-400 mt-1 block">{errors.fullName.message}</span>
                    )}
                  </div>

                  {/* Business Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Business Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="john@company.com"
                        {...register('email', {
                          required: 'Business Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                          },
                        })}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-900/90 border ${
                          errors.email ? 'border-red-500' : 'border-gray-800 focus:border-indigo-500'
                        } rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all`}
                      />
                    </div>
                    {errors.email && (
                      <span className="text-xs text-red-400 mt-1 block">{errors.email.message}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Company Name *
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Acme Tech Inc."
                        {...register('company', { required: 'Company Name is required' })}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-900/90 border ${
                          errors.company ? 'border-red-500' : 'border-gray-800 focus:border-indigo-500'
                        } rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all`}
                      />
                    </div>
                    {errors.company && (
                      <span className="text-xs text-red-400 mt-1 block">{errors.company.message}</span>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        {...register('phone', { required: 'Phone Number is required' })}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-900/90 border ${
                          errors.phone ? 'border-red-500' : 'border-gray-800 focus:border-indigo-500'
                        } rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all`}
                      />
                    </div>
                    {errors.phone && (
                      <span className="text-xs text-red-400 mt-1 block">{errors.phone.message}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Service Required */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Service Required *
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        {...register('service', { required: 'Please select a service' })}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-900/90 border ${
                          errors.service ? 'border-red-500' : 'border-gray-800 focus:border-indigo-500'
                        } rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all appearance-none`}
                      >
                        <option value="" className="bg-gray-900 text-gray-400">Select a service...</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-gray-900 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.service && (
                      <span className="text-xs text-red-400 mt-1 block">{errors.service.message}</span>
                    )}
                  </div>

                  {/* Estimated Budget */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Estimated Budget *
                    </label>
                    <div className="relative">
                      <DollarSign className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        {...register('budget', { required: 'Please select a budget range' })}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-900/90 border ${
                          errors.budget ? 'border-red-500' : 'border-gray-800 focus:border-indigo-500'
                        } rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all appearance-none`}
                      >
                        <option value="" className="bg-gray-900 text-gray-400">Select budget range...</option>
                        {budgetOptions.map((b) => (
                          <option key={b} value={b} className="bg-gray-900 text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.budget && (
                      <span className="text-xs text-red-400 mt-1 block">{errors.budget.message}</span>
                    )}
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Project Description *
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                    <textarea
                      rows={4}
                      placeholder="Tell us about your project goals, scope, requirements, and target launch timeline..."
                      {...register('description', { required: 'Project description is required' })}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-900/90 border ${
                        errors.description ? 'border-red-500' : 'border-gray-800 focus:border-indigo-500'
                      } rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all resize-none`}
                    />
                  </div>
                  {errors.description && (
                    <span className="text-xs text-red-400 mt-1 block">{errors.description.message}</span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-semibold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center justify-center gap-2 text-base"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Proposal Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LeadFormSection;
