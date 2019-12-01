var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const cors = require('cors');


app.use(cors())


io.on('connection', function(socket){
	console.log('Nueva Conexion');

	socket.on('abrir', function(id_mesa){
		console.log(id_mesa);
		io.emit('desbloquear', id_mesa);
	});
});

app.get('/', function(req, res){
	res.send('WebSocket Server, no HTTP Server');
});

port = process.env.PORT || 3004;

http.listen(port, function(){
	console.log('listening on *:3004');
});