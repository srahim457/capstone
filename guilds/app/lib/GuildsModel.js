'use strict';
var sql = require('./db.js').pool;

//Guilds object constructor
var Guilds = function(guilds){
    this.name = guilds.name;
    this.picture = guilds.picture;
    this.public = guilds.public;
};
//Guilds

//Updates a Guilds's information
//Returns the guilds ID   
Guilds.updateGuildsInformation = function (guilds, result) {
    console.log('updating guilds information',guilds)
    sql.query("UPDATE guilds.guilds SET name=($2), picture =($3), public =($4) WHERE id = ($1)",[guilds.id,guilds.name,guilds.picture,guilds.public], function (err,res){            
            if(err) {
                console.log("error updating guilds information: ", err);
                result(err, null);
            }
            else{
                console.log(res.rows[0].id);
                result(null, res.rows[0].id);
            }
        });           
}
//Takes in a guilds object)
//creates the guilds in the database
//Returns the whole guilds entry
Guilds.createGuilds = function (newGuilds, result) {
    console.log('inserting new guilds now',newGuilds),
    sql.query("INSERT INTO guilds.guilds(name,picture,public) values($1,$2,$3) RETURNING *",[newGuilds.name,newGuilds.picture,newGuilds.public], function (err, res) {
            
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
//Takes in a guilds object)
//creates the guilds in the database
//Returns the whole guilds entry
Guilds.setPublic = function (privacy, result) {
    console.log(' setting guilds to public ',privacy),
    sql.query("INSERT INTO guilds.guilds(name,picture,public) values($1,$2,$3) RETURNING *",[newGuilds.name,newGuilds.picture,newGuilds.public], function (err, res) {
            
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
//Takes a user id and a guild id
//Adds a user to a guild
//Returns new entry
Guilds.addUserToGuild = function (userid,guildid,result) {
    console.log(' mapping user to guild \n'),
    sql.query("INSERT INTO guilds.guilds_joined(user_id,guild_id) values($1,$2) RETURNING *",[userid,guildid], function (err, res) {
            
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
//Adds a party to the guild
//Takes a guild id and a party id
//Returns new entry
Guilds.addPartyToGuild = function (guildid,partyid,result) {
    console.log(' mapping party to guild \n'),
    sql.query("INSERT INTO guilds.guilds_parties(guild_id,party_id) values($1,$2) RETURNING *",[guildid,partyid], function (err, res) {
            
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
//Returns the id of the last entered guilds
Guilds.getLastEnteredGuilds = function (result) {
    console.log('getting last entered guilds'),
    sql.query("SELECT * from guilds.guilds order by id DESC limit 1",function (err, res) {
            
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

// finds a guilds by a guild id
// Takes a guild id
// Returns guilds entry
Guilds.getGuildsByGuildID = function (guild_id, result) {
        console.log('getting guilds by guild id ', guild_id)
        sql.query("Select * from guilds.guilds where id = ANY ($1)", [guild_id], function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
                }
            });   
};
//Delete a guilds by setting delete flag
//Take a whole guilds object
//Returns guilds ID
Guilds.delete = function(guilds, result){
    sql.query("UPDATE guilds.guilds SET deleted= 'T' WHERE id =($1)",[guilds.id], function (err, res) {

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
    Guilds
}