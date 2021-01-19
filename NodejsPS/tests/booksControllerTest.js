const should = require('should');
const sinon = require('sinon');
const bookController = require('../controllers/booksController');

describe('Book Contrloller Test',() =>{
  describe('Post',() => {
    it('Should not allow empty title',() =>{
      const Book = function(book){this.save = () => {}};

      const req ={
        body:{
          author: 'Neb'
        }
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };
      const contrloller = bookController(Book);
      contrloller.post(req,res);

      res.status.calledWith(400).should.equal(true,`Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is required').should.equal(true);
    });
  })
})