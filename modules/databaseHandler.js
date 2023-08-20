'use strict'

require('dotenv').config();
const cocktailModel = require('./cocktailModel.js');


const databaseHandler = {};

databaseHandler.userCocktails = (req,res) => {
  //TODO: must change from query to user once verification is working
  let queryObject = {strUserEmail:req.headers.email};

  let now=new Date; 
  console.log('database-getAll',now.toString());

  cocktailModel
    .find(queryObject)
    .then(response => res.status(200).send({drinks:response}))
    .catch(error=> res.status(500).send({error:error.message}))
};

databaseHandler.createCocktail = (req, res) => {
  //TODO: must change from query to user once verification is working
  const createObject = { ...req.body, strUserEmail: req.headers.email };
  console.log("database-post")
  cocktailModel
    .create(createObject)
    .then((response) => res.status(201).send(response))
    .catch((error) => res.status(500).send({ error: error.message }));
};

databaseHandler.updateCocktail=(req,res)=>{
  //TODO: must change from query to user once verification is working
  let id = req.params.id;
  let updateObject = {...req.body,strUserEmail: req.headers.email};
  console.log("database-put")
  cocktailModel
    .findByIdAndUpdate(id,updateObject,{new:true,overwrite:true})
    .then((response)=> res.status(201).send(response))
    .catch((error)=> res.status(500).send({error:error.message}));
};

databaseHandler.deleteCocktail=(req,res)=>{
  let id = req.params.id;

  cocktailModel
    .findByIdAndDelete(id)
    .then(response=>res.status(204).send(response))
    .catch(error=>res.status(500).send({error:error.message}));
};



module.exports = databaseHandler;