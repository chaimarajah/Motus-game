console.log('Hello Wolrd !');

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require ('mongoose');
const session = require('express-session');

try {
    mongoose.connect(process.env.MONGODB);
    console.log("Connected to the db");
} catch(error) {
    console.error('Can\'t connect to the db');

}

const App = express();
App.use(helmet());
App.use(morgan('common'));
App.use(express.json());



const GameRoutes = require('./routes/game');



App.get('/', (request, response) => {
    return response.status(200).send('<h1>It works From GET !</h1>'); //200 that says evy is ok
});

App.post('/', (request, response) => {
    return response.status(200).send('<h1>It works from POST !</h1>');
});

App.use('/game', GameRoutes);

App.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});