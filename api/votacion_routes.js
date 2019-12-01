'use_strict';
const express = require('express');
const router = express.Router();
const Request = require("request");


const url_produccion = 'https://microsvotacion.herokuapp.com/api/votacion/';
const url_local = 'http://localhost:3003/api/votacion/'

const url = url_produccion;



router.get('/', function(req, res){
	res.redirect(url);
});

router.get('/votacion/:id', function(req, res){
	res.redirect(`${url}votacion/${req.params.id}`);
});

router.get('/votacion/:id/candidatos', function(req, res){
	res.redirect(`${url}votacion/${req.params.id}/candidatos`);
});

router.get('/afiliacion/', function(req, res){
	res.redirect(`${url}afiliacion`);
});

router.put('/candidato/:id_candidato/:id_mesa/', function(req, res){
	res.redirect(`${url}candidato/${req.params.id_candidato}/${req.params.id_mesa}`);
});

router.post('/candidato/', function(req,res){
	res.redirect(307, `${url}candidato`);
});

module.exports = router;