'use strict'

require('dotenv').config();
const cocktailModel = require('./modules/cocktailModel.js');
const mongoose = require('mongoose');
const MONGODB_KEY = process.env.MONGODB_KEY

mongoose.connect(MONGODB_KEY);
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',()=>console.log("Mongoose is connected!"));

//create a new Book and save it to DB
async function seed() {

    await cocktailModel.create({
        idDrink:"1236",
        strDrink:"boogers",
        strDrinkAlternate:null,
        strGlass:"boogers",
        arrayInstructions:["11",'22','33'],
        strDrinkThumb:"seeded thumbnail",
        arrayMeasuredIngredients:['1','2','3'],
        strNotes:null,
        strUserEmail:'jacobbassett@gmail.com'
    })
        .then(() => console.log('Saved cocktail to the DB.'))
        .catch((err) => console.error(err));

    mongoose.disconnect();
}

seed();