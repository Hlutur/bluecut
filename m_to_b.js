var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();

var mqtt = require('mqtt');
var options = {port: 1883, host: 'localhost'}
var client = mqtt.connect(options);

var car_data = [{name: 'Turtle', address: '30-14-06-09-10-16', channel: 1},
  {name: 'Rabbit', address: '30-14-06-17-05-32', channel: 1}];

var car_id = 0;

var address = car_data[car_id].address;
var channel = car_data[car_id].channel;

var topic = 'fullstackfest/car/' + car_data[car_id].name + '/cmd';

console.log('Starting');

client.on('connect', function () {
  console.log('connected');
  client.subscribe(topic);
  console.log("subscribing to ", topic);
  start_proxy();
});


function start_proxy() {
  btSerial.connect(address, channel, function () {
    console.log('connected to ', address);

    client.on('message', function (topic, message) {
      console.log("About to send to client ", topic, message);
      btSerial.write(new Buffer(message, 'utf-8'), function (err, bytesWritten) {
        if (err) console.log(err);
      });
      console.log(handler.make_package(topic, message));
    });

    var line = "";
    btSerial.on('data', function (buffer) {
      var data = buffer.toString('utf-8');
      //       console.log(data.length,data);
    });
  }, function () {
    console.log('cannot connect');
  });
}
