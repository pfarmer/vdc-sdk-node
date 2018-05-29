require('dotenv').config()
const VDC = require('./SDK.js');
const uuid = require('uuid/v4');


var vdc = new VDC(update = false);

let vm_name = "SDK-TEST-VM-" + uuid();
let disk_name = "SDK-TEST-DISK-" + uuid();

jest.setTimeout(600000);

// TODO: it for failures
// TODO: reorder tests, so that Virtual Machine tests come last.

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
});

describe('Virtual Machine Deployments', () => {
  test('Deploy Virtual Machine', done => {
    let deployment_data = {
      'zoneid': process.env.ZONE_ID,
      'serviceofferingid': process.env.SERVICEOFFERING_ID,
      'templateid': process.env.TEMPLATE_ID,
      'name': vm_name
    };
    vdc.deployVM(deployment_data, (error, result) => {
      expect(error).toBeNull();
      expect(result.jobstatus).toBe(1);
      expect(result.jobresultcode).toBe(0);
      done();
    })
  })

  test('Deploy Virtual Machine (error, no zone)', done => {
    let deployment_data = {
      'serviceofferingid': process.env.SERVICEOFFERING_ID,
      'templateid': process.env.TEMPLATE_ID,
      'name': vm_name      
    };
    vdc.deployVM(deployment_data, (error, result) => {
      expect(error).toBeDefined();
      done();
    })
  })

  test('Deploy Virtual Machine (error, no service offering)', done => {
    let deployment_data = {
      'zoneid': process.env.ZONE_ID,
      'templateid': process.env.TEMPLATE_ID,
      'name': vm_name      
    };
    vdc.deployVM(deployment_data, (error, result) => {
      expect(error).toBeDefined();
      done();
    })
  })

  test('Deploy Virtual Machine (error, no template', done => {
    let deployment_data = {
      'zoneid': process.env.ZONE_ID,
      'serviceofferingid': process.env.SERVICEOFFERING_ID,
      'name': vm_name
    };
    vdc.deployVM(deployment_data, (error, result) => {
      expect(error).toBeDefined();
      done();
    })
  })

  test('Find and start the Virtual Machine (error vm already running', done => {
    vdc.listVirtualMachines((error, vdc) => {
      let the_vm = vdc.virtualmachines.search(vm_name);
      expect(the_vm).toBeDefined();
      the_vm.start((error, result) => {
        expect(error).toBeDefined();
        done();
      })
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
  test('listServiceOfferings', done => {
    expect(vdc.serviceofferings.list.length).toBe(0);
    vdc.listServiceOfferings((error, vdc) => {
      expect(error).toBeNull();
      expect(vdc.serviceofferings.list.length).toBeGreaterThan(0);
      done();
    })
  })
})