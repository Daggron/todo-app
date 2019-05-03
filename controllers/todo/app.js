var data = [{item:'Learn Android'},{item:'Learn Nodejs'},{item:'Learn Machine'}];
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://test:test@cluster0-vly8r.mongodb.net/test?retryWrites=true');

const schema = new mongoose.Schema({
    item: String
});

const model = mongoose.model('ToDo',schema);




const urlencoded = bodyparser.urlencoded({extended:false});

module.exports=(app)=>{

    app.get('/todo',(req,res)=>{
       model.find({},(err,data)=>{
           if(err) throw err;
           res.render('todo',{data:data});
       });
    });


    app.post('/todo',urlencoded,(req,res)=>{
        const todo = model(req.body).save((err)=>{
            if(err) throw err;
            console.log('data saved successfuly');
            res.json(data);
        });
    });

    app.delete('/todo/:item',(req,res)=>{
        model.find({item:req.params.item.replace(/\-/g," ")}).remove((err,data)=>{
            if(err) throw err;
            res.json(data);
        })

    });
}