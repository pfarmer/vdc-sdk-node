require('dotenv').config()
const VDC = require('../SDK.js');
const uuid = require('uuid/v4');

let vm_name = "SDK-TEST-VM-" + uuid();

var vdc = new VDC(update = false);

jest.setTimeout(10000);

describe('Network Functions', () => {
  test('listNetworks', done => {
    vdc.listNetworks((error, vdc) => {
      expect(error).toBeNull();
      expect(vdc.networks.list.length).toBeGreaterThan(0);
      done();
    })
  })
})