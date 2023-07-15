const { response } = require('express');
const express = require('express');

const Router = express.Router();


const words = ['moto', 'lion', 'pen'];

let search = null;

Router.post('/create', (request, response) => {
    //return response.status(200).send('<h1>It works From Game / !</h1>');
    //search = words[1];
    words[Math.floor(Math.random()*words.length)];
    return response.status(200).json({
        //"word" : search
        "msg": 'New word is set : ' + search 
    })
});

Router.post('/verif', (request,reponse) => {
    if (typeof request.body.word === 'undefined') {
        return response.status(200).json ({
        "msg": "You have to send the 'word' value !"
        });
    }
    if (request.body.word === search){
        return reponse.status(200).json({
            "Result" : "You  find the word !"
        });
    }
    return reponse.status(500).json({
        "Result" : "You  didn't find the word !"
    });
   
})

module.exports = Router;


