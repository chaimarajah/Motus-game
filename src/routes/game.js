
const express = require('express');

const WordModel = require('../models/word');
const GameModel = require('../models/game');

const Router = express.Router();

/*const words = ['moto', 'lion', 'pen'];
let search = null;*/

Router.post('/', async (request, response) => {
    const word = await WordModel.aggregate([{
        $sample: {size: 1}
    }]);

    const game = new GameModel({
        word: word[0]._id,
        tries: []
    });

    try {
        await game.save();

        return response.status(200).json({
            "msg": game
        });
    } catch (error) {
        return response.status(500).json({
            "error": error.message
        });
    }
});
/*Router.post('/create', (request, response) => {
    //return response.status(200).send('<h1>It works From Game / !</h1>');
    //search = words[1];
    search = words[Math.floor(Math.random()*words.length)];
    return response.status(200).json({
        //"word" : search
        "msg": 'New word is set : ' + search 
    })
});*/
Router.get('/:id', async (request, response) => {
    const {id} = request.params;

    try {
        const game = await GameModel.findOne({_id: id});

        return response.status(200).json({
            "msg": game
        });
    } catch (error) {
        return response.status(500).json({
            "error": error.message
        });
    }
})
Router.get('/:id', async (request, response) => {
    const {id} = request.params;

    try {
        const game = await GameModel.findOne({_id: id});

        return response.status(200).json({
            "msg": game
        });
    } catch (error) {
        return response.status(500).json({
            "error": error.message
        });
    }
})


Router.post('/verif', (request,reponse) => {
    if (typeof request.body.word === 'undefined') {
        return response.status(200).json ({
        "msg": "You have to send the 'word' value !"
        });
    }
    if (request.body.word === search){
        return response.status(200).json({
            "Result" : "You  find the word !"
        });
    }
    return reponse.status(500).json({
        "Result" : "You  didn't find the word !"
    });
   
})

module.exports = Router;


