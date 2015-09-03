var mqtt = require('mqtt');
var fs = require('fs');


var lines = fs.readFileSync('data/rally_data2.txt').toString().split("\n");
if(lines.length == 0) {
  console.log('empty datafile');
  process.exit();
}

var lnNum = 0;

var options = {port: 1883, host: 'localhost'}
var client = mqtt.connect(options);

client.on('message', function (topic, message) {
  console.log(">",topic.toString(),message.toString());
});

function publish_line(client, line, idx) {

  var data = [];
  if(line) data=line.split("|");

  if(data.length > 1) {
    client.publish(data[0], data[1]);
  }
  if (idx < lines.length) {
    console.log("Publishing line ",idx);
    setTimeout(function(){publish_line(client, lines[idx + 1], idx + 1)}, 500);
  } else {
    console.log("*** Datafile processed exiting ",idx);
    setTimeout(function(){publish_line(client, lines[0], 0);}, 500);
//    process.exit();
  }
}

client.on('connect', function () {
  var topic="fullstackfest/car/#";

  console.log('connected');
  client.subscribe(topic);

  setTimeout(function(){publish_line(client, lines[0], 0);}, 500);
  console.log('Message published');
});

