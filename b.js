var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
var readlineSync = require('readline-sync');


var car1 = '30-14-06-09-10-16';

function getCommand() {
  return readlineSync.question('Command :');
}

function listen(btSerial) {
  var finished = false;

  while (!finished) {

    cmd = getCommand();
    if (cmd === 'q') {
      finished = true;
    } else {
      btSerial.write(new Buffer('r', 'utf-8'), function (err, bytesWritten) {
        if (err) console.log(err);
      });
    }
  }
  btSerial.close();
}


btSerial.on('found', function (address, name) {
  console.log('Checking for channels ', address, name);
  btSerial.findSerialPortChannel(address, function (channel) {
    console.log('found  ' + address);
    if (address === car1) {
      console.log('trying to connect to ' + name);

      btSerial.connect(address, channel, function () {
        console.log('Connected to ' + address);

        btSerial.on('data', function (buffer) {
          console.log(buffer.toString('utf-8'));
        });

        listen(btSerial);
      }, function () {
        console.log('cannot connect');
      });

      // close the connection when you're ready
      btSerial.close();
    }
  }, function () {
    console.log('found nothing');
  });
});

btSerial.inquire();

