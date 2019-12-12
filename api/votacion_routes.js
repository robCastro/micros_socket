'use_strict';
const express = require('express');
const router = express.Router();
const Request = require("request");
const kafkaProducer = require('../kafka/producer');


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
	if (isNaN(parseInt(req.params.id_candidato)) || isNaN(parseInt(req.params.id_mesa))){
		res.status(400).json({msg: 'Usar parametros numericos'});
		return;
	}
	try{
		topic = process.env.CLOUDKARAFKA_TOPIC_PREFIX + 'Votar';
		console.log(topic);
		let mensaje = {
			"id_candidato": req.params.id_candidato,
			"id_mesa": req.params.id_mesa
		}
		kafkaProducer.produce(topic, -1, Buffer.from(JSON.stringify(mensaje)), 'votar');
		res.sendStatus(204);
	}
	catch(err){
		console.log('Error enviando el mensaje', err);
		res.status(500).json({msg: 'Error enviando el mensaje a Kafka'});
		return;
	}
	//res.redirect(`${url}candidato/${req.params.id_candidato}/${req.params.id_mesa}`);
});

/*router.post('/candidato/', function(req,res){
	res.redirect(307, `${url}candidato`);
});*/

module.exports = router;