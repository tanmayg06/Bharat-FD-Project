import FAQ from '../models/FAQ.js';
import { translateText } from '../services/translateService.js';

// Retrieve FAQs (with optional language selection in query param)
export async function getFAQs(req, res) {
  try {
    const lang = req.query.lang || 'en';
    const faqs = await FAQ.find();
    const results = faqs.map((faq) => faq.getTranslatedText(lang));
    res.json(results);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Create a new FAQ and automatically translate the question
export async function createFAQ(req, res) {
  try {
    const { question, answer } = req.body;

    // Translate question into Hindi and Bengali
    const hei = await translateText(question, 'hi');
    const bni = await translateText(question, 'bn');

    const newFAQ = new FAQ({
      question,
      answer,
      question_hi: hei,
      question_bn: bni
    });

    await newFAQ.save();
    res.status(201).json(newFAQ);
  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
