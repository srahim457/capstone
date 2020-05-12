'use strict';
var sql = require('../db').pool;

//Dominion object constructor
var Dominion = function (dominion) {
    this.guild_id = dominion.guild_id;
    this.name = dominion.name;
};
//Dominion

//Updates a Dominion's information
//Returns the dominion entry
Dominion.updateDominionInformation = async function (req, res) {
    try {
        console.log('updating dominion information \n')
        const dominion = await sql.query("UPDATE guilds.dominions info SET name =($2), desc = ($3) WHERE id = ($1) RETURNING *", [req[0].id, req[0].name, req[0].desc])
        return dominion.rows[0]
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}
//Adds a new guild to dominion
//Takes a dominon id and a guild id
//Returns the mapped dominion id entry
Dominion.addGuild = async function (req, res) {
    try {
        console.log('mapping guild to dominion \n')
        const dominion = await sql.query("INSERT INTO guilds.dominions_guilds(dominion_id,guild_id) values($1,$2) RETURNING *", [req[0].dominionid, req[0].guildid])
        return dominion.rows[0].dominionid
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}
//Takes in a dominion object
//creates the dominion in the database
//Returns the whole dominion entry
Dominion.createDominion = async function (req, res) {
    try {
        console.log('inserting new dominion now \n')
        const dominion = await sql.query("INSERT INTO guilds.dominions(name,desc) values($1,$2) RETURNING *", [req[0].name, req[0].desc])
        return dominion.rows[0]
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}
//Returns the id of the last entered dominion
Dominion.getLastEnteredDominion = async function (req, res) {
    try {
        console.log('getting last entered dominion')
        const dominion = await sql.query("SELECT * from guilds.dominions order by id DESC limit 1")
        return dominion.rows[0].id
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}
// Finds a dominion by a guild id
// Takes a guild id
// Returns dominion entry
Dominion.getDominionByGuildID = async function (req, res) {
    try {
        console.log('getting dominion by guild id \n')
        const dominion = await sql.query("Select * from guilds.dominions_guilds where guild_id = ($1)", [req])
        return dominion.rows[0]
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}
// Takes a dominion id
// Returns dominion info 
Dominion.getDominionByID = async function (req, res) {
    try {
        console.log('getting dominion by dominion id \n')
        const dominion = await sql.query("Select * from guilds.dominions where id = ($1)", [req])
        return dominion.rows[0]
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}
// Finds all guilds in a dominion by dominion id
// Takes a dominon id
// Returns all guilds
Dominion.getallGuilds = async function (req, res) {
    try {
        console.log('getting dominion by guild id \n')
        const dominion = await sql.query("Select * from guilds.dominions_guilds where dominion_id = ($1)", [req])
        return dominion.rows[0]
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}
//Delete a dominion by setting delete flag
//Take a whole dominion object
//Returns dominion entry
Dominion.delete = async function (req, res) {
    try {
        const dominion = await sql.query("UPDATE guilds.dominions info SET deleted= 'T' WHERE id =($1) RETURNING *", [req.id])
        return dominion.rows[0]
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}

module.exports = {
    Dominion
}