'use strict';

var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');
var fs = require('fs');
var http = require('http');
var port = process.env.PORT || 8000;

var server = http.createServer(function(req, res) {
  
});
