var express = require('express');
var router = express.Router();
const userTable = require('../model/user');
var passport = require('passport');

router.get('/', (req,res)=>
{
    res.render('login')
    let username = req.user.username;
})


router.post('/login',passport.authenticate('local', { successRedirect: '/',failureRedirect: '/login',failureFlash: true })
	);


router.post('/register',(req,res)=>{
    let registerObj = req.body;
    registerObj.password = userTable.hashPassword(registerObj.password);
    userTable.create(registerObj).then((response)=>{
        res.send('SUCCESS')
    }).catch((err)=>{
        res.send('ERROR')
    })  
})  


module.exports = router ;