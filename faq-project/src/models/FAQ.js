import mongoose from 'mongoose';

const FAQSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String, // Stores HTML or text from a WYSIWYG editor
    required: true
  },
  question_hi: {
    type: String // Hindi translation of the question
  },
  question_bn: {
    type: String // Bengali translation of the question
  }
});

// Dynamically return question/answer based on selected language
FAQSchema.methods.getTranslatedText = function (lang) {
  if (lang === 'hi' && this.question_hi) {
    return { question: this.question_hi, answer: this.answer };
  } else if (lang === 'bn' && this.question_bn) {
    return { question: this.question_bn, answer: this.answer };
  }
  return { question: this.question, answer: this.answer };
};

const FAQ = mongoose.model('FAQ', FAQSchema);
export default FAQ;
