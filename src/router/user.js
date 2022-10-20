const userCtrl = require('../controller/userCtrl')
const express = require('express');
const router= express.Router();


  router.post('/login',userCtrl.login);

  router.post('/register', userCtrl.register);

  router.get('/me',userCtrl.profile);

  router.get('/me/logout', userCtrl.logout);

  module.exports = router;