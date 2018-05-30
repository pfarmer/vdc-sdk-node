require('dotenv').config()
const VDC = require('../SDK.js');
const uuid = require('uuid/v4');

let vm_name = "SDK-TEST-VM-" + uuid();

var vdc = new VDC(update = false);

jest.setTimeout(20000);

describe('Service Offerings functions', () => {
  test('listServiceOfferings', done => {
    expect(vdc.serviceofferings.list.length).toBe(0);
    vdc.listServiceOfferings((error, vdc) => {
      expect(error).toBeNull();
      expect(vdc.serviceofferings.list.length).toBeGreaterThan(0);
      done();
    })
  })
})