'use strict';

const Database      = require('./database');
const sqlStatements = require('./sqlStatements');
const options       = require('./options');

const allSql        = sqlStatements.getAllSql.join(' ');
const getProductSql    = sqlStatements.getProductSql.join(' ');
const insertSql     = sqlStatements.insertProductSql.join(' ');
const deleteSql     = sqlStatements.deleteProductSql.join(' ');

class ProductDatabase{
  constructor(options, debug=false){
    this.productDB=new Database(options, debug);
  }
  getAll() {
    return new Promise(async (resolve, reject)=>{
      try{
        let result = await this.productDB.doQuery(allSql);
        resolve(result);
      }
      catch(err) {
        reject(fatalError(err));
      }
    });
  }
  get(productID) {
    return new Promise(async (resolve,reject)=>{
      try{
        let result= await this.productDB.doQuery(getProductSql, +productID);
        if(result.length===0) {
          reject(new Error('Product unknown'));
        }
        else {
          resolve(result[0]);
        }
      }
      catch(err){
        reject(fatalError(err));
      }
    });
  }

  insert(product) {
    return new Promise( async (resolve,reject)=>{
      try{
        let result= await this.productDB.doQuery(insertSql,
          +product.productID,
          product.firstname,
          product.model,
          product.type,
          +product.price

        );
        if(result.affectedRows===0) {
          reject(new Error('No product was added'));
        }
        else{
          resolve(`Product with id ${product.productID} was added`);
        }
      }
      catch(err) {
        reject(fatalError(err));
      }
    });
  }
  delete(productID) {
    return new Promise( async (resolve, reject)=>{
      try{
        let result = await this.productDB.doQuery(deleteSql, +productID);
        if(result.affectedRows===0) {
          reject(new Error(`No product with given ID ${productID}. Nothing deleted.`));
        }
        else {
          resolve(`Product with ID ${productID} was deleted.`);
        }
      }
      catch(err) {
        reject(fatalError(err));
      }
    });
  }
} //end of class

module.exports=function initDataStorage(debug=false) {
  return new ProductDatabase(options, debug);
};

function fatalError(err) {
  return new Error(`Sorry! Error in our program. ${err.message}`);
}
