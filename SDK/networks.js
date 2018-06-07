function builder(network, vdc) {
  return {
    json: network,
    delete: function () {
      return deleteNetwork(network, vdc);
    }
  }
}

function deleteNetwork(network, vdc) {
  // TODO: Complete function
  return true;
}

module.exports = {
  listNetworks: function (callback) {
    this.networks.ready = false;
    this.client.exec('listNetworks', {}, (error, result) => {
      if (error) {
        this.lastError = error;
        typeof callback === 'function' && callback(error, this);
      } else {
        result.network.forEach((network) => {
          this.networks.list.push(builder(network, this))
        })
        this.networks.ready = true;
        typeof callback === 'function' && callback(null, this);
      }
    })
  }
}
