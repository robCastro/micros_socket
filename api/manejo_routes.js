'use_strict';
const express = require('express');
const router = express.Router();
const Request = require("request");


const url_produccion = 'https://manejomesas.herokuapp.com/api/manejo_mesa/';
const url_local = 'http://localhost:3001/api/manejo_mesa/'

const url = url_produccion;

router.get('/vigilante/:id/cuida', function(req, res){
	res.redirect(`${url}vigilante/${req.params.id}/cuida`);
});


router.get('/votante/:id_persona', function(req, res){
	res.redirect(`${url}votante/${req.params.id_persona}`);
});
router.get('/votante/:id_votante/participa', function(req, res){
	res.redirect(`${url}votante/${req.params.id_votante}/participa`);
});
// Para topic
router.post('/votante/:id_votante/participa', function(req, res){
	res.redirect(307, `${url}votante/${req.params.id_votante}/participa`);
});


router.get('/vigilante/:id_vigilante', function(req, res){
	res.redirect(`${url}vigilante/${req.params.id_vigilante}`);
});
router.get('/vigilante/:id_vigilante/mesas', function(req, res){
	res.redirect(`${url}vigilante/${req.params.id_vigilante}/mesas`);
});
router.get('/mesa/:id_mesa/votantes', function(req, res){
	res.redirect(`${url}mesa/${req.params.id_mesa}/votantes`);
});


module.exports = router;