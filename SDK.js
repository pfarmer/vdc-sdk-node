// const cloudstack = require('cloudstack');

module.exports = function VDC () {
    this.client = new (require('cloudstack'))();
    this.virtualmachines = [];

    var _vm = function(vm) {
        return {
            json: vm,
            start: function() {
                startVM(vm);
            },
            stop: function() {
                stopVM(vm);
            }
        }
    }

    this.updateVMs = function() {
        var virtualmachines = [];
        this.client.exec('listVirtualMachines', {}, (error, result) => {
            vms = result.virtualmachine;
            if (vms) {
                vms.forEach(function(vm) {
                    virtualmachines.push(_vm(vm));
                })
            }
            // this.virtualmachines = result.virtualmachine;
        });
        this.virtualmachines = virtualmachines;
    }

    var startVM = function(vm) {
        console.log("Running startVM on " + vm.id);
        if (vm.state === 'Runnning') {
            console.log("VM is already running, doing nothing!")
        } else {
            console.log("VM is stopped, going to start");
        }
    }
    var stopVM = function(vm) {
        console.log("Running stopVM on " + vm.id);
        if (vm.state === 'Stopped') {
            console.log("VM is already stopped, doing nothing!")
        } else {
            console.log("VM is Running, going to stop");
        }
    }

    // Real code below here:

    this.updateVMs();


}


// my_vdc.virtualmachines.find(vm => vm.json.name === 'zch-jmp1')