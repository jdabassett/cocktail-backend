"use strict";

const axios = require("axios");
const data_oneCocktail = require("../data/data_one-cocktail.json");
const data_manyCocktails = require("../data/data_mult-cocktail.json");
const data_by_alcohol = require("../data/data_by-alcohol.json");
const cache = require("./cache.js");
const nanoid = require('nanoid');

const cocktailHandler = {};

cocktailHandler.getCocktailByName = (req, res) => {
  let queryName = req.query.name;
  let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${queryName}`;
  let queryKey = `getCocktailByName:${queryName}`;

  console.log(queryKey);

  //TODO: remove when ready
  res.status(200).send({ drinks: data_manyCocktails.drinks });

  // if (cache[queryKey] && Date.now() - cache[queryKey].timestamp < 10000000) {
  //   console.log('by-name:past');
  //   res.status(200).send({ drinks: [cache[queryKey].data] });
  // } else {
  //   console.log('by-name:now')
  //   axios
  //     .get(url)
  //     .then((response) =>
  //       new FormateOneCocktail(response.data.drinks[0]).returnFormatedObject()
  //     )
  //     .then((formatedResponse) => {
  //       cache[queryKey] = {};
  //       cache[queryKey].timestamp = Date.now();
  //       cache[queryKey].data = formatedResponse;
  //       res.status(200).send({ drinks: [formatedResponse] });
  //     })
  //     .catch((error) => res.status(404).send({ error: error.message }));
  // }
};

cocktailHandler.getCocktailsByCategory = (req, res) => {
  let queryCategory = req.query.category;
  let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${queryCategory}`;
  let queryKey = `getCocktailsByCategory:${queryCategory}`;

  console.log(queryKey);

  //TODO: remove when ready
  res.status(200).send({ drinks: data_by_alcohol.drinks });

  // if (cache[queryKey] && Date.now() - cache[queryKey].timestamp < 10000000) {
  //   console.log('by-category:past');
  //   res.status(200).send({ drinks: [cache[queryKey].data] });
  // } else {
  //   console.log('by-category:now')
  //   axios
  //     .get(url)
  //     .then(response => {
  //       cache[queryKey] = {};
  //       cache[queryKey].timestamp = Date.now();
  //       cache[queryKey].data = response.data.drinks;
  //       res.status(200).send({ drinks: response.data.drinks });
  //     })
  //     .catch((error) => res.status(404).send({ error: error.message }));
  // }
};

cocktailHandler.getRandomCocktails = async (req, res) => {
  let queryNumber =
    parseInt(req.query.number) < 6 ? parseInt(req.query.number) : 5;
  let url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  let returnArray = [];

  console.log("random: ", queryNumber);

  //TODO: remove when ready
  res.status(200).send({ drinks: data_manyCocktails.drinks });

  // try {
  //   for (let i=0; i<queryNumber; i++) {
  //     let response = await axios.get(url)
  //     let formatted = new FormateOneCocktail(response.data.drinks[0]).returnFormatedObject();
  //     returnArray.push(formatted);
  //   };
  //   res.status(200).send({drinks:returnArray})
  // } catch (error) {
  //   res.status(404).send({error:error.message})
  // }
};

cocktailHandler.getCocktailsByIngredient = (req, res) => {
  let ingredient = req.query.ingredient;
  let queryKey = `getCocktailsByIngredient:${ingredient}`;
  let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  console.log(queryKey);

  //TODO: Remove when ready
  res.status(200).send({ drinks: data_by_alcohol.drinks });

  // if (
  //   cache[queryKey] &&
  //   Date.now() - cache[queryKey].timestamp < 10000000
  // ) {
  //   console.log("by-ingredient:past");
  //   res.status(200).send({drinks:cache[queryKey].data})
  // } else {
  //   console.log("by-ingredient:now");
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       cache[queryKey] = {};
  //       cache[queryKey].timestamp = Date.now();
  //       cache[queryKey].data = response.data.drinks;
  //       res.status(200).send({drinks:response.data.drinks})
  //     })
  //     .catch((error) => res.status(404).send({ error: error.message }));
  // };
};

