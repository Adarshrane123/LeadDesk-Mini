import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import {
  Shield,
  LogOut,
  Search,
  Filter,
  ArrowUpDown,
  User,
  Building2,
  Mail,
  Phone,
  Calendar,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Layers,
  Sparkles,
  Inbox,
  CheckCircle,
  Clock,
  Briefcase
} from 'lucide-react';
import LeadDetailModal from '../components/LeadDetailModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import Footer from '../components/Footer';

const AdminDashboardPage = () => {
  const { user, logout } = useAuth();

  // Lead State
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    inProgressLeads: 0,
    closedLeads: 0,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalFiltered: 0,
  });

  // Query & Filter State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [loading, setLoading] = useState(true);

  // Modals State
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch leads from backend MongoDB
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        search,
        status: statusFilter,
        sortBy,
        order: sortOrder,
        page: pagination.page,
        limit: pagination.limit,
      };

      const response = await api.get('/leads', { params });
      if (response.data.success) {
        setLeads(response.data.leads || []);
        if (response.data.stats) setStats(response.data.stats);
        if (response.data.pagination) setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error('Failed to load leads from database.');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, sortBy, sortOrder, pagination.page, pagination.limit]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Handle status update
  const handleUpdateStatus = async (leadId, newStatus) => {
    try {
      const response = await api.patch(`/leads/${leadId}/status`, { status: newStatus });
      if (response.data.success) {
        toast.success(`Status updated to ${newStatus}`);
        fetchLeads();
        if (selectedLead && selectedLead._id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  // Handle delete lead
  const handleDeleteLead = async () => {
    if (!leadToDelete) return;
    setDeleting(true);
    try {
      const response = await api.delete(`/leads/${leadToDelete._id}`);
      if (response.data.success) {
        toast.success('Lead submission deleted permanently.');
        setLeadToDelete(null);
        if (selectedLead && selectedLead._id === leadToDelete._id) {
          setSelectedLead(null);
        }
        fetchLeads();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete lead.');
    } finally {
      setDeleting(false);
    }
  };

  const statusBadgeColors = {
    New: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Contacted: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'In Progress': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Closed: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-between">
      {/* Header */}
      <header className="bg-gray-950 border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white flex items-center gap-2">
                LeadDesk <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">ADMIN</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400 bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-800">
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span>{user?.email || 'digitalheros@gmail.com'}</span>
            </div>

            <button
              onClick={logout}
              className="px-3.5 py-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-xs font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Lead Management Portal
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Real-time incoming business leads from MongoDB Atlas database.
            </p>
          </div>

          <button
            onClick={fetchLeads}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-xs font-semibold text-gray-300 hover:text-white transition-colors flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>
        </div>

        {/* Dashboard Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="glass-panel p-5 rounded-2xl border border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-400">Total Leads</span>
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Inbox className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{stats.totalLeads}</div>
            <span className="text-[11px] text-gray-500 mt-1 block">Submissions received</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-400">New Leads</span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">{stats.newLeads}</div>
            <span className="text-[11px] text-gray-500 mt-1 block">Awaiting response</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-400">Contacted</span>
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-blue-400">{stats.contactedLeads}</div>
            <span className="text-[11px] text-gray-500 mt-1 block">In conversation</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-400">Closed Leads</span>
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-purple-400">{stats.closedLeads}</div>
            <span className="text-[11px] text-gray-500 mt-1 block">Successfully converted</span>
          </div>
        </div>

        {/* Filter and Search Toolbar */}
        <div className="glass-panel p-4 rounded-2xl border border-gray-800 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, company, service..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 focus:border-indigo-500 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            {/* Status Filter */}
            <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-xl text-xs">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-400 font-medium">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPagination((prev) => ({ ...prev, page: 1 }));
                }}
                className="bg-transparent text-white focus:outline-none font-semibold cursor-pointer"
              >
                <option value="All" className="bg-gray-900">All Statuses</option>
                <option value="New" className="bg-gray-900">New</option>
                <option value="Contacted" className="bg-gray-900">Contacted</option>
                <option value="In Progress" className="bg-gray-900">In Progress</option>
                <option value="Closed" className="bg-gray-900">Closed</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-xl text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-400 font-medium">Sort:</span>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, ord] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(ord);
                }}
                className="bg-transparent text-white focus:outline-none font-semibold cursor-pointer"
              >
                <option value="createdAt-desc" className="bg-gray-900">Newest First</option>
                <option value="createdAt-asc" className="bg-gray-900">Oldest First</option>
                <option value="fullName-asc" className="bg-gray-900">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Real Leads Data Table */}
        <div className="glass-panel rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-900/80 text-gray-400 font-semibold uppercase tracking-wider border-b border-gray-800">
                <tr>
                  <th className="py-4 px-4">Lead / Company</th>
                  <th className="py-4 px-4">Contact Info</th>
                  <th className="py-4 px-4">Service Required</th>
                  <th className="py-4 px-4">Budget</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Submission Date</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">
                      <div className="inline-flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
                        <span>Loading lead submissions from MongoDB...</span>
                      </div>
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center">
                      <div className="max-w-xs mx-auto text-center">
                        <Inbox className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                        <h4 className="text-base font-bold text-white mb-1">No Leads Found</h4>
                        <p className="text-xs text-gray-400">
                          {search || statusFilter !== 'All'
                            ? 'No lead matching your filter criteria.'
                            : 'MongoDB is currently empty. Public website submissions will appear here in real time.'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-gray-900/40 transition-colors">
                      {/* Name & Company */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-white text-sm flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          {lead.fullName}
                        </div>
                        <div className="text-gray-400 text-xs flex items-center gap-1.5 mt-0.5">
                          <Building2 className="w-3 h-3 text-gray-500 shrink-0" />
                          {lead.company}
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="py-4 px-4">
                        <div className="text-gray-300 flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-gray-500 shrink-0" />
                          <a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a>
                        </div>
                        <div className="text-gray-400 text-xs flex items-center gap-1.5 mt-0.5">
                          <Phone className="w-3 h-3 text-gray-500 shrink-0" />
                          <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>
                        </div>
                      </td>

                      {/* Service */}
                      <td className="py-4 px-4">
                        <div className="text-gray-200 font-medium flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          {lead.service}
                        </div>
                      </td>

                      {/* Budget */}
                      <td className="py-4 px-4">
                        <span className="font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                          {lead.budget}
                        </span>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-4 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead._id, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border bg-gray-900 cursor-pointer focus:outline-none ${
                            statusBadgeColors[lead.status] || 'bg-gray-800 text-gray-300'
                          }`}
                        >
                          <option value="New" className="bg-gray-900 text-emerald-400">New</option>
                          <option value="Contacted" className="bg-gray-900 text-blue-400">Contacted</option>
                          <option value="In Progress" className="bg-gray-900 text-amber-400">In Progress</option>
                          <option value="Closed" className="bg-gray-900 text-purple-400">Closed</option>
                        </select>
                      </td>

                      {/* Submission Date */}
                      <td className="py-4 px-4 text-gray-400 text-xs">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-500" />
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            title="View Full Details"
                            className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 transition-colors"
                          >
                            <Eye className="w-4 h-4 text-indigo-400" />
                          </button>
                          <button
                            onClick={() => setLeadToDelete(lead)}
                            title="Delete Lead"
                            className="p-2 rounded-lg bg-gray-900 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-gray-800 hover:border-red-500/30 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="p-4 border-t border-gray-800 bg-gray-950/40 flex items-center justify-between text-xs">
              <span className="text-gray-400">
                Showing {leads.length} of {pagination.totalFiltered} leads (Page {pagination.page} of {pagination.totalPages})
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={pagination.page <= 1}
                  onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
                  className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-semibold text-white px-2">
                  {pagination.page} / {pagination.totalPages}
                </span>
                <button
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
                  className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      {leadToDelete && (
        <DeleteConfirmModal
          lead={leadToDelete}
          onClose={() => setLeadToDelete(null)}
          onConfirm={handleDeleteLead}
          deleting={deleting}
        />
      )}

      {/* Mandatory Footer */}
      <Footer />
    </div>
  );
};

export default AdminDashboardPage;
