'use strict'

require('dotenv').config();
const cocktailModel = require('./cocktailModel.js');
const cache = require('./cache.js');


const databaseHandler = {};

databaseHandler.userCocktails = (req,res) => {
  //TODO: must change from query to user once verification is working
  let queryObject = {strUserEmail:req.headers.email};
  let queryKey = `userCocktails:${req.headers.email}`;

  let now=new Date; 
  console.log('database-getAll',now.toString());

  if (cache[queryKey] && Date.now() - cache[queryKey].timestamp < 1000000){
    console.log('database-userCocktails:past');
    res.status(200).send({ drinks: cache[queryKey].data });
  } else {
    console.log('database-userCocktail:now');
    cocktailModel
    .find(queryObject)
    .then(response =>{
      // console.log(response);
      cache[queryKey] = {};
        cache[queryKey].timestamp = Date.now();
        cache[queryKey].data = response;
        // console.log(response);
      res.status(200).send({drinks:response});})
    .catch(error=> res.status(500).send({error:error.message}))
  };

      // cocktailModel
      //   .find(queryObject)
      //   .then(response =>{
      //     res.status(200).send({drinks:response});})
      //   .catch(error=> res.status(500).send({error:error.message}))
};

databaseHandler.createCocktail = (req, res) => {
  //TODO: must change from query to user once verification is working
  const createObject = { ...req.body, strUserEmail: req.headers.email };
  let queryKey = `userCocktails:${req.headers.email}`;

  if(cache[queryKey]){
    delete cache[queryKey];
  };

  console.log("database-post");

  cocktailModel
    .create(createObject)
    .then((response) => res.status(201).send(response))
    .catch((error) => res.status(500).send({ error: error.message }));
};

databaseHandler.updateCocktail=(req,res)=>{
  //TODO: must change from query to user once verification is working
  let id = req.params.id;
  let updateObject = {...req.body,strUserEmail: req.headers.email};
  let queryKey = `userCocktails:${req.headers.email}`;

  if(cache[queryKey]){
    delete cache[queryKey];
  };

  console.log("database-put");

  cocktailModel
    .findByIdAndUpdate(id,updateObject,{new:true,overwrite:true})
    .then((response)=> res.status(201).send(response))
    .catch((error)=> res.status(500).send({error:error.message}));
};

databaseHandler.deleteCocktail=(req,res)=>{
  let id = req.params.id;
  let queryKey = `userCocktails:${req.headers.email}`;

  if(cache[queryKey]){
    delete cache[queryKey];
  };

  console.log('database-delete',id);

  cocktailModel
    .findByIdAndDelete(id)
    .then(response=>res.status(204).send(response))
    .catch(error=>res.status(500).send({error:error.message}));
};



module.exports = databaseHandler;