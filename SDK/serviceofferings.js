module.exports = {
  listServiceOfferings: function (callback) {
    this.serviceofferings.ready = false;
    this.client.exec('listServiceOfferings', {}, (error, result) => {
      if (error) {
        this.lastError = error;
        typeof callback === 'function' && callback(error, this);
        return; 
      }
      this.serviceofferings.list = result.serviceoffering;
      this.serviceofferings.ready = true;
      typeof callback === 'function' && callback(null, this);
      return;
    })
  },

  search: function (vdc, search, field) {
    if (isNaN(field) || field === 'name') {
      console.log("Searching name field |" + search + "|" + field + "|")
      return vdc.list.find(serviceoffering => serviceoffering.name === search)
    } else {
      if (field === 'id') {
        console.log('Searching the id field')
        return vdc.list.find(serviceoffering => serviceoffering.id === search)
      }
    }
    return false;
  }
}