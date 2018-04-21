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
  listVolumes: function(callback) {
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
  }
}
