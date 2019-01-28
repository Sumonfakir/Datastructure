'use strict';

const routes = require('express').Router();

module.exports = (dataStorage, sendErrorPage, sendStatusPage) => {
  routes.get('/deleteproduct', (req,res) =>
    res.render('getProduct', {title:'Remove product with ID', header:'Remove product with ID', action:'/deleteproduct'})
  );
  routes.post('/deleteproduct', (req,res) => {
    if(!req.body || !req.body.productID) {
      res.sendStatus(500);
    }
    else {
      dataStorage.delete(req.body.productID)
        .then(message => sendStatusPage(res,message))
        .catch(err => sendErrorPage(res, err.message));
    }
  });
  return routes;
};
