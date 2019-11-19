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


http.listen(3004, function(){
	console.log('listening on *:3004');
});