cocktailHandler.getCocktailsByGlass = (req, res) => {
  let glass = req.query.glass;
  let queryKey = `getCocktailsByGlass:${glass}`;
  let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass}`;

  console.log(queryKey);

  //TODO: Remove when ready
  res.status(200).send({ drinks: data_by_alcohol.drinks });

  // if (
  //   cache[queryKey] &&
  //   Date.now() - cache[queryKey].timestamp < 10000000
  // ) {
  //   console.log("by-glass:past");
  //   res.status(200).send({drinks:cache[queryKey].data})
  // } else {
  //   console.log("by-glass:now");
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       cache[queryKey] = {};
  //       cache[queryKey].timestamp = Date.now();
  //       cache[queryKey].data = response.data.drinks;
  //       res.status(200).send({drinks:response.data.drinks})
  //     })
  //     .catch((error) => res.status(404).send({ error: error.message }));
  // };
};

cocktailHandler.getCocktailById = (req, res) => {
  let id = req.query.id;
  let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  let queryKey = `getCocktailById:${id}`;

  console.log(queryKey);

  //TODO: Remove when ready
  // res.status(200).send({ drinks: [data_oneCocktail] });

  if (cache[queryKey] && Date.now() - cache[queryKey].timestamp < 10000000) {
    console.log("by-id:past");
    res.status(200).send({ drinks: [cache[queryKey].data] });
  } else {
    console.log("by-id:now");
    axios
      .get(url)
      .then((response) =>
        new FormateOneCocktail(response.data.drinks[0]).returnFormatedObject()
      )
      .then((formatedResponse) => {
        cache[queryKey] = {};
        cache[queryKey].timestamp = Date.now();
        cache[queryKey].data = formatedResponse;
        res.status(200).send({ drinks: [formatedResponse] });
      })
      .catch((error) => res.status(404).send({ error: error.message }));
  }
};

class FormateOneCocktail {
  constructor(resObject) {
    this.idDrink = resObject.idDrink;
    this.strDrink = resObject.strDrink;
    this.strGlass = resObject.strGlass;
    this.strCategory = resObject.strCategory;
    this.strInstructions = resObject.strInstructions;
    this.strDrinkThumb = resObject.strDrinkThumb;
    this.resObject = resObject;
    this.arrayMeasuredIngredients = [];
  }

  formateMeasuredIngredients() {
    let returnArray = [];
    for (let i = 1; i < 100; i++) {
      let ingredient = this.resObject[`strIngredient${i}`];
      let measurement = this.resObject[`strMeasure${i}`]
        ? this.resObject[`strMeasure${i}`]
        : "";
      if (ingredient && ingredient !== "" && ingredient !== null) {
        if (measurement) {
          returnArray.push({unit:measurement.trim(),ingredient:ingredient.trim(),id:nanoid()});
        } else {
          returnArray.push({unit:null,ingredient:ingredient.trim(),id:nanoid()});
        }
      } else {
        break;
      }
    }
    // console.log(returnArray);
    return returnArray;
  }

  formateInstructions() {
    let returnArray = [];
    let regex = /\r\n/g;
    if (regex.test(this.strInstructions)) {
      returnArray = this.strInstructions
        .split("\r\n")
        .filter((item) => item.trim().length !== 0)
        .map(item => ({instruction:item,id:nanoid()}))
    } else {
      returnArray = [{instruction:this.strInstructions,id:nanoid()}];
    }
    // console.log(this.strInstructions);
    return returnArray;
  }

  returnFormatedObject() {
    return {
      idDrink: this.idDrink,
      strDrink: this.strDrink || null,
      strGlass: this.strGlass || null,
      strCategory: this.strCategory || null,
      arrayInstructions: this.formateInstructions() || [],
      strDrinkThumb: this.strDrinkThumb || null,
      arrayMeasuredIngredients: this.formateMeasuredIngredients() || [],
      strNotes: null,
    };
  }
}

module.exports = cocktailHandler;
