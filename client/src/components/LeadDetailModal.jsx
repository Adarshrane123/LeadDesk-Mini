import React from 'react';
import { X, User, Building2, Mail, Phone, Briefcase, DollarSign, Calendar, Clock, MessageSquare, Tag } from 'lucide-react';

const LeadDetailModal = ({ lead, onClose, onUpdateStatus }) => {
  if (!lead) return null;

  const statusColors = {
    New: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Contacted: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'In Progress': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Closed: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel w-full max-w-2xl rounded-3xl border border-gray-800 shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-gray-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{lead.fullName}</h3>
              <p className="text-xs text-gray-400">{lead.company}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                statusColors[lead.status] || 'bg-gray-800 text-gray-300'
              }`}
            >
              {lead.status}
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80 flex items-center gap-3">
              <Mail className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <span className="text-[11px] text-gray-400 uppercase font-semibold block">Email</span>
                <a href={`mailto:${lead.email}`} className="text-sm font-medium text-white hover:underline">
                  {lead.email}
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80 flex items-center gap-3">
              <Phone className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-[11px] text-gray-400 uppercase font-semibold block">Phone</span>
                <a href={`tel:${lead.phone}`} className="text-sm font-medium text-white hover:underline">
                  {lead.phone}
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80 flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-purple-400 shrink-0" />
              <div>
                <span className="text-[11px] text-gray-400 uppercase font-semibold block">Service Required</span>
                <span className="text-sm font-medium text-white">{lead.service}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80 flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[11px] text-gray-400 uppercase font-semibold block">Budget Range</span>
                <span className="text-sm font-medium text-white">{lead.budget}</span>
              </div>
            </div>
          </div>

          {/* Submission Date */}
          <div className="flex items-center gap-2 text-xs text-gray-400 px-1">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span>Submitted on: {new Date(lead.createdAt).toLocaleString()}</span>
          </div>

          {/* Message / Description */}
          <div>
            <h4 className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              Project Description
            </h4>
            <div className="p-4 rounded-2xl bg-gray-900/90 border border-gray-800 text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
              {lead.description}
            </div>
          </div>

          {/* Status Update Quick Select */}
          <div className="pt-4 border-t border-gray-800">
            <label className="block text-xs font-semibold uppercase text-gray-400 tracking-wider mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4 text-indigo-400" />
              Change Lead Status
            </label>
            <div className="flex flex-wrap gap-2">
              {['New', 'Contacted', 'In Progress', 'Closed'].map((st) => (
                <button
                  key={st}
                  onClick={() => onUpdateStatus(lead._id, st)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    lead.status === st
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400'
                      : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-800 bg-gray-900/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailModal;
