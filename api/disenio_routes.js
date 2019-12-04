'use_strict';
const express = require('express');
const router = express.Router();
const kafkaProducer = require('../kafka/producer');

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
	if (isNaN(parseInt(req.body.ordenamiento.id_ordenamiento)) || isNaN(parseInt(req.body.tipoVotacion.id_tipo_votacion))){
		res.status(400).json({msg: 'Usar parametros numericos'});
		return;
	}
	let fechaInicio = new Date(req.body.fecha_inicio_votacion);
	let fechaFin = new Date(req.body.fecha_fin_votacion);
	if(!fechaInicio instanceof Date || isNaN(fechaInicio)){
		res.status(400).json({msg: 'Fecha de inicio no valida'});
		return;
	}
	if(!fechaFin instanceof Date || isNaN(fechaFin)){
		res.status(400).json({msg: 'Fecha de fin no valida'});
		return;
	}
	try{
		//topic = prefijo + topic como tal
		topic = process.env.CLOUDKARAFKA_TOPIC_PREFIX + 'Votacion'
		console.log(topic);
		//-1 para que el solo maneje las particiones, 'crear' para que todos los msjs con ese tag
		//esten en la misma particion
		kafkaProducer.produce(topic, -1, Buffer.from(JSON.stringify(req.body)), 'crear');
		res.status(200).json(req.body);
	}
	catch(err){
		console.log('Error enviando el mensaje', err);
		res.status(500).json({msg: 'Error enviando el mensaje a Kafka'});
		return;
	}
	// 307 para conservar el verbo post
	//res.redirect(307, `${url}votaciones/`);
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