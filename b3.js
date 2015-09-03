var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();


var rabbit = '30-14-06-17-05-32',
    turtle='30-14-06-09-10-16',
  channel=1;

var address = turtle;

btSerial.connect(address, channel, function () {
  console.log('connected to ',address);

  btSerial.write(new Buffer('ll', 'utf-8'), function (err, bytesWritten) {if (err) console.log(err);});
  var line="";
  btSerial.on('data', function (buffer) {
	var data = buffer.toString('utf-8');
        console.log(data.length,data);
	if(data.length==0) {
		console.log(line);
		line = "";
	}
	else {
		line = line + data;
	} 
  });
}, function () {
  console.log('cannot connect');
});
