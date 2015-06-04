
(function () {
  "use strict";

  // javascript shim that lets our object inherit from EventEmitter
  var DeviceINQ = require('bindings')('BluetoothSerialPort.node').DeviceINQ,
    events = require('events');

  // extend prototype
  function inherits(target, source) {
    var k;

    for (k in source.prototype) {
      target.prototype[k] = source.prototype[k];
    }
  }

  inherits(DeviceINQ, events.EventEmitter);
  exports.DeviceINQ = DeviceINQ;

}());