const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').createServer(app.use(cors()));
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const kafkaProducer = require('./kafka/producer');

app.use(bodyParser.json());

port = process.env.PORT || 3004;

io.on('connection', function(socket){
	console.log('Nueva Conexion');

	socket.on('abrir', function(id_mesa){
		console.log(id_mesa);
		io.emit('desbloquear', id_mesa);
	});
});

app.get('/', function(req, res){
	res.send('WebSocket y Gateway Server, no HTTP Server');
});


app.use('/api/diseniovotacion', require('./api/disenio_routes'));
app.use('/api/manejo_mesa', require('./api/manejo_routes'));
app.use('/api/registro_participantes', require('./api/registro_routes'));
app.use('/api/votacion', require('./api/votacion_routes'));


http.listen(port, function(){
	console.log('listening on *: ' + port);
});