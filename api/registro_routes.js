'use_strict';
const express = require('express');
const router = express.Router();
const Request = require("request");


const url_produccion = 'https://participantes.herokuapp.com/api/registro_participantes/';
const url_local = 'http://localhost:3002/api/registro_participantes/'

const url = url_produccion;


router.get('/personas/', function(req, res){
	res.redirect(`${url}personas/`);
});
router.get('/personas/:id', function(req, res){
	res.redirect(`${url}personas/${req.params.id}`);
});


module.exports = router;