'use strict';

const routes = require('express').Router();

const initRoutes = function(storage, sendErrorPage) {
  let dataStorage = storage;

  routes.get('/all', (req,res)=>{
    dataStorage.getAll()
      .then(result => res.render('allProducts', {result:result}))
      .catch(err => sendErrorPage(res, err.message));
  });

  routes.get('/getproduct', (req,res)=>
    res.render('getProduct',{title:'Get product with ID', header:'Get product with ID', action:'/getproduct'})
  );

  routes.post('/getproduct', (req,res)=>{
    if(!req.body) {
      res.sendStatus(401);
    }
    else {
      let productID = req.body.productID;
      dataStorage.get(productID)
        .then(products => res.render('productPage', {products}))
        .catch(err => sendErrorPage(res,err.message, 'ProductError', 'Oops!'));
    }
  });

  return routes;
};

module.exports=initRoutes;
