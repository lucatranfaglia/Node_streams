const express = require('express');
const app = express();

const {streamsData} = require('./streamsData');
const {noStreamData} = require('./noStreamData');

// ------------------------------------
// FORMAT 
// ------------------------------------
// POSTMAN POST x-www-form-urlencoded (chiave-valore) : per la lettura del dato nel req.body è necessario convertire il contenuto in JSON 
// true: vengono mappati a json anche i paramentri a null e undefined
// false: vengono mappati a json solo stringhe
app.use(express.urlencoded({extended: true}));

// POSTMAN POST raw: per la lettura del dato nel req.body è necessario convertire il contenuto in JSON 
app.use(express.json());


// ------------------------------------------------------
// ROUTES
// ------------------------------------------------------
app.get('/healtcheck', (req, res) => {
    res.send('Hello World!').sendStatus(200);
});
app.get('/streams', streamsData);
app.get('/no_streams', noStreamData);

module.exports = {app};