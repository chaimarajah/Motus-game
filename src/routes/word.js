const express = require('express');
 const Router = express.Router();


const WordModel = require('../models/word');
 Router.post('/', async (request, response) => {
     const { word } = request.body;

     const WordModel = new WordModel({
        name : word
    });
     //await WordModel.save();
     //return response.status(200).json({
        // "msg": "It works from word / post" 
        //"msg": word
     //})

     try {

        await wordModel.save();

        return response.status(200).json({
            "msg": word
        });

    } catch (error) {
        return response.status(500).json({
            "error": error.message
        });
    }
 });

 module.exports = Router;