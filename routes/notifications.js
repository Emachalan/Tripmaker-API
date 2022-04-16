var express = require('express');
var router = express.Router();
const db = require("../db/connection");
const axios = require('axios')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  db.selectUserNotifications(req?.body?.user_id, function(error, response) {
    if(error){
      res.send({message: error, data: null})
    } else if(response === undefined) {
      db.createUserNoticationsRow(req?.body, function (err, datas) {
        if (err) {
          res.send({
            message: "Notification token stored failed",
            data: datas
          });
        } else {
          res.send({
            message: "Notification token stored Successfully",
            data: datas
          });
        }
      });
    } else {
      db.updateUserNoticationsRow(req?.body, function (err, datas) {
        if (err) {
          res.send({
            message: "Notification token updated failed",
            data: datas
          });
        } else {
          res.send({
            message: "Notification token updated Successfully",
            data: datas
          });
        }
      });
    }
  })
});

router.post('/send-notifications', function(req, res, next) {
  db.selectUserNotifications(req?.body?.user_id, function(error, response) {
    if(error){
      res.send({message: error, data: null})
    } else if(response === undefined) {
      res.send({message: 'No User Found', data: null})
    } else {
      let headers = {
        "Content-Type": "application/json",
        "Authorization": "key=AAAAx8CwOgk:APA91bFV9bBUJvUx-jUEWEFVOsUgWUc9Ydn-kJjHwGPjFzsMFYphi6kAZSw2vO9QBBE6mG73Ndvn_iORmyfrZguTE7AC1nXVW-BtTFbLWlg4rLo5MQo7qUm-pvZ0v2AorIyu-cc-KaTa"
      }
      let data = {
        "to": response?.token,
        "notification": {
          "title": "Check this Mobile (title)",
          "body": "Rich Notification testing (body)",
          "mutable_content": true,
          "sound": "Tri-tone"
          },
    }
      axios.post('https://fcm.googleapis.com/fcm/send', data, {headers: headers})
      .then(res => console.log('res....', res))
      .catch(err => console.log('fcm error....', err));
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
