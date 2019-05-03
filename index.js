const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const todocontroller = require('./controllers/todo/app');


app.set('view engine','ejs');

app.use(express.static('public'));

todocontroller(app);


app.listen(5000,()=>{
    console.log('Server started on port 5000');
});