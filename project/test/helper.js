"use strict";

var wd = require("wd"),
    chai = require("chai"),
    chaiAsPromised = require("chai-as-promised"),
    should = chai.Should();

chai.use(chaiAsPromised);
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

module.exports.wd = wd;

module.exports.initLog = function (driver) {
    driver.on('status', function (info) {
        console.log(info);
    });
    driver.on('command', function (meth, path, data) {
        console.log(' > ' + meth, path, data || '');
    });
    driver.on('http', function (meth, path, data) {
        console.log(' > ' + meth, path, data || '');
    });
};
