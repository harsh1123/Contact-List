
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contactList2');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to the database'));

db.once('open',function(){

    console.log('successly fully connected to the database');

});
