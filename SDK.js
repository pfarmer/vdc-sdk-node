/*

Author: Peter Farmer

*/

function VDC(url, key, secret, update = true) {
  this.client = new (require('cloudstack'))({
    apiUri: url || process.env.CLOUDSTACK_API_URI,
    apiKey: key || process.env.CLOUDSTACK_API_KEY,
    apiSecret: secret || process.env.CLOUDSTACK_API_SECRET,
  });
  this.virtualmachines = [];
  this.zones = [];
  this.lastError = "";

  if (update) {
    this.updateAll();
  }
  return this;
}

VDC.prototype.updateVMs = function () {
  var virtualmachines = [];
  this.client.exec('listVirtualMachines', {}, (error, result) => {  // eslint-disable-line
    if (error) {
      this.lastError = error;
    }
    this.virtualmachines = result.virtualmachine;
  });

}

VDC.prototype.updateZones = function () {
  var zones = [];
  this.client.exec('listZones', {}, (error, result) => {
    if (error) {
      this.lastError = error;
    }
    this.zones = result.zone;
  });
}

function _vm(vm) {
  return {
    json: vm,
    start: function () {
      return startVM(vm);
    },
    stop: function () {
      return stopVM(vm);
    },
    delete: function () {
      return deleteVM(vm);
    }
  }
};

VDC.prototype.listServiceOfferings = function () {
  this.client.exec('listServiceOfferings', {}, (error, result) => {
    if (error) {
      this.lastError = error;
    }
    this.serviceofferings = result.serviceoffering;
  })
}

VDC.prototype.listTemplates = function () {
  this.client.exec('listTemplates', {'templatefilter': 'all'}, (error, result) => {
    if (error) {
      this.lastError = error;
    }
    this.templates = result.template;
  })
}

VDC.prototype.listNetworks = function () {
  this.client.exec('listNetworks', {}, (error, result) => {
    if (error) {
      this.lastError = error;
    }
    this.networks = result.network;
  })
}

VDC.prototype.updateAll = function () {
  this.updateZones();
  this.updateVMs();
  this.listServiceOfferings();
  this.listTemplates();
  this.listNetworks();
}

VDC.prototype.deployVM = function(details) {
  console.log("Running deploy VM");
  if (!details.serviceoffering) {
    this.lastError = "No service offerings";
    return false;
  }

  if (!details.zone) {
    this.lastError = "No zone";
    return false;
  }

  if (!details.template) {
    this.lastError = "No template";
    return false;
  }

  return true;
}


function startVM(vm) {
  console.log("Running startVM on " + vm.id);
  if (vm.state === 'Running') {
    console.log("VM is already running, doing nothing!");
    return false;
  } else {
    console.log("VM is stopped, going to start");
    return true;
  }
}

function stopVM(vm) {
  console.log("Running stopVM on " + vm.id);
  if (vm.state === 'Stopped') {
    console.log("VM is already stopped, doing nothing!");
    return false;
  } else {
    console.log("VM is Running, going to stop");
    return true;
  }
}

function deleteVM(vm) {
  console.log("Running deleteVM on " + vm.id);
  if (vm.state !== 'Stopped') {
    console.log("VM is not stopped, please stop first")
  } else {
    console.log("VM is stopped, going to delete");
  }
}

module.exports = VDC;

// vdc.virtualmachines.find(vm => vm.json.name === 'zch-jmp1')