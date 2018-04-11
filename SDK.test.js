require('dotenv').config()
const VDC = require('./SDK.js');

test('vdc = new VDC()', done => {
    var vdc = new VDC();
    setTimeout(function () {
      expect(vdc.virtualmachines.length).toBeGreaterThan(1);
      done();
    }, 1500);
})