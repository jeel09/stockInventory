var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated())
  {
    let username = req.user.username;    
    res.render('index',{username:username})
  }    
  else
  {
    res.redirect('login?err')
  }
});

module.exports = router;
