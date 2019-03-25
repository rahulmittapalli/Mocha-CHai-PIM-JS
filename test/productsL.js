var expect = require('chai').expect;
var https = require("https");
var request = require('request');
var env = require('./environment');
var fun = require('./main');
var langCode = "en-US";
var subPath = "/open/products/lang/" + langCode;

describe("Open products", function() {
  this.timeout(60000);
  it("Face Mapping Consumer By langCode", function(done) {
    var key = "ef75a003-8dff-4698-8e3a-445ef976b2f1";
    var inputvalues = fun.input(key, subPath);
    fun.products_requester(inputvalues, done);
  })
  it("Face Mapping Trade By langCode", function(done) {
    var key = "9881d86c-65f1-447d-aa7f-31bcb9381f65";
    var inputvalues = fun.input(key, subPath);
    fun.products_requester(inputvalues, done);
  })
  it("BioLumin-C By langCode", function(done) {
    var key = "f960530a-ba6f-463c-8f00-46e2071490f7";
    var inputvalues = fun.input(key, subPath);
    fun.products_requester(inputvalues, done);
  })
  it("Rapid Reveal By langCode", function(done) {
    var key = "54d8f9eb-c0fc-4dee-a55b-3abde4e0c94e";
    var inputvalues = fun.input(key, subPath);
    fun.products_requester(inputvalues, done);
  })
  it("FaceMapping.com By langCode", function(done) {
    var key = "5d24a390-b66e-4780-8d02-907bef2f778f";
    var inputvalues = fun.input(key, subPath);
    fun.products_requester(inputvalues, done);
  })
  it("Breakout predictor By langCode", function(done) {
    var key = "fbab80c2-362f-468e-98ab-7baa46e96874";
    var inputvalues = fun.input(key, subPath);
    fun.products_requester(inputvalues, done);
  })
});