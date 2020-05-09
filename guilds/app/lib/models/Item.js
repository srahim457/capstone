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
Item.createItem = async function (req, res) {
  try {
    console.log('creating item', req[0])
    const item = await sql.query('INSERT INTO guilds.item_info (item_name,item_desc,image,is_available) VALUES($1,$2,$3,$4) RETURNING *', [req[0].item_name, req[0].item_desc, req[0].item_image, 'T'])
    return item.rows[0].id
  } catch (error) {
    console.log(error)
    res.status(400)
  }
};
//Return item that matches item id
//Takes in an id
//Returns item entry
Item.getItemByID = async function (req, res) {
  try {
    console.log('Getting item with id ', req)
    const item = await sql.query('Select * from guilds.item_info where item_id = ANY ($1)', [req])
    return item.rows
  } catch (error) {
    console.log(error)
    res.status(400)
  }
};
//Return any item matching the name provided
//Takes in an item name
//Returns all rows matching passed name
Item.getItemByName = async function (req, res) {
  try {
    console.log('Getting every item with the name ', req)
    const items = await sql.query('Select * from guilds.item_info where item_name LIKE ($1)', [req])
    return items.rows
  } catch (error) {
    console.log(error)
    res.status(400)
  }
};
//Updates an item's information (name,desc,image)
//Returns item ID of updated item
Item.updateItemInformation = async function (req, res) {
  try {
    console.log('updating item information with this new information', req);
    const item = await sql.query('UPDATE guilds.item_info SET item_name=($1), item_desc =($2),image = ($3) WHERE item_id = ($4) RETURNING *', [req[0].item_name, req[0].item_desc, req[0].item_image, req[0].id])
    return item.rows[0].id
  } catch (error) {
    console.log(error)
    res.status(400)
  }
};
//Sets the items availability
//Takes item id and is_availiable 
//Returns avail stat
Item.updateAvailability = async function (req, res) {
  try {
    console.log('updating item Availability with ', req);
    const item = await sql.query('UPDATE guilds.item_info SET is_available=($1) WHERE item_id = ($2) RETURNING *', [req[0].is_available, req[0].id])
    return item.rows[0].is_available
  } catch (error) {
    console.log(error)
    res.status(400)
  }
};
//"Deletes" item
//Takes in only item id
//Returns item deleted status
Item.deleteItem = async function (req, res) {
  try {
    console.log('deleting an item with id ', req)
    const item = await sql.query("UPDATE guilds.item_info SET delete = 'T' where id = ($1) RETURNING *", [req])
    return item.rows[0].delete
  } catch (error) {
    console.log(error)
    res.status(400)
  }
};

module.exports = {
  Item,
};