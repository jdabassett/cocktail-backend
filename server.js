"use strict";

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cocktailHandler = require("./modules/cocktailHandler.js");
const databaseHandler = require("./modules/databaseHandler.js");
const verifyUser = require("./authorize.js");

const PORT = process.env.PORT;
const MONGODB_KEY = process.env.MONGODB_KEY;

var whitelist = ['http://localhost:3000/','http://localhost:3001/', 'https://thriving-crisp-134854.netlify.app/'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_KEY);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("Mongoose is connected!"));


app.get("/", (req, res) => {
  res.status(200).send({
    drinks: [
      {
        strDrink: "Vodka Slime",
        strDrinkThumb:
          "https://www.thecocktaildb.com/images/media/drink/apex461643588115.jpg",
        idDrink: "178362",
      },
      {
        strDrink: "Caribbean Orange Liqueur",
        strDrinkThumb:
          "https://www.thecocktaildb.com/images/media/drink/qwxuwy1472667570.jpg",
        idDrink: "12796",
      },
      {
        strDrink: "57 Chevy with a White License Plate",
        strDrinkThumb:
          "https://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg",
        idDrink: "14029",
      },
    ],
  });
});

app.use(verifyUser);

//general query searches
app.get("/name", cocktailHandler.getCocktailByName);

app.get("/category", cocktailHandler.getCocktailsByCategory);

app.get("/random", cocktailHandler.getRandomCocktails);

app.get("/ingredient", cocktailHandler.getCocktailsByIngredient);

app.get("/glass", cocktailHandler.getCocktailsByGlass);

//singular query search
app.get("/id", cocktailHandler.getCocktailById);

//database queries
app.get("/userCocktails", databaseHandler.userCocktails);

app.post("/createCocktail", databaseHandler.createCocktail);

app.put("/updateCocktail/:id", databaseHandler.updateCocktail);

app.delete("/deleteCocktail/:id", databaseHandler.deleteCocktail);

//handle errors
app.use((error, req, res) => {
  res.status(500).send({ error: error.message });
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
