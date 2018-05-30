require('dotenv').config()
const VDC = require('../SDK.js');
const uuid = require('uuid/v4');

let vm_name = "SDK-TEST-VM-" + uuid();
let disk_name = "SDK-TEST-DISK-" + uuid();

var vdc = new VDC(update = false);

jest.setTimeout(20000);

describe('Virtual Machines functions', () => {
  test('listVirtualMachines', done => {
    expect(vdc.virtualmachines.list.length).toBe(0);
    vdc.listVirtualMachines((error, vdc) => {
      expect(error).toBeNull();
      expect(vdc.virtualmachines.list.length).toBeGreaterThan(0);
      done();
    })
  });
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

  // test('Create a volume, so it can be attached to the VM', done => {
  //   let disk_data = {
  //     'zoneid': process.env.ZONE_ID,
  //     'diskofferingid': process.env.DISKOFFERING_ID,
  //     'size': '10',
  //     'name': disk_name
  //   };
  //   vdc.createVolume(disk_data, (error, result) => {
  //     expect(error).toBeNull();
  //     expect(result.jobstatus).toBe(1);
  //     expect(result.jobresultcode).toBe(0);
  //   });
  //   done();
  // })

  // let the_disk = null;
  // test('Get the volume object to attach to the VM', done => {
  //   vdc.listVolumes((error, vdc) => {
  //     expect(error).toBeNull();
  //     expect(vdc.volumes.list.length).toBeGreaterThan(0);
  //     the_disk = vdc.volumes.search(disk_name);
  //     expect(the_disk).toBeDefined();
  //   });
  //   done();
  // })

  // test('attach the volume to the VM', done => {
  //   let the_vm = vdc.virtualmachines.search(vm_name);
  //   the_vm.attachVolume(the_vm, the_disk, vdc, (error, vdc) => {
  //     done();
  //   })
  // })

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