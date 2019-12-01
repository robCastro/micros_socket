'use_strict';
const express = require('express');
const router = express.Router();
const Request = require("request");


const url_produccion = 'https://diseniovotacion.herokuapp.com/api/diseniovotacion/';
const url_local = 'http://localhost:3000/api/diseniovotacion/'

const url = url_produccion;

router.get('/votaciones/', function(req, res){
	res.redirect(`${url}votaciones/${req.query.strFechaInicio}`);
});

router.get('/votaciones/:id', function(req, res){
	res.redirect(`${url}votaciones/${req.params.id}`);
});

router.post('/votaciones/', function(req, res){
	// 307 para conservar el verbo post
	res.redirect(307, `${url}votaciones/`);
});

router.get('/mesas/:id', function(req, res){
	res.redirect(`${url}mesas/${req.params.id}`);
});

router.get('/mesas/', function(req, res){
	res.redirect(`${url}mesas/`);
});

// Para topic
router.put('/mesas/:id', function(req, res){
	res.redirect(307, `${url}mesas/${req.params.id}`);
});

router.get('/tipo_votacion/', function(req, res){
	res.redirect(`${url}tipo_votacion/`);
});

router.get('/ordenamiento/', function(req, res){
	res.redirect(`${url}ordenamiento/`);
});

module.exports = router;