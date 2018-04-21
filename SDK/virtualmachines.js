function builder(vm, vdc) {
  return {
    json: vm,
    start: function () {
      return startVM(vm, vdc);
    },
    stop: function () {
      return stopVM(vm, vdc);
    },
    delete: function () {
      return deleteVM(vm, vdc);
    }
  }
}

function startVM(vm, vdc) {
  console.log("Running startVM on " + vm.id);
  if (vm.state === 'Running') {
    console.log("VM is already running, doing nothing!");
    return false;
  } else {
    console.log("VM is stopped, going to start");
    return true;
  }
}

function stopVM(vm, vdc, callback) {
  console.log("Running stopVM on " + vm.id);
  console.log("stopVM (this) = " + this);
  console.log(this.client);
  if (vm.state === 'Stopped') {
    console.log("VM is already stopped, doing nothing!");
    return false;
  } else {
    console.log("VM is Running, going to stop");
    vdc.client.exec('stopVirtualMachine', {'id': vm.id}, (error, result) => {
      if (error) {
        typeof callback === 'function' && callback(error, vdc);
      } else {
        // Check the job response every 5 seconds
        let timer = setInterval(() => {
          vdc.client.exec('queryAsyncJobResult', {'jobid': result.jobid}, (error, result) => {
            console.log(result);
            if (result.jobstatus === 1) {
              if (result.jobresultcode === 0) {
                // Looks like the job completed deployed!
                clearInterval(timer);
                typeof callback === 'function' && callback(null, result);
              } else {
                clearInterval(timer);
                typeof callback === 'function' && callback(result, null);
              }
            } 
          })
        }, 5000)
      }
    })
    return true;
  }
}

function deleteVM(vm, vdc) {
  console.log("Running deleteVM on " + vm.id);
  if (vm.state !== 'Stopped') {
    console.log("VM is not stopped, please stop first")
    return false;
  } else {
    console.log("VM is stopped, going to delete");
    return true;
  }
}

module.exports = {
  searchVMs: function(vdc, search) {
    return vdc.list.find(vm => vm.json.name === search)
  },

  listVirtualMachines: function(callback) {
    this.virtualmachines.ready = false;
    this.client.exec('listVirtualMachines', {}, (error, result) => {
      if (error) {
        this.lastError = error;
        typeof callback === 'function' && callback(error, this);
      }
      result.virtualmachine.forEach((vm) => {
        this.virtualmachines.list.push(builder(vm, this))
      })
      this.virtualmachines.ready = true;
      typeof callback === 'function' && callback(null, this);
    });
  },

  deployVM: function(details, callback) {
    if (!details.serviceofferingid) {
      this.lastError = "No service offerings";
      typeof callback === 'function' && callback("No service offering", this);
      return false;
    }
  
    if (!details.zoneid) {
      this.lastError = "No zone";
      typeof callback === 'function' && callback("No zone", this);
      return false;
    }
  
    if (!details.templateid) {
      this.lastError = "No template";
      typeof callback === 'function' && callback("No template", this);
      return false;
    }
    this.client.exec('deployVirtualMachine', details, (error, result) => {
      if (error) {
        typeof callback === 'function' && callback(error, this);
      } else {
        // Check the job response every 5 seconds
        let timer = setInterval(() => {
          this.client.exec('queryAsyncJobResult', {'jobid': result.jobid}, (error, result) => {
            if (result.jobstatus === 1) {
              if (result.jobresultcode === 0) {
                // Looks like the VM deployed successfully!
                clearInterval(timer);
                callback(null, result);
              } else {
                clearInterval(timer);
                callback(result, null);
              }
            } 
          })
        }, 5000)
      }
    })
  }
}