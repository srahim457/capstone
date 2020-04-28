'use strict';
var sql = require('../db').pool;

//Dominion object constructor
var Dominion = function(dominion){
    this.guild_id = dominion.guild_id;
    this.name = dominion.name;
};
//Dominion

//Updates a Dominion's information
//
Dominion.updateDominionInformation = function (req,res) {
    console.log('updating dominion information \n')
    sql.query("UPDATE guilds.dominions info SET name =($2) WHERE id = ($1)",[req.id,req.name], function (err,resp){            
            if(err) {
                console.log("error updating dominion information: ", err);
                res.status(400);
            }
            else{
                res.status(200);
            }
        });           
}
//Adds a new guild to dominion
//Takes a dominon id and a guild id

Dominion.addGuild = function (req,res) {
    console.log('mapping guild to dominion \n')
    sql.query("INSERT INTO guilds.dominions_guilds(dominion_id,guild_id) values($1,$2) RETURNING *",[req.dominionid,req.guildid], function (err,resp){            
            if(err) {
                console.log("error updating dominion information: ", err);
                res.status(400);
            }
            else{
                res.status(200);
            }
        });           
}
//Takes in a dominion object
//creates the dominion in the database
//Returns the whole dominion entry
Dominion.createDominion = function (req,res) {
    console.log('inserting new dominion now \n'),
    sql.query("INSERT INTO guilds.dominions(name) values($1) RETURNING *",[req.name], function (err, resp) {
            
            if(err) {
                console.log("error inserting new dominion: ", err);
                result(err, null);
                res.status(400);
            }
            else{
                res.status(200).send(resp.rows[0].id);
            }
        });           
};
//Returns the id of the last entered dominion
Dominion.getLastEnteredDominion = function (req,res) {
    console.log('getting last entered dominion'),
    sql.query("SELECT * from guilds.dominions order by id DESC limit 1",function (err, resp) {
            
            if(err) {
                console.log("error: ", err);
                res.status(400);
            }
            else{
                res.status(200).send(resp.rows[0].id);
            }
        });           
};

// Finds a dominion by a guild id
// Takes a guild id
// Returns dominion entry
Dominion.getDominionByGuildID = function (req,res) {
        console.log('getting dominion by guild id \n')
        sql.query("Select * from guilds.dominions_guilds where guild_id = ($1)", [req.guildid], function (err, resp) {             
                if(err) {
                    console.log("error: ", err);
                    res.status(400);
                }
                else{
                    res.status(200).send(resp.rows[0]);
                }
            });   
};
// Takes a dominion id
// Returns dominion info 
Dominion.getDominionInfoByID = function (req,res) {
    console.log('getting dominion by dominion id \n')
    sql.query("Select * from guilds.dominions where id = ($1)", [req.dominionid], function (err, resp) {             
            if(err) {
                console.log("error: ", err);
                res.status(400);
            }
            else{
                res.status(200).send(resp.rows);
            }
        });   
};
// Finds all guilds in a dominion by dominion id
// Takes a dominon id
// Returns all guilds
Dominion.getallGuilds = function (req,res) {
    console.log('getting dominion by guild id \n')
    sql.query("Select * from guilds.dominions_guilds where dominion_id = ($1)", [req.dominionid], function (err, resp) {             
            if(err) {
                console.log("error: ", err);
                res.status(400);
            }
            else{
                res.status(200).send(resp.rows);
            }
        });   
};
//Delete a dominion by setting delete flag
//Take a whole dominion object
//Returns 200 for success
Dominion.delete = function(req,res){
    sql.query("UPDATE guilds.dominions info SET deleted= 'T' WHERE id =($1)",[req.id], function (err, resp) {

                if(err) {
                    console.log("error: ", err);
                    res.status(400);
                }
                else{
                    res.status(200);
                }
            }); 
};

module.exports= {
    Dominion
}