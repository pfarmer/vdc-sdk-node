function builder(vol, vdc) {
  return {
    json: vol,
    attach: function () {
      return attachVol(vol, vdc);
    },
    detach: function () {
      return detachVol(vol, vdc);
    },
    delete: function () {
      return deleteVol(vol, vdc);
    }
  }
}

function attachVol(vol, vdc) {
  console.log("Running attachVol on " + vol.id);
}

function detachVol(vm, vdc) {
  console.log("Running detachVol on " + vol.id);
}

function deleteVol(vol, vdc) {
  console.log("Running deleteVol on " + vol.id);
}

module.exports = {
  searchVols: function(vdc, search) {
    return vdc.list.find(vol => vol.json.name === search)
  },

  listVolumes: function(callback) {
    // TODO: Cleanly handle pages
    this.volumes.ready = false;
    this.client.exec('listVolumes', {}, (error, result) => {
      if (error) {
        this.lastError = error;
        typeof callback === 'function' && callback(error, this);
      }
      result.volume.forEach((vol) => {
        this.volumes.list.push(builder(vol, this))
      })
      this.volumes.ready = true;
      typeof callback === 'function' && callback(null, this);
    })
  },

  createVolume: function(details, callback) {
    // Requires: name, diskofferingid, size and zoneid
    if (!details.name) {
      this.lastError = "No disk name provided";
      typeof callback === 'function' && callback("No disk name provided", this);
      return false;
    }
    if (!details.diskofferingid) {
      this.lastError = "No disk offering provided";
      typeof callback === 'function' && callback("No disk offering provided", this);
      return false;      
    }
    if (!details.size) {
      this.lastError = "No disk size provided";
      typeof callback === 'function' && callback("No disk size provided", this);
      return false;        
    }
    if (!details.zoneid) {
      this.lastError = "No zone id provided";
      typeof callback === 'function' && callback("No zone id provided", this);
      return false; 
    }

    this.client.exec('createVolume', details, (error, result) => {
      if (error) {
        typeof callback === 'function' && callback(error, this);
      } else {
        // Check the job response every 5 seconds
        let timer = setInterval(() => {
          this.client.exec('queryAsyncJobResult', {'jobid': result.jobid}, (error, result) => {
            if (result.jobstatus === 1) {
              if (result.jobresultcode === 0) {
                // Job completed sucessfully
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
  },

  listDiskOfferings: function (callback) {
    this.diskofferings.ready = false;
    this.client.exec('listDiskOfferings', {}, (error, result) => {
      if (error) {
        this.lastError = error;
        typeof callback === 'function' && callback(error, this);
      }
      this.diskofferings.list = result.diskoffering;
      this.diskofferings.ready = true;
      typeof callback === 'function' && callback(null, this);
    })
  },
}
