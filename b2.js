
  var serial = new (require('bluetooth-serial-port')).BluetoothSerialPort();

  serial.listPairedDevices(function(pairedDevices) {
    pairedDevices.forEach(function(device) {
      console.log(device);
    });
  });
