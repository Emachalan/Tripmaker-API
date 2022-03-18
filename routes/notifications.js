var express = require('express');
var router = express.Router();
const db = require("../db/connection");

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  db.selectUser(req?.body?.id, function(error, response) {
    if(error){
      res.send({message: error, data: null})
    } else if(response === undefined) {
      db.createUserRow(req?.body, function (err, datas) {
        if (err) {
          res.send({
            message: "Success",
            data: datas
          });
        } else {
          res.send({
            message: "Success",
            data: datas
          });
        }
      });
    } else {
      res.send({
        message: "Success",
        data: response
      });
    }
  })
});

router.get('/user/:id', function(req, res, next) {
  console.log('respond with a resource', req.params.id);
  db.selectUser(req?.params?.id, function(error, response) {
    if(error){
      res.send({message: error, data: null})
    } else if(response === undefined) {
      res.send({
        message: "No data found",
        data: null
      });
    } else {
      res.send({
        message: "Success",
        data: response
      });
    }
  });
});


module.exports = router;
