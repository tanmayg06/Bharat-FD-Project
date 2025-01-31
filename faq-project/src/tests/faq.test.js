import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../../server.js';

const expect = chai.expect;
chai.use(chaiHttp);

describe('FAQ API Tests', () => {
  before(async () => {
    // Connect to a test-specific MongoDB database
    await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://127.0.0.1:27017/faq_db_test');
  });

  after(async () => {
    // Clean up test database
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create a new FAQ', (done) => {
    chai.request(app)
      .post('/api/faqs')
      .send({ question: 'What is Node.js?', answer: '<p>Node.js is a JavaScript runtime...</p>' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should retrieve FAQs in default language', (done) => {
    chai.request(app)
      .get('/api/faqs')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
