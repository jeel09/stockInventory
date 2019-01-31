var express = require('express');
var router = express.Router();
const productTable = require('../model/product')

router.get('/',(req,res)=>{
    if(req.isAuthenticated())
  {
    let username = req.user.username;    
    res.render('product',{username:username})
  }    
  else
  {
    res.redirect('login?err')
  }
})

router.post('/addProductRoute',(req,res)=>{
    let addProdoctObj = req.body;
    productTable.create(addProdoctObj).then((response)=>{
        res.send('SUCCESS')
    }).catch((err)=>{
        res.send('ERROR')
    })
})

router.get('/fetchData',(req,res)=>{
    productTable.findAll().then((data)=>{
        res.send(data)
    })
})

// Delete route

router.post('/deleteProduct',(req,res)=>{
    let deleteObj = req.body.id;
    productTable.destroy({
        where : {
            id:deleteObj
        }
    }).then((response)=>{
        res.send('SUCCESS')
    })
})


//  update route 1

    router.post('/getEditData',(req,res)=>{
        let editObjId = req.body.id;
        productTable.findOne({
            where : {
                id:editObjId
            }
        }).then((data)=>{
            res.send(data)
        })
    })

// update route 2

    router.post('/updateProduct',(req,res)=>{
        let updateObj = req.body;
        productTable.update(updateObj,{
            where:{
                id:req.body.id
            }
        }).then((response)=>{
            res.send('SUCCESS')
        }).catch((err)=>{
            res.send('ERROR')
        })
    })


module.exports = router ;