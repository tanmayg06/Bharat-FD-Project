import { Router } from 'express';
import { getFAQs, createFAQ } from '../controllers/faqController.js';

// Express Router
const router = Router();

// GET all FAQs (supports ?lang=hi or ?lang=bn)
router.get('/', getFAQs);

// POST create a new FAQ
router.post('/', createFAQ);

export default router;
