/*

Author: Peter Farmer

*/


// TODO: Refactor to https://dzone.com/articles/how-to-create-instantiate-a-class-in-nodejs

module.exports = function VDC(url, key, secret) {
  this.client = new (require('cloudstack'))({
    apiUri: url || process.env.CLOUDSTACK_API_URI,
    apiKey: key || process.env.CLOUDSTACK_API_KEY,
    apiSecret: secret || process.env.CLOUDSTACK_API_SECRET,
  });
  this.virtualmachines = [];

  var _vm = function (vm) {
    return {
      json: vm,
      start: function () {
        startVM(vm);
      },
      stop: function () {
        stopVM(vm);
      },
      delete: function () {
        deleteVM(vm);
      }
    }
  };

  this.updateVMs = function () {
    var virtualmachines = [];
    this.client.exec('listVirtualMachines', {}, (error, result) => {  // eslint-disable-line
      vms = result.virtualmachine;
      if (vms) {
        vms.forEach(function (vm) {
          virtualmachines.push(_vm(vm));
        })
      }
    });
    this.virtualmachines = virtualmachines;
  }

  this.updateZones = function () {
    var zones = [];
    this.client.exec('listZones', {}, (error, result) => {
      zones = result.zone;
      if (zones) {
        zones.forEach(function (zone) {
          zones.push(zone);
        })
      }
    })
    this.zones = zones;
  }

  var startVM = function (vm) {
    console.log("Running startVM on " + vm.id);
    if (vm.state === 'Runnning') {
      console.log("VM is already running, doing nothing!")
    } else {
      console.log("VM is stopped, going to start");
    }
  }

  var stopVM = function (vm) {
    console.log("Running stopVM on " + vm.id);
    if (vm.state === 'Stopped') {
      console.log("VM is already stopped, doing nothing!")
    } else {
      console.log("VM is Running, going to stop");
    }
  }

  var deleteVM = function (vm) {
    console.log("Running deleteVM on " + vm.id);
    if (vm.state !== 'Stopped') {
      console.log("VM is not stopped, please stop first")
    } else {
      console.log("VM is stopped, going to delete");
    }
  }

  // Real code below here:

  this.updateVMs();
  this.updateZones();

  return this;
}


// vdc.virtualmachines.find(vm => vm.json.name === 'zch-jmp1')