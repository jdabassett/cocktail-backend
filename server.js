'use strict'

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT;
const MONGODB_KEY = process.env.MONGODB_KEY

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(MONGODB_KEY);

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',()=>console.log("Mongoose is connected!"));

app.get('/',(req,res)=>{
  res.status(200).send('Hey your default route is working');
});

  // app.get('/random',cocktailHandler.getRandomCocktail);

  // app.get('/id',cocktailHandler.getCocktailById);

  // app.get('/alcohol',cocktailHandler.getCocktailByAlcohol);

  // app.get('/userCocktails',databaseHandler.userCocktails);

  // app.get('/createCocktail',databaseHandler.createCocktail);

  // app.get('/updateCocktail/:id',databasehandler.updateCocktail);

  // app.get('/deleteCocktail/:id',databaseHandler.deleteCocktail);

app.use((error,req,res)=>{
  res.status(500).send({error:error.message});
});

app.listen(PORT,()=> console.log(`listening on ${PORT}`))

