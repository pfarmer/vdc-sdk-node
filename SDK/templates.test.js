require('dotenv').config()
const VDC = require('../SDK.js');
const uuid = require('uuid/v4');

let vm_name = "SDK-TEST-VM-" + uuid();

var vdc = new VDC(update = false);

jest.setTimeout(20000);

describe('Template functions', () => {
  test('listTemplates', done => {
    expect(vdc.templates.list.length).toBe(0);
    vdc.listTemplates((error, vdc) => {
      expect(error).toBeNull();
      expect(vdc.templates.list.length).toBeGreaterThan(0);
      done();
    })
  })
})
