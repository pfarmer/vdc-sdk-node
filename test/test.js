var expect = require('chai').expect;
require('dotenv').config()
var VDC = require('../SDK.js');

describe('vdc = new VDC()', function () {
  it('should create a new vdc instance object and get all the VMs in the account, which should be more than 1', function (done) {
    var vdc = new VDC();
    setTimeout(function () {
      expect(vdc.virtualmachines.length).to.be.above(1);
      done();
    }, 1500);
  });

  it('should create a new vdc instance object and get all the VMs in the account, which should be more than 2', function (done) {
    var vdc = new VDC();
    setTimeout(function () {
      expect(vdc.virtualmachines.length).to.be.above(2);
      done();
    }, 1500);
  });
});