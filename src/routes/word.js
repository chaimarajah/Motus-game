const express = require('express');
const Router = express.Router();

const WordModel = require('../models/word');

Router.get('/', async (request, response) => {
    try {
        const wordGames = await WordModel.find();

        return response.status(200).json(wordGames);
    } catch (error) {
        return response.status(500).json({
            "error": error.message
        });
    }
});

Router.get('/:id', async (request, response) => {
    const { id } = request.params;

    try {
        const wordGame = await WordModel.findById(id);

        if (!wordGame) {
            return response.status(404).json({
                "error": "Word game not found"
            });
        }

        return response.status(200).json(wordGame);
    } catch (error) {
        return response.status(500).json({
            "error": error.message
        });
    }
});

Router.post('/', async (request, response) => {
    const { word } = request.body;

    const wordModel = new WordModel({ 
        name: word
    });

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

Router.put('/:id', async (request, response) => {
    const { id } = request.params;
    const { word } = request.body;

    try {
        const updatedGame = await WordModel.findByIdAndUpdate(
            id,
            { name: word },
            { new: true }
        );

        if (!updatedGame) {
            return response.status(404).json({
                "error": "Word game not found"
            });
        }

        return response.status(200).json(updatedGame);
    } catch (error) {
        return response.status(500).json({
            "error": error.message
        });
    }
});


Router.delete('/:id', async (request, response) => {
    const { id } = request.params;

    try {
        const deletedGame = await WordModel.findByIdAndDelete(id);

        if (!deletedGame) {
            return response.status(404).json({
                "error": "Word game not found"
            });
        }

        return response.status(200).json({
            "msg": "Word game deleted successfully"
        });
    } catch (error) {
        return response.status(500).json({
            "error": error.message
        });
    }
});

module.exports = Router;