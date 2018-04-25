/*

Author: Peter Farmer

*/

const vmFuncs       = require('./SDK/virtualmachines')
const volFuncs      = require('./SDK/volumes')
const templateFuncs = require('./SDK/templates')
const networkFuncs  = require('./SDK/networks')
const soFuncs       = require('./SDK/serviceofferings')

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
      return vmFuncs.searchVMs(this, search);
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
    'list': [],
    'search': function (search, field) {
      return soFuncs.search(this, search, field);
    }
  }
  this.volumes = {
    'ready': false,
    'list': []
  }
  this.networks = {
    'ready': false,
    'list': []
  }
  this.lastError = "";

  return this;
}

/* listVirtualMachines */
VDC.prototype.listVirtualMachines = vmFuncs.listVirtualMachines;
VDC.prototype.listVolumes = volFuncs.listVolumes;

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

VDC.prototype.listServiceOfferings = function (callback) {
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

VDC.prototype.listTemplates = templateFuncs.listTemplates;
VDC.prototype.listNetworks = networkFuncs.listNetworks;
VDC.prototype.deployVM = vmFuncs.deployVM;

// TODO: listAffinityGroups
// TODO: listAsyncJobs
// TODO: listEvents
// TODO: firewallrules
// TODO: listisos
// TODO: listnics
// TODO: listsnapshots
// TODO: listsnapshotpolicies
// TODO: listsshkeypairs

VDC.prototype.updateAll = function (callback) {
  this.listZones();
  this.listVirtualMachines();
  this.listServiceOfferings();
  this.listTemplates();
  this.listNetworks();
  typeof callback === 'function' && callback();
}

module.exports = VDC;
