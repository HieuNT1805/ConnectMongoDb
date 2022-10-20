const e = require('express');
const express = require('express');
const User = require('../model/User');
const auth = require('../middleware/auth')

module.exports = {
  ////Register
  register: async (req, res) =>{
    try{
      const user = new User(req.body);
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    }catch(error){
      res.status(400).send(error);
    }
  },


//Login
  login: async (req, res)=> {
    try{
      const { email, password} = req.body;
      const user = await User.findByCredentinals(email, password);
      if(!user) {
        return res.status(401).json({error: 'Login failed! Check authentication credentinals'})
      }
      const token = await user.generateAuthToken();
      res.send({user, token})
    }catch(error){
      res.status(400).send(error)
    }
  },



// View logged in user profile
  profile: (auth, async(req, res)=>{
    res.send(req.user);
  }),


// Log user out 
  logout: async(req, res)=>{
    try{
      req.user.tokens = req.user.tokens.filter(token => {
        return token.token != req.token;
      });
      await req.user.save();
      res.send();
    }catch(err){
      res.status(500).send(error);
    }
  },
};




//   // Log user out of all devices
//   router.post('/me/logoutall', auth, async(req, res) => {
//     try {
//         req.user.tokens.splice(0, req.user.tokens.length)
//         await req.user.save()
//         res.send()
//     } catch (error) {
//         res.status(500).send(error)
//     }
// });
