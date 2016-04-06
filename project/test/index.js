"use strict";

var path = require('path'),
    helper = require('./helper'),
    settings = require('./settings.json'),
    config = settings.localSettings.configurations[settings.platform][settings.configuration];

describe("the default tarifa app", function () {
    var driver;
    this.timeout(300000);

    before(function () {
        driver = helper.wd.promiseChainRemote(settings.appium);
        helper.initLog(driver);
        return driver.init(settings.caps).setImplicitWaitTimeout(3000);
    });

    after(function () { return driver.quit(); });

    it("should check the title of the page", function () {
        return driver.title().should.eventually.equals('hello tarifa');
    });

    it("should check the displayed product_name", function () {
        var p = config.product_name;
        return driver.elementByCss('#name').text().should.eventually.equals(p);
    });

    it("should check the displayed id", function () {
        var id = config.id;
        return driver.elementByCss('#id').text().should.eventually.equals(id);
    });

});
