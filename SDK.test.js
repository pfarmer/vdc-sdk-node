require('dotenv').config()
const VDC = require('./SDK.js');
const uuid = require('uuid/v4');


var vdc = new VDC(update = false);

let vm_name = "SDK-TEST-VM-" + uuid();
let disk_name = "SDK-TEST-DISK-" + uuid();

jest.setTimeout(20000);

// TODO: it for failures
// TODO: reorder tests, so that Virtual Machine tests come last.

describe('Zone functions', () => {
  test('listZones', done => {
    // expect(vdc.zones.list.length).toBe(0);
    vdc.listZones((error, vdc) => {
      // expect(error).toBeNull();
      expect(vdc.zones.list.length).toBeGreaterThan(0);
      done();
    })
  })
})
