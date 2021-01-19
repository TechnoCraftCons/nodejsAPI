const { query } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

if(process.env.ENV === 'Test'){
    console.log('This is test')
    const db = mongoose.connect('mongodb://localhost/bookAPI_Test');
}
else{
    console.log('This is Prod')
    const db = mongoose.connect('mongodb://localhost/bookAPI-prod');
}
const port = process.env.PORT || 3000;
const book = express.Router();

const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter)
app.get('/', (req, res) => {
    res.send('Welcome to my API');
})

app.server = app.listen(port, () => {
    console.log(`My app is running on port ${port}`);
})

module.exports = app;