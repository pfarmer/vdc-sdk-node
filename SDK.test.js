require('dotenv').config()
const VDC = require('./SDK.js');
const uuid = require('uuid/v4');


var vdc = new VDC(update = false);

let vm_name = "SDK-TEST-VM-" + uuid();
let disk_name = "SDK-TEST-DISK-" + uuid();

jest.setTimeout(600000);

// TODO: it for failures

describe('Virtual Machines functions', () => {
  test('listVirtualMachines', done => {
    expect(vdc.virtualmachines.list.length).toBe(0);
    vdc.listVirtualMachines((error, vdc) => {
      expect(error).toBeNull();
      expect(vdc.virtualmachines.list.length).toBeGreaterThan(0);
      done();
    })
  });

  test('VM Search', () => {
    expect(vdc.virtualmachines.search("zch-jmp1")).toBeDefined;
  });

  test('Deploy Virtual Machine', done => {
    let deployment_data = {
      'zoneid': 'e564f8cf-efda-4119-b404-b6d00cf434b3',
      'serviceofferingid': 'b2298f9e-464c-49ac-879e-d539be9ed048',
      'templateid': '67ef3c09-9a42-46f7-9337-7cbf24811161',
      'name': vm_name
    };
    vdc.deployVM(deployment_data, (error, result) => {
      expect(result.jobstatus).toBe(1);
      expect(result.jobresultcode).toBe(0);
      done();
    })
  })

  test('Find and stop the Virtual Machine', done => {
    vdc.listVirtualMachines((error, vdc) => {
      let the_vm = vdc.virtualmachines.search(vm_name);
      expect(the_vm).toBeDefined();
      the_vm.stop((error, result) => {
        expect(result.jobstatus).toBe(1);
        expect(result.jobresultcode).toBe(0);
        done();
      })
    })
  });

  test('Find and start the Virtual Machine', done => {
    vdc.listVirtualMachines((error, vdc) => {
      let the_vm = vdc.virtualmachines.search(vm_name);
      expect(the_vm).toBeDefined();
      the_vm.start((error, result) => {
        expect(result.jobstatus).toBe(1);
        expect(result.jobresultcode).toBe(0);
        done();
      })
    })
  });

  test('Find and stop the Virtual Machine (again)', done => {
    vdc.listVirtualMachines((error, vdc) => {
      let the_vm = vdc.virtualmachines.search(vm_name);
      expect(the_vm).toBeDefined();
      the_vm.stop((error, result) => {
        expect(result.jobstatus).toBe(1);
        expect(result.jobresultcode).toBe(0);
        done();
      })
    })
  });

  test('Delete a virtualmachine', done => {
    vdc.listVirtualMachines((error, vdc) => {
      let the_vm = vdc.virtualmachines.search(vm_name);
      expect(the_vm).toBeDefined();
      the_vm.delete((error, result) => {
        expect(result.jobstatus).toBe(1);
        expect(result.jobresultcode).toBe(0);
        done();
      })
    })
  })

})


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
      'zoneid': 'e564f8cf-efda-4119-b404-b6d00cf434b3',
      'diskofferingid': '71537cd8-3641-43e5-86d2-c7755b5cd924',
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
})


describe('Network Functions', () => {
  test('listNetworks', done => {
    vdc.listNetworks((error, vdc) => {
      expect(error).toBeNull();
      expect(vdc.networks.list.length).toBeGreaterThan(0);
      done();
    })
  })

})


describe('Service Offerings functions', () => {
  it('listServiceOfferings', done => {
    expect(vdc.serviceofferings.list.length).toBe(0);
    vdc.listServiceOfferings((error, vdc) => {
      expect(error).toBeNull();
      expect(vdc.networks.list.length).toBeGreaterThan(0);
      done();
    })
  })
})