'use strict';

const axios = require('axios');
const data_oneCocktail = require("../data/data_one-cocktail.json");
const data_manyCocktails = require("../data/data_mult-cocktail.json");
const data_by_alcohol = require("../data/data_by-alcohol.json");
const cache = require("./cache.js");

const cocktailHandler = {};

cocktailHandler.getRandomCocktail = async (req,res)=>{
  let queryNumber = req.query.num < 6 ? req.query.num: 5;
  let url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  let returnArray = [];

  console.log("random:",queryNumber);

  //TODO: remove when ready
  res.status(200).send({ drinks: data_manyCocktails.drinks });

  // try {
  //   for (let i=0; i<queryNumber; i++) {
  //     let response = await axios.get(url)
  //     let formatted = new FormateOneCocktail(response.data.drinks[0]).returnFormatedObject();
  //     returnArray.push(formatted);
  //     // console.log(formatted);
  //   };
  //   res.status(200).send({drinks:returnArray})
  // } catch (error) {
  //   res.status(404).send({error:error.message})
  // }
};

cocktailHandler.getCocktailById = (req,res)=>{
  let id = req.query.id;
  let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  let queryKey = `getCocktailById:${id}`;

  //TODO: Remove when ready
  res.status(200).send({drinks:[data_oneCocktail]});

  // if (cache[queryKey] && Date.now() - cache[queryKey].timestamp < 10000000) {
  //   console.log('by-id:past');
  //   res.status(200).send({ drinks: [cache[queryKey].data] });
  // } else {
  //   console.log('by-id:now')
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

cocktailHandler.getCocktailByAlcohol = (req,res)=>{
  let alcohol = req.query.alcohol.trim().toLowerCase().replace(/[\s-/]/g,"_");
  let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${alcohol}`
  let queryKey = `getCocktailByAlcohol:${alcohol}`
  console.log('by alcohol triggered', alcohol,queryKey)


  //TODO: Remove when ready
  res.status(200).send({drinks: data_by_alcohol.drinks.sort((a, b) => 0.5 - Math.random())});

  // if(cache[queryKey] && Date.now() - cache[queryKey].timestamp <3000){
  //   console.log('by-alcohol:past')
  //   res.status(200).send({drinks:cache[queryKey].data.sort((a,b)=>0.5-Math.random())})
  // } else {
  //   console.log('by-alcohol:new')
  //   axios.get(url)
  //   .then(response => {
  //     let responseData = response.data.drinks;
  //     cache[queryKey]={};
  //     cache[queryKey].timestamp=Date.now();
  //     cache[queryKey].data=responseData;
  //     res.status(200).send({drinks:responseData.sort((a,b)=>0.5-Math.random())});
  //   })
  //   .catch(error => res.status(404).send({error:error.message}))
  // };
}

class FormateOneCocktail {
  constructor(resObject) {
    this.idDrink = resObject.idDrink;
    this.strDrink = resObject.strDrink;
    this.strDrinkAlternate = resObject.strDrinkAlternate;
    this.strGlass = resObject.strGlass;
    this.strInstructions = resObject.strInstructions;
    this.strDrinkThumb = resObject.strDrinkThumb;
    this.resObject = resObject;
    this.arrayMeasuredIngredients = [];
  };

  formateMeasuredIngredients() {
    let returnArray = [];
    for (let i = 1; i < 100; i++) {
      let ingredient = this.resObject[`strIngredient${i}`];
      let measurement = this.resObject[`strMeasure${i}`]
        ? this.resObject[`strMeasure${i}`]
        : "";
      if (ingredient && ingredient !== "" && ingredient !== null) {
        if (measurement) {
          returnArray.push(`${measurement.trim()} ${ingredient.trim()}`);
        } else {
          returnArray.push(`${ingredient.trim()}`);
        }
      } else {
        break;
      }
    }
    // console.log(returnArray);
    return returnArray;
  };

  formateInstructions() {
    let returnArray = [];
    let regex = /\r\n/g;
    if (regex.test(this.strInstructions)) {
      returnArray = this.strInstructions
        .split("\r\n")
        .filter((item) => item.trim().length !== 0);
    } else {
      returnArray = [this.strInstructions];
    }
    // console.log(this.strInstructions);
    return returnArray;
  };

  returnFormatedObject() {
    return {
      idDrink: this.idDrink,
      strDrink: this.strDrink || null,
      strDrinkAlternate: this.strDrinkAlternate || null,
      strGlass: this.strGlass || null,
      arrayInstructions: this.formateInstructions() || [],
      strDrinkThumb: this.strDrinkThumb || null,
      arrayMeasuredIngredients: this.formateMeasuredIngredients() || [],
      strNotes: null,
    };
  };
}

module.exports = cocktailHandler;