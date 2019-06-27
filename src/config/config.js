var path = require("path");
var defaults = require("./defaults");
var messages = require("./messages");

var config = {};
config.path = path.resolve(__dirname);

module.exports = {config, defaults, messages};