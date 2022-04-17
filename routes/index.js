const express = require('express');

//Suggestions Router
const suggestionsRouter = require('./suggestions-api/suggestions-api');

var routes = (app) => {
    
    app.use(express.json());
    app.use('/suggestions',suggestionsRouter)

};

module.exports = routes;