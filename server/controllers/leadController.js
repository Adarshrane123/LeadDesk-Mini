const Lead = require('../models/Lead');

// @desc    Create new lead submission
// @route   POST /api/leads
// @access  Public
const createLead = async (req, res) => {
  try {
    const { fullName, email, company, phone, service, budget, description } = req.body;

    const lead = await Lead.create({
      fullName,
      email,
      company,
      phone,
      service,
      budget,
      description,
      status: 'New',
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your project inquiry has been received.',
      lead,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all leads with search, filter, sort & pagination + Real Stats
// @route   GET /api/leads
// @access  Private (Admin)
const getLeads = async (req, res) => {
  try {
    const { search, status, sortBy = 'createdAt', order = 'desc', page = 1, limit = 10 } = req.query;

    // Filter query construction
    let query = {};

    // Status filter
    if (status && status !== 'All') {
      query.status = status;
    }

    // Search query (fullName, email, company, service)
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { fullName: searchRegex },
        { email: searchRegex },
        { company: searchRegex },
        { service: searchRegex },
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const sortOrder = order === 'asc' ? 1 : -1;
    const sortOption = { [sortBy]: sortOrder };

    const leads = await Lead.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    const totalFiltered = await Lead.countDocuments(query);

    // Calculate real stats across the whole collection
    const totalLeads = await Lead.countDocuments({});
    const newLeads = await Lead.countDocuments({ status: 'New' });
    const contactedLeads = await Lead.countDocuments({ status: 'Contacted' });
    const inProgressLeads = await Lead.countDocuments({ status: 'In Progress' });
    const closedLeads = await Lead.countDocuments({ status: 'Closed' });

    res.json({
      success: true,
      leads,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalFiltered / limitNum) || 1,
        totalFiltered,
      },
      stats: {
        totalLeads,
        newLeads,
        contactedLeads,
        inProgressLeads,
        closedLeads,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single lead by ID
// @route   GET /api/leads/:id
// @access  Private (Admin)
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    res.json({ success: true, lead });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update lead status
// @route   PATCH /api/leads/:id/status
// @access  Private (Admin)
const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['New', 'Contacted', 'In Progress', 'Closed'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    lead.status = status;
    await lead.save();

    res.json({
      success: true,
      message: `Lead status updated to ${status}`,
      lead,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Private (Admin)
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    await lead.deleteOne();

    res.json({
      success: true,
      message: 'Lead deleted successfully',
      id: req.params.id,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLeadStatus,
  deleteLead,
};
