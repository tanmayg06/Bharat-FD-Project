import React, { useState, useEffect } from 'react';

function App() {
  const [faqs, setFaqs] = useState([]);
  const [lang, setLang] = useState('en');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  // Fetch FAQs for a given language
  const fetchFaqs = async (language) => {
    try {
      setError('');
      // Because of the proxy, '/api/faqs' will call http://localhost:8000/api/faqs
      const response = await fetch(`/api/faqs?lang=${language}`);
      if (!response.ok) {
        throw new Error('Failed to fetch FAQs');
      }
      const data = await response.json();
      setFaqs(data);
    } catch (err) {
      setFaqs([]);
      setError(err.message);
    }
  };

  // Automatically fetch FAQs when lang changes
  useEffect(() => {
    fetchFaqs(lang);
  }, [lang]);

  // Create a new FAQ
  const handleCreateFAQ = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer })
      });
      if (!response.ok) {
        throw new Error('Error creating FAQ');
      }
      // Clear inputs
      setQuestion('');
      setAnswer('');
      // Re-fetch to see the new FAQ
      fetchFaqs(lang);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h1>FAQ Frontend</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '0.5rem' }}>Language:</label>
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
        </select>
        <button onClick={() => fetchFaqs(lang)} style={{ marginLeft: '0.5rem' }}>
          Fetch FAQs
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>FAQ List</h2>
      {faqs.length === 0 ? (
        <p>No FAQs found.</p>
      ) : (
        faqs.map((faq, idx) => (
          <div key={idx} style={{ backgroundColor: '#fff', marginBottom: '1rem', padding: '1rem', borderRadius: '4px' }}>
            <h3>{faq.question}</h3>
            <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
          </div>
        ))
      )}

      <h2>Create a New FAQ</h2>
      <form onSubmit={handleCreateFAQ} style={{ maxWidth: '400px' }}>
        <label htmlFor="question" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Question (English)
        </label>
        <input
          id="question"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '1rem' }}
        />

        <label htmlFor="answer" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Answer (HTML or Text)
        </label>
        <textarea
          id="answer"
          rows="4"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '1rem' }}
        />

        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Create FAQ
        </button>
      </form>
    </div>
  );
}

export default App;
