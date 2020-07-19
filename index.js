
const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList = [
    {
        name: "harsh",
        phone: "1234567890"
    },
    {
        name:"Arpan",
        phone:"11111111111"
    },
    {
        name:"aviraj",
        phone:"13341571979"
    }
]

app.get('/home',function(req,res){

   Contact.find({},function(err,contacts){
       if(err){
           console.log(err);
           return;
       }
       return res.render('home',{
        title:"Contact List",
        contact_list: contacts
  
    });

   });

 

});

app.post('/create-contact',function(req,res){

  
    Contact.create({
        name:req.body.name,
        phone:req.body.phone

    },function(err,newcontact){
        if(err)
        {
            console.log(err);
            return;
        }
        console.log('******',newcontact);
        

        return res.redirect('back');

    });

});

app.get('/delete-contact/',function(req,res){

   
    let id  = req.query.id;

  Contact.findByIdAndDelete(id,function(err){
      if(err){
          console.log(err);
          return;
      }
      return res.redirect('back');

  });


    

});

app.listen(port,function(err){
    if(err)
    {
        console.log(err);
        return;
    }

    console.log('hello from the outside port:',port);

});