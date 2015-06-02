var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
var car1='30:14:06:09:10:16';
var mac='00:1F:5B:E1:F4:4D';


btSerial.on('found', function(address, name) {
    btSerial.findSerialPortChannel(address, function(channel) {
        console.log(address,channel,name);
        if(address===mac) {
          console.log('trying to connect to ' + name); 
          btSerial.connect(address, channel, function() {
            console.log('connected');

            btSerial.write(new Buffer('my data', 'utf-8'), function(err, bytesWritten) {
                if (err) console.log(err);
            });

            btSerial.on('data', function(buffer) {
                console.log(buffer.toString('utf-8'));
            });
        }, function () {
            console.log('cannot connect');
        });

        // close the connection when you're ready
        btSerial.close();
        }
    }, function() {
        console.log('found nothing');
    });
});

btSerial.inquire();

