console.log('Hello Wolrd !');

const express = require('express'); //to manage the routes
const helmet = require('helmet'); //for security reasons
const morgan = require('morgan'); //to get a line when sending a request
const mongoose = require ('mongoose'); //to make the connection and manage db
const session = require('express-session'); 



const GameRoutes = require('./routes/game');
const WordRoutes = require('./routes/word');
const AuthRoutes = require('./routes/auth');


//mongoose.connect('mongodb://127.0.0.1:27017/myapp');
//mongoose.connect(process.env.MONGODB)
try {
    mongoose.connect(process.env.MONGODB);
    console.log("Connected to the db");
} catch(error) {
    console.error('Can\'t connect to the db');
} //try catch to know if we have a connection or not

const App = express();
App.use(helmet());
App.use(morgan('common'));
App.use(express.json());
App.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        httpOnly: true
    }
}));




App.get('/', (request, response) => {
    return response.status(200).send('<h1>It works From GET !</h1>'); //200 that says evy is ok
});

App.post('/', (request, response) => {
    return response.status(200).send('<h1>It works from POST !</h1>');
});

App.use('/game', GameRoutes);
App.use('/word', WordRoutes);
App.use('/auth', AuthRoutes);



App.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});