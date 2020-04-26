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
    console.log('updating dominion information',dominion)
    sql.query("UPDATE guilds.dominions info SET guild_id=($2), name =($3) WHERE id = ($1)",[dominion.id,dominion.guild_id,dominion.name], function (err,res){            
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
//Takes in a dominion object)
//creates the dominion in the database
//Returns the whole dominion entry
Dominion.createDominion = function (newDominion, result) {
    var d = new Date();
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

// finds a dominion by a guild id and returns all of their information
// Returns dominion entry
Dominion.getDominionByGuildID = function (guild_id, result) {
        console.log('getting dominion by guild id ', guild_id)
        sql.query("Select * from guilds.dominions where guild_id = ANY ($1)", [guild_id], function (err, res) {             
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