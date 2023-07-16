const express = require('express');
const WordModel = require('../models/word');
const GameModel = require('../models/game');

const Router = express.Router();

const isLogged = (request, response, next) => {
  if (request.session.user) {
    console.log('test');
    next();
  } else {
    return response.status(500).json({ 'msg': "not logged !" });
  }
};

Router.post('/', async (request, response) => {
  const word = await WordModel.aggregate([{ $sample: { size: 1 } }]);

  let game = new GameModel({
    word: word[0]._id,
    tries: [],
    user: request.session.user._id
  });

  try {
    await game.save();

    game = await GameModel.findById(game._id)
      .populate('user')
      .populate('word');

    return response.status(200).json({
      "msg": game
    });
  } catch (error) {
    return response.status(500).json({
      "error": error.message
    });
  }
});

Router.get('/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const game = await GameModel.findOne({ _id: id });

    return response.status(200).json({
      "msg": game
    });
  } catch (error) {
    return response.status(500).json({
      "error": error.message
    });
  }
});

Router.post('/verif', isLogged, async (request, response) => {
  const userGuess = request.body.word;

  if (typeof userGuess === 'undefined') {
    return response.status(500).json({
      "msg": "You have to send a 'word' value"
    });
  }

  const gameId = request.session.gameId;
  const game = await GameModel.findById(gameId);

  if (!game) {
    return response.status(404).json({
      "msg": "Game not found"
    });
  }

  const word = await WordModel.findById(game.word);

  if (!word) {
    return response.status(404).json({
      "msg": "Word not found"
    });
  }

  const search = word.name;
  const result = makeVerification(userGuess, search);

  // Save the try and result in the game
  game.tries.push({
    word: userGuess,
    response: result
  });
  await game.save();

  return response.status(200).json({
    "word": userGuess,
    "response": result,
    "game": game
  });
});

function makeVerification(guess, search) {
  let result = "";

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === search[i]) {
      result += "1";
    } else if (search.includes(guess[i])) {
      result += "0";
    } else {
      result += "x";
    }
  }

  return result;
}

module.exports = Router;
