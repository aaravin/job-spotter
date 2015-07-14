var express = require('express');
var router = express.Router();
var Promise = require('bluebird');

router.get('/api/data/',function(req,res,next){
  var combined = [];

  mainController
    .startDataExtraction(combined)
      .then(function(combined) {
        
    }).then(function(combined) {

    }).then(function(combined) {

    }).then(function(combined) {

    }).then(function(combined) {
      mainController.sendBackData(combined, res, next);
    });
});