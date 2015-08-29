var mqtt    = require('mqtt');
var options={port: 1883, host: '192.168.3.124'}
var client  = mqtt.connect(options);
var topic = 'rally_data';

console.log('Starting');

client.on('connect', function () {
  console.log('connected');
  client.subscribe(topic);
});

client.on('message', function (topic, message) {
  console.log(message.toString());
});


