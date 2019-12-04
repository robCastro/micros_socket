const Kafka = require("node-rdkafka");
require('dotenv').config();

const kafkaConf = {
  "group.id": "cloudkarafka-example",
  "metadata.broker.list": process.env.CLOUDKARAFKA_BROKERS.split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": process.env.CLOUDKARAFKA_USERNAME,
  "sasl.password": process.env.CLOUDKARAFKA_PASSWORD,
  "debug": "generic,broker,security"
};

const producer = new Kafka.Producer(kafkaConf);

producer.on('ready', function(){
  console.log('Conexion a Kakfa Lista');
});

producer.on("disconnected", function(arg) {
  console.log('Desconectado de Kafka');
  process.exit();
});

producer.on('event.error', function(err) {
  console.error(err);
  process.exit(1);
});
//producer.on('event.log', function(log) {
//  console.log(log);
//});
producer.connect();


module.exports = producer;