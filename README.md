FAQ Management System
A Node.js/Express application for managing multilingual FAQs with an optional React frontend for testing and interaction.


Installation
Backend
Navigate to the backend folder:
cd faq-backend


Install dependencies:
npm install


Create a .env file:
MONGO_URI=mongodb://127.0.0.1:27017/faq_db
PORT=8000


Start the backend
npm run dev



Frontend (React)
Navigate to the frontend folder:
cd faq-frontend


Install dependencies:
npm install


Start the React app:
npm start


API Endpoints
Fetch All FAQs
Method: GET
URL: http://localhost:8000/api/faqs
Query Parameters:
?lang=hi for Hindi
?lang=bn for Bengali


Example:
curl http://localhost:8000/api/faqs?lang=hi


Create a New FAQ
Method: POST
URL: http://localhost:8000/api/faqs
Body (JSON):
{
  "question": "What is Node.js?",
  "answer": "<p>Node.js is a JavaScript runtime...</p>"
}

Example:
curl -X POST http://localhost:8000/api/faqs \
  -H "Content-Type: application/json" \
  -d '{"question":"What is Node.js?","answer":"<p>Node.js is a runtime...</p>"}'


License
This project is licensed under the MIT License. This concise README provides all the necessary details in a readable format!



