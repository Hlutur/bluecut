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
                var splitted = data.split(/\r\n|\r|\n/g);
		line = line + splitted[0];
                if (splitted.length > 1){ // lineshift
			console.log('Full line: ' + line);
			line = splitted[1];
                }
	} 
  });
}, function () {
  console.log('cannot connect');
});
