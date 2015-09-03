var mqtt = require('mqtt');
var options = {port: 1883, host: 'localhost'}
var client = mqtt.connect(options);
var topic = 'fullstackfest/car/#';


var handler = MessageHandler();

console.log('Starting');

client.on('connect', function () {
  console.log('connected');
  client.subscribe(topic);
});

client.on('message', function (topic, message) {
  console.log(handler.make_package(topic,message));
});


function MessageHandler()
{
  var factory = {};
  function transform_message(message){
    var rc = {};
    if (message) {
      rc = JSON.parse(message.toString());
    }
    return rc;
  }

  factory.make_package = function(topic,message){
    var data = topic.split("/");
    var package = {
      type: data[1],
      car: data[2],
      action: data[3]
    };

    if (data[4]) package.code = data[4];

    package.payload = transform_message(message);
    return package;
  };

  return factory;
}



