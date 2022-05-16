const express = require('express');
const User = require('../models/User');
const router = express.Router(); 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const  jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'thisisajwtsecret'


                                                    // [[[[ ROUTE 1 ]]]]
 
 // [[[[ ROUTE 1 ]]]] create a user using:POST '/api/auth/createuser'. no login required 
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 3  }),
    body('email','enter a valid email').isEmail(),
    body('password','enter password ').isLength({ min: 5 })
], async(req, res)=>{
  success= false;
  //if there are any error than return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      
      return res.status(400).json({success, errors: errors.array() });
    } 

    //check whether the user with email exist or not 
    try{ 
    let user = await User.findOne({email: req.body.email});
    if (user) {
      return res.status(400).json({success, error: 'user with this email already exist'})
    }

    //bcrypt or hash your password
    const salt = await bcrypt.genSalt(10);
    const secPass = await  bcrypt.hash(req.body.password, salt);

    //create   new user 
    
    user = await User.create({
        name: req.body.name,
        email: req.body.email ,
        password: secPass ,
      }) 

      //jwt 
      const data ={
        user:{
          id: user.id
        }
      }

      const authtoken = jwt.sign(data, JWT_SECRET);

    // res.json( {user});
    success= true; 
    res.json({success, authtoken})
    //if there is any error above than show this 
    }catch(error){
      console.error(error.message); 
      res.status(500).send('Internal server occured');
    }
})

                                                // [[[[ ROUTE 2 ]]]]

 // [[[[ ROUTE 2 ]]]] create a user using:POST '/api/auth/login'. no login required
router.post('/login',[
  body('email','enter a valid email').isEmail(), 
  body('password','password cannot be blank').exists()
], async(req, res)=>{
  let  success= false;
  //if there are any error than return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 

  const {email,password}=req.body;
  try {
    let user =  await User.findOne({email});
    if(!user){
      success= false;
      return res.status(400).json({error:"please enter correct email/password"});
    }
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      success= false;
      return res.status(400).json({success, error:"please enter correct email/password"});
    }

     //jwt 
     const data ={
      user:{
        id: user.id
      }

    }


    const authtoken = jwt.sign(data, JWT_SECRET);
    success= true;
    res.json({success, authtoken})
    
  } catch (error) {
      console.error(error.message); 
      res.status(500).send('Internal server occured'); 
  }

})


  // [[[[ ROUTE 3 ]]]]

 // [[[[ ROUTE 3 ]]]] GET LOGGED IN USER DETAIL using:POST '/api/auth/getuser '. LOGIN REQUIRED 
 router.post('/getuser', fetchuser, async(req, res)=>{
 try {
   userId = req.user.id;
   const user = await User.findById(userId).select('-password')
   res.send(user);// sending respond
 } catch (error) {
  console.error(error.message); 
  res.status(500).send('Internal server occured'); 
 }
})

module.exports = router