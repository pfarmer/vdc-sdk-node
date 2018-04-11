require('dotenv').config()
const VDC = require('./SDK.js');

var vdc = new VDC(update=false);

test('update data objects', done => {
  expect(vdc.virtualmachines.length).toBe(0);
  setTimeout(function () {
    vdc.updateAll();
    expect(vdc.virtualmachines.length).toBeGreaterThan(0);
    done();
  }, 3000)
})

test('zones object is not 0 length', () => {
  expect(vdc.zones.length).toBeGreaterThan(0);
})

test('templates object is not 0 length', () => {
  expect(vdc.templates.length).toBeGreaterThan(0);
})