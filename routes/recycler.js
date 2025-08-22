// routes/recycler.js
const express = require('express');
const router = express.Router();
const recyclerController = require('../controllers/recyclerController');
const { authenticateRecycler } = require('../middleware/auth'); // Use unified auth

// Public routes (no authentication required)
router.post('/signup', recyclerController.signup);
router.post('/login', recyclerController.login);
router.post('/validate-license', recyclerController.validateLicense);

// Protected routes (authentication required)
router.get('/profile', authenticateRecycler, recyclerController.getProfile);
router.put('/profile', authenticateRecycler, recyclerController.updateProfile);
router.get('/dashboard', authenticateRecycler, recyclerController.getDashboard);

module.exports = router;