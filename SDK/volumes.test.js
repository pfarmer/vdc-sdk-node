require('dotenv').config()
const VDC = require('../SDK.js');
const uuid = require('uuid/v4');

let disk_name = "SDK-TEST-DISK-" + uuid();

var vdc = new VDC(update = false);

jest.setTimeout(20000);

describe('Volume functions', () => {
  test('listVolumes', done => {
    expect(vdc.volumes.list.length).toBe(0);
    vdc.listVolumes((error, vdc) => {
      expect(error).toBeNull();
      expect(vdc.volumes.list.length).toBeGreaterThan(0);
      done();
    })
  })

  test('listDiskOfferings', done => {
    expect(vdc.diskofferings.list.length).toBe(0);
    vdc.listDiskOfferings((error, vdc) => {
      expect(error).toBeNull();
      expect(vdc.diskofferings.list.length).toBeGreaterThan(0);
      done();
    })
  })

  test('createVolume', done => {
    let disk_data = {
      'zoneid': process.env.ZONE_ID,
      'diskofferingid': process.env.DISKOFFERING_ID,
      'size': '10',
      'name': disk_name
    };
    vdc.createVolume(disk_data, (error, result) => {
      expect(error).toBeNull();
      expect(result.jobstatus).toBe(1);
      expect(result.jobresultcode).toBe(0);
      done();
    })
  })

  test('attachVolume', done => {
    done();
  })
})