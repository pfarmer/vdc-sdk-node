var repl = require("repl");
require('dotenv').config()
const VDC = require('./SDK.js');

var vdc = new VDC(update=false);

// vdc.listVirtualMachines();
// vdc.listZones();
var r = repl.start("VDC> ");
r.context.vdc = vdc;
