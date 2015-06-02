var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt:localhost:1883');
var topic = 'hello';

console.log('Starting');
client.on('connect', function () {
  console.log('connected');
  client.subscribe(topic);
  client.publish(topic, 'Hello mqtt');
  console.log('Message published');
});

client.on('message', function (topic, message) {
  // message is Buffer 
  console.log(topic);
  console.log(message.toString());
  client.end();
});


console.log('Ending ...');


