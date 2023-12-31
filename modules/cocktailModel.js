'use strict';

const mongoose = require('mongoose');


const cocktailSchema = new mongoose.Schema({
  idDrink:{type:String,require:true},
  strDrink:{type:String,require:true},
  strGlass:{type:String, default:null},
  strCategory:{type:String,default:null},
  arrayInstructions:{type:Array, default:[]},
  strDrinkThumb:{type:String, default:null},
  arrayMeasuredIngredients:{type:Array, default:[]},
  strNotes:{type:String,default:null},
  strUserEmail:{type:String,require:true}
});

module.exports=mongoose.model('cocktailModel',cocktailSchema);