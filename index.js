var VDC = require('./SDK.js');

var vdc = new VDC(update=false);

console.log(vdc);

await vdc.updateVMs();