/*

Author: Peter Farmer

*/

function VDC(url, key, secret, update) {
  this.client = new (require('cloudstack'))({
    apiUri: url || process.env.CLOUDSTACK_API_URI,
    apiKey: key || process.env.CLOUDSTACK_API_KEY,
    apiSecret: secret || process.env.CLOUDSTACK_API_SECRET,
  });
  this.virtualmachines = { 
    'ready': false,
    'list': [],
    'search': function (search) {
      return searchVMs(this, search);
    },
  };
  this.zones = {
    'ready': false,
    'list': []
  };
  this.templates = {
    'ready': false,
    'list': []
  }
  this.serviceofferings = {
    'ready': false,
    'list': []
  }
  this.volumes = {
    'ready': false,
    'list': []
  }
  this.lastError = "";

  return this;
}

/* listVirtualMachines */
VDC.prototype.listVirtualMachines = function (callback) {
  var virtualmachines = [];
  this.virtualmachines.ready = false;
  this.client.exec('listVirtualMachines', {}, (error, result) => {
    if (error) {
      this.lastError = error;
      typeof callback === 'function' && callback(error, this);
    }
    result.virtualmachine.forEach((vm) => {
      this.virtualmachines.list.push(_vm(vm))
    })
    this.virtualmachines.ready = true;
    typeof callback === 'function' && callback(null, this);
  });
}

VDC.prototype.listZones = function (callback) {
  this.zones.ready = false;
  this.client.exec('listZones', {}, (error, result) => {
    if (error) {
      console.log(error)
      this.lastError = error;
      typeof callback === 'function' && callback(error, this);
    }
    this.zones.list = result.zone;
    this.zones.ready = true;
    typeof callback === 'function' && callback(null, this);
  });
}



VDC.prototype.listServiceOfferings = function () {
  this.serviceofferings.ready = false;
  this.client.exec('listServiceOfferings', {}, (error, result) => {
    if (error) {
      this.lastError = error;
      typeof callback === 'function' && callback(error, this);
    }
    this.serviceofferings.list = result.serviceoffering;
    this.serviceofferings.ready = true;
    typeof callback === 'function' && callback(null, this);
  })
}

VDC.prototype.listTemplates = function (callback) {
  this.templates.ready = false;
  this.client.exec('listTemplates', {'templatefilter': 'all'}, (error, result) => {
    if (error) {
      this.lastError = error;
      typeof callback === 'function' && callback(error, this);
    }
    this.templates.list = result.template;
    this.templates.ready = true;
    typeof callback === 'function' && callback(null, this);
  })
}

VDC.prototype.listNetworks = function (callback) {
  this.client.exec('listNetworks', {}, (error, result) => {
    if (error) {
      this.lastError = error;
      typeof callback === 'function' && callback(error, this);
    }
    this.networks = result.network;
    typeof callback === 'function' && callback();
  })
}

VDC.prototype.listVolumes = function (callback) {
  // TODO: Finish this
  typeof callback === 'function' && callback();
}

VDC.prototype.updateAll = function (callback) {
  this.listZones();
  this.listVirtualMachines();
  this.listServiceOfferings();
  this.listTemplates();
  this.listNetworks();
  typeof callback === 'function' && callback();
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

function searchVMs(vdc, search) {
  return vdc.list.find(vm => vm.json.name === search)
}

module.exports = VDC;

// vdc.virtualmachines.find(vm => vm.json.name === 'zch-jmp1')