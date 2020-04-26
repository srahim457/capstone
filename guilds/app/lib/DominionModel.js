'use strict';
var sql = require('./db.js').pool;

//Dominion object constructor
var Dominion = function(dominion){
    this.guild_id = dominion.guild_id;
    this.name = dominion.name;
};
//Dominion

//Updates a Dominion's information
//Returns the dominion ID   
Dominion.updateDominionInformation = function (dominion, result) {
    console.log('updating dominion information \n')
    sql.query("UPDATE guilds.dominions info SET name =($2) WHERE id = ($1)",[dominion.id,dominion.name], function (err,res){            
            if(err) {
                console.log("error updating dominion information: ", err);
                result(err, null);
            }
            else{
                console.log(res.rows[0].id);
                result(null, res.rows[0].id);
            }
        });           
}
//Adds a new guild to dominion
//Takes a dominon id and a guild id
//Returns the dominion ID
Dominion.addGuild = function (dominionid,guildid, result) {
    console.log('mapping guild to dominion \n')
    sql.query("INSERT INTO guilds.dominions_guilds(dominion_id,guild_id) values($1,$2) RETURNING *",[dominionid,guildid], function (err,res){            
            if(err) {
                console.log("error updating dominion information: ", err);
                result(err, null);
            }
            else{
                console.log(res.rows[0].id);
                result(null, res.rows[0].id);
            }
        });           
}
//Takes in a dominion object
//creates the dominion in the database
//Returns the whole dominion entry
Dominion.createDominion = function (newDominion, result) {
    console.log('inserting new dominion now',newDominion),
    sql.query("INSERT INTO guilds.dominions(name) values($1) RETURNING *",[newDominion.name], function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res.rows[0]);
                result(null, res.rows[0]);
            }
        });           
};
//Returns the id of the last entered dominion
Dominion.getLastEnteredDominion = function (result) {
    console.log('getting last entered dominion'),
    sql.query("SELECT * from guilds.dominions order by id DESC limit 1",function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res.rows[0]);
                result(null, res.rows[0].id);
            }
        });           
};

// Finds a dominion by a guild id
// Takes a guild id
// Returns dominion entry
Dominion.getDominionByGuildID = function (guildid, result) {
        console.log('getting dominion by guild id \n')
        sql.query("Select * from guilds.dominions_guilds where guild_id = ANY ($1)", [guildid], function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
                }
            });   
};
// Takes a dominion id
// Returns dominion info 
Dominion.getDominionInfoByID = function (dominionid, result) {
    console.log('getting dominion by dominion id \n')
    sql.query("Select * from guilds.dominions where id = ANY ($1)", [dominionid], function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });   
};
// Finds all guilds in a dominion by dominion id
// Takes a dominon id
// Returns all guilds
Dominion.getallGuilds = function (dominionid, result) {
    console.log('getting dominion by guild id \n')
    sql.query("Select * from guilds.dominions_guilds where dominion_id = ANY ($1)", [dominionid], function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });   
};
//Delete a dominion by setting delete flag
//Take a whole dominion object
//Returns dominion ID
Dominion.delete = function(dominion, result){
    sql.query("UPDATE guilds.dominions info SET deleted= 'T' WHERE id =($1)",[dominion.id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{               
                 result(null, res.rows[0].id);
                }
            }); 
};

module.exports= {
    Dominion
}