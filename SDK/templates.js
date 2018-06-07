function builder(template, vdc) {
  return {
    json: template,
    delete: function () {
      return deleteTemplate(template, vdc);
    }
  }
}

function deleteTemplate(template, vdc) {
  // TODO: Complete function
  return true;
}

module.exports = {
  listTemplates: function (callback) {
    this.templates.ready = false;
    this.client.exec('listTemplates', {'templatefilter': 'all'}, (error, result) => {
      if (error) {
        this.lastError = error;
        typeof callback === 'function' && callback(error, this);
      }
      result.template.forEach((template) => {
        this.templates.list.push(builder(template, this))
      })
      this.templates.ready = true;
      typeof callback === 'function' && callback(null, this);
    })
  }
}
