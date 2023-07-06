console.log('Hello World !');

const express = require('express');

const App = express(); //starting our express app


App.get('/' , (request, response) => {
    return response.status(200).send('<h1>It works now ! </h1>');//200 for evy is OK

});
App.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});

App.post('/', (request, response) => {
    return response.status(200).send('<h1>It works from POST !</h1>');
});
