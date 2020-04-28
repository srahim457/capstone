'use strict';
var sql = require('../db').pool;

//Item Constructor
var Item = function (item) {
  this.item_name = item.item_name;
  this.item_desc = item.item_desc;
  this.image = item.image;
  this.is_available = item.is_available;
};

//Item
//Creates a new item entry
//Returns item id
Item.createItem = function (req,res) {
  sql.query(
    'INSERT INTO guilds.item_info (item_name,item_desc,image,is_available) VALUES($1,$2,$3,$4)',
    [req.item_name, req.item_desc, req.item_image, req.is_available],
    function (err, resp) {
      if (err) {
        console.log('error: ', err);
        res.status(400);
      }
      else{
          res.status(200).send(resp.rows[0].id);
      }
    }
  );
};
//Return item that matches item id
Item.getItemByID = function (req, res) {
  sql.query(
    'Select * from guilds.item_info where item_id = ANY ($1)',
    [req.item_id],
    function (err, resp) {
      if (err) {
        console.log('error: ', err);
        res.status(400);
      }
      else{
          res.status(200).send(resp.rows[0]);
      }
    }
  );
};
//Return any item matching the name provided
Item.getItemByName = function (req,res) {
  sql.query(
    'Select * from guilds.item_info where item_id LIKE ($1)',
    [req.item_name],
    function (err, resp) {
      if (err) {
        console.log('error: ', err);
        res.status(400);
      }
      else{
          res.status(200).send(resp.rows);
      }
    }
  );
};
//Updates an item's information (name,desc,image)
//Returns new item ID
Item.updateItemInformation = function (req,res) {
  console.log('updating item information', item);
  sql.query(
    'UPDATE guilds.item_info SET item_name=($1), item_desc =($2),image = ($3) WHERE item_id = ($4)',
    [req.item_name, req.item_desc, req.item_image, req.id],function (err, resp) {
    if (err) {
      console.log('error updating item information: ', err);
      res.status(400);
    }
    else{
        res.status(200).send(resp.rows[0].id);
    }
  });
};
//Sets the items availability
Item.updateAvailability = function (req,res) {
  console.log('updating item Availability', item);
  sql.query(
    'UPDATE guilds.item_info SET is_available=($1) WHERE item_id = ($2)',
    [req.is_available, req.id], function (err, resp) {
    if (err) {
      console.log('error updating item availability: ', err);
      res.status(400);
    }
    else{
        res.status(200);
    }
  });
};
//"Deletes" item
//Takes in only item id
Item.deleteItem = function (req,res) {
  sql.query(
    "UPDATE guilds.item_info SET delete = 'T' where id = ($1)",
    [req.item_id],
    function (err, resp) {
      if (err) {
        console.log('error deleting item: ', err);
        res.status(400);
      }
      else{
          res.status(200);
      }
    }
  );
};

module.exports = {
  Item,
};
