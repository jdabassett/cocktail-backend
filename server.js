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

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_KEY);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("Mongoose is connected!"));



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
