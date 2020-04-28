'use strict';
var sql = require('../db').pool;

//Guilds object constructor
var Guilds = function(guilds){
    this.name = guilds.name;
    this.picture = guilds.picture;
    this.public = guilds.public;
};
//Guilds

//Updates a Guilds's information
//Returns the guilds ID   

Guilds.updateGuildsInformation = function (req,res) {
    console.log('updating guilds information \n')
    sql.query("UPDATE guilds.guilds SET name=($2), picture =($3), public =($4) WHERE id = ($1)",[req.id,req.name,req.picture,req.public], function (err,resp){            
            if(err) {
                console.log("error updating guilds information: ", err);
                res.status(400);
            }
            else{
                res.status(200).send(resp.rows[0].id);
            }
        });           
}
//Takes in a guilds object)
//creates the guilds in the database
//Returns the whole guilds entry
Guilds.createGuilds = function (req,res) {
    console.log('inserting new guilds now \n '),
    sql.query("INSERT INTO guilds.guilds(name,picture,public) values($1,$2,$3) RETURNING *",[req.name,req.picture,req.public], function (err, resp) {
            
            if(err) {
                console.log("error: ", err);
                res.status(400);
            }
            else{
                res.status(200).send(resp.rows[0]);
            }
        });           
};
//Takes in a guilds object)
//creates the guilds in the database
//Returns the whole guilds entry
Guilds.setPublic = function (req,res) {
    console.log(' setting guild to public '),
    sql.query("INSERT INTO guilds.guilds(name,picture,public) values($1,$2,$3) RETURNING *",[req.name,req.picture,req.public], function (err, resp) {
            
            if(err) {
                console.log("error: ", err);
                res.status(400);
            }
            else{
                res.status(200).send(resp.rows[0]);
            }
        });           
};
//Takes a user id and a guild id
//Adds a user to a guild
//Returns new entry
Guilds.addUserToGuild = function (req,res) {
    console.log(' mapping user to guild \n'),
    sql.query("INSERT INTO guilds.guilds_joined(user_id,guild_id) values($1,$2) RETURNING *",[req.userid,req.guildid], function (err, resp) {
            
            if(err) {
                console.log("error: ", err);
                res.status(400);
            }
            else{
                res.status(200).send(resp.rows[0]);
            }
        });           
};
//Adds a party to the guild
//Takes a guild id and a party id
//Returns new entry
Guilds.addPartyToGuild = function (req,res) {
    console.log(' mapping party to guild \n'),
    sql.query("INSERT INTO guilds.guilds_parties(guild_id,party_id) values($1,$2) RETURNING *",[req.guildid,req.partyid], function (err, resp) {
            
            if(err) {
                console.log("error: ", err);
                res.status(400);
            }
            else{
                res.status(200).send(resp.rows[0]);
            }
        });           
};
//Returns the id of the last entered guilds
Guilds.getLastEnteredGuilds = function (req,res) {
    console.log('getting last entered guilds'),
    sql.query("SELECT * from guilds.guilds ORDER by id DESC limit 1",function (err, resp) {
            
            if(err) {
                console.log("error: ", err);
                res.status(400);
            }
            else{
                res.status(200).send(resp.rows[0].id);
            }
        });           
};

// finds a guilds by a guild id
// Takes a guild id
// Returns guilds entry
Guilds.getGuildsByGuildID = function (req,res) {
        console.log('getting guilds by guild id \n')
        sql.query("Select * from guilds.guilds where id = ($1)", [req.guild_id], function (err, resp) {             
                if(err) {
                    console.log("error: ", err);
                    res.status(400);
                }
                else{
                    res.status(200).send(resp.rows[0]);
                }
            });   
};
//Delete a guilds by setting delete flag
//Take a whole guilds object
//Returns guilds ID
Guilds.delete = function(req,res){
    sql.query("UPDATE guilds.guilds SET deleted= 'T' WHERE id =($1)",[req.id], function (err, resp) {

                if(err) {
                    console.log("error: ", err);
                    res.status(400);
                }
                else{
                    res.status(200).send(resp.rows[0]);
                }
            }); 
};

module.exports= {
    Guilds
}