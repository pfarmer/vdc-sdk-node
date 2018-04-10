require('dotenv').config()
const VDC = require('../SDK.js');

test('vdc = new VDC()', done => {
  function callback(data) {
    expect(data.virtualmachines.length).toBeGreaterThan(1);
    done();
  }
})