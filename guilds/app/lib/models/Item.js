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
Item.createItem = function (item, result) {
  sql.query(
    'INSERT INTO guilds.item_info (item_name,item_desc,image,is_available) VALUES($1,$2,$3,$4)',
    [item.item_name, item.item_desc, item.item_image, item.is_available],
    function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      } else {
        console.log('created item');
        result(null, res.rows[0].id);
      }
    }
  );
};
//Return item that matches item id
Item.getItemByID = function (item_id, result) {
  sql.query(
    'Select * from guilds.item_info where item_id = ANY ($1)',
    [item_id],
    function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      } else {
        console.log('found the item ');
        result(null, res);
      }
    }
  );
};
//Return any item matching the name provided
Item.getItemByName = function (item_name, result) {
  sql.query(
    'Select * from guilds.item_info where item_id LIKE ($1)',
    [item_name],
    function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      } else {
        console.log('Found the item ');
        result(null, res);
      }
    }
  );
};
//Updates an item's information (name,desc,image)
//Returns new item ID
Item.updateItemInformation = function (item, result) {
  console.log('updating item information', item);
  sql.query(
    'UPDATE guilds.item_info SET item_name=($1), item_desc =($2),image = ($3) WHERE item_id = ($4)',
    [item.item_name, item.item_desc, item.item_image, item.id]
  );
  Item.createItem(item, function (err, res) {
    if (err) {
      console.log('error updating item information: ', err);
      result(err, null);
    } else {
      console.log(res.rows[0].id);
      result(null, res.rows[0].id);
    }
  });
};
//Sets the items availability
Item.updateAvailability = function (item, result) {
  console.log('updating item Availability', item);
  sql.query(
    'UPDATE guilds.item_info SET is_available=($1) WHERE item_id = ($2)',
    [item.is_available, item.id]
  );
  Item.createItem(item, function (err, res) {
    if (err) {
      console.log('error updating item information: ', err);
      result(err, null);
    } else {
      console.log(res.rows[0].id);
      result(null, res.rows[0].id);
    }
  });
};
//"Deletes" item
//Takes in only item id
Item.deleteItem = function (item_id) {
  sql.query(
    "UPDATE guilds.item_info SET delete = 'T' where id = ($1)",
    [item_id],
    function (err, res) {
      if (err) {
        console.log('error deleting item: ', err);
        result(err, null);
      } else {
        console.log('Deleted item');
      }
    }
  );
};

module.exports = {
  Item,
};
