var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();

var address = '30-14-06-09-10-16',
  channel=1;

btSerial.connect(address, channel, function () {
  console.log('connected to ',address);

  btSerial.write(new Buffer('ll', 'utf-8'), function (err, bytesWritten) {if (err) console.log(err);});

  btSerial.on('data', function (buffer) {console.log(buffer.toString('utf-8')); });
}, function () {
  console.log('cannot connect');
});
