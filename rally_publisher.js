var mqtt = require('mqtt');
var fs = require('fs');
var topic = 'rally_data';

var lines = fs.readFileSync('data/rally_data.txt').toString().split("\n");
if(lines.length == 0) {
  console.log('empty datafile');
  process.exit();
}

var lnNum = 0;

var options = {port: 1883, host: '192.168.3.124'}
var client = mqtt.connect(options);

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
});

function publish_line(client, line, idx) {
  client.publish(topic, line);
  if (idx < lines.length) {
    console.log("Publishing line ",idx);
    setTimeout(function(){publish_line(client, lines[idx + 1], idx + 1)}, 500);
  } else {
    console.log("*** Datafile processed exiting ",idx);
    process.exit();
  }
}

client.on('connect', function () {
  console.log('connected');
  client.subscribe(topic);
  setTimeout(function(){publish_line(client, lines[0], 0);}, 500);
  console.log('Message published');
});

