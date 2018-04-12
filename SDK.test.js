require('dotenv').config()
const VDC = require('./SDK.js');

var vdc = new VDC(update=false);

test('listVirtualMachines', () => {
  expect(vdc.virtualmachines.list.length).toBe(0);
  vdc.listVirtualMachines((error, vdc) => {
    expect(error).toBeNull();
    expect(vdc.virtualmachines.list.length).toBeGreaterThan(0);
  })
})

test('listZones', () => {
  expect(vdc.zones.list.length).toBe(0);
  vdc.listZones((error, vdc) => {
    expect(error).toBeNull();
    expect(vdc.zones.list.length).toBeGreaterThan(0);
  })
})

test('listTemplates', () => {
  // expect(vdc.templates.list.length).toBe(0);
  vdc.listTemplates((error, vdc) => {
    expect(error).toBeNull();
    expect(vdc.templates.list.length).toBeGreaterThan(0);
  })
})

test('listVolumes', () => {
  expect(vdc.volumes.list.length).toBe(0);
  vdc.listVolumes((error, vdc) => {
    expect(error).toBeNull();
    expect(vdc.volumes.list.length).toBeGreaterThan(0);
  })
})

test('listNetworks', () => {
  expect(vdc.networks.list.length).toBe(0);
  vdc.listNetworks((error, vdc) => {
    expect(error).toBeNull();
    expect(vdc.networks.list.length).toBeGreaterThan(0);
  })
})

test('VM Search', () => {
  expect(vdc.virtualmachines.search("zch-jmp1")).toBeDefined;
})