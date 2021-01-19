require('should');

const request = require('supertest');
const mongoose = require('mongoose');
process.env.ENV = 'Test';
const app = require('../app');
const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book CRUD Test',() => {
  it('Should allow a book to be posted and return read and _it', (done) =>{
    const bookPost = {title: "My Test book", author: "my automation test", genere: 'Automation'};

    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        //console.log(results);
        //results.body.read.should.be.equal('false');
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });
  after((done)=>{
    mongoose.connection.close();
    app.server.close(done());
  });
});