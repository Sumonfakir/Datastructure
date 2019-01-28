'use strict';

const routes = require('express').Router();

const initRoutes = function(storage, sendErrorPage, sendStatusPage) {
  let dataStorage = storage;

  routes.get('/insertform', (req,res)=>
    res.render('form', {
      title     : 'Insert',
      header    : 'Add a new product',
      action    : '/insert',
      productID : {value:'', readonly:''},
      firstname : {value:'', readonly:''},
      model  : {value:'', readonly:''},
      type    : {value:'', readonly:''},
      price     : {value:'', readonly:''}

    })
  );

  routes.post('/insert',(req,res)=> {
    if(!req.body) {
      res.sendStatus(401);
    }
    else{
      dataStorage.insert(req.body)
        .then(message => sendStatusPage(res,message))
        .catch(error => sendErrorPage(res, error.message));
    }
  });

  return routes;

};
module.exports= initRoutes;
