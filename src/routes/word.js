const express = require('express');
 const Router = express.Router();


const WordModel = require('../models/word');
 Router.post('/', async (request, response) => {
     const { word } = request.body;
     

     return response.status(200).json({
        // "msg": "It works from word / post" 
        "msg": word
     })
 });

 module.exports = Router;