const express = require('express');
const router = express.Router();
const {
  createLead,
  getLeads,
  getLeadById,
  updateLeadStatus,
  deleteLead,
} = require('../controllers/leadController');
const { validateLead } = require('../validators/leadValidator');
const { protect } = require('../middleware/authMiddleware');

// Public route to submit lead
router.post('/', validateLead, createLead);

// Protected Admin routes
router.get('/', protect, getLeads);
router.get('/:id', protect, getLeadById);
router.patch('/:id/status', protect, updateLeadStatus);
router.delete('/:id', protect, deleteLead);

module.exports = router;
