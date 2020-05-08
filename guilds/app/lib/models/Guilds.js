'use strict';
var sql = require('../db').pool;

//Guilds object constructor
var Guilds = function (guilds) {
    this.name = guilds.name;
    this.picture = guilds.picture;
    this.public = guilds.public;
};
//Guilds

//Updates a Guilds's information
//Returns the guilds entry
Guilds.updateGuildsInformation = async function (req, res) {
    try {
        console.log('updating guilds information \n')
        const guild = await sql.query("UPDATE guilds.guilds SET name=($2), picture =($3), public =($4),desc = ($5) WHERE id = ($1) RETURNING *", [req[0].id, req[0].name, req[0].picture, req[0].public, req[0].desc])
        return guild.rows[0]
    } catch (error) {
        console.log(error);
        res.status(400);
    }
};
//Takes in a guilds object)
//creates the guilds in the database
//Returns the whole guilds entry
Guilds.createGuilds = async function (req, res) {
    try {
        console.log('inserting new guilds now \n ')
        const guild = await sql.query("INSERT INTO guilds.guilds(name,picture,public) values($1,$2,$3,$4) RETURNING *", [req[0].name, req[0].picture, req[0].public, req[0].desc])
        return guild.rows[0]
    } catch (error) {
        console.log(error);
        res.status(400);
    }
};
//Takes in a guilds object)
//sets guild to public
//Returns the whole guilds entry
Guilds.setPrivacy = async function (req, res) {
    try {
        console.log(' setting guild to ', req[0].public)
        const guild = await sql.query("UPDATE guilds.guilds SET public = ($1) WHERE id = ($2) RETURNING *", [req[0].public, req[0].id])
        return guild.rows[0]
    } catch (error) {
        console.log(error);
        res.status(400);
    }
};
//Takes a user id and a guild id
//Adds a user to a guild
//Returns new entry
Guilds.addUserToGuild = async function (req, res) {
    try {
        console.log(' mapping user to guild \n')
        const guild = await sql.query("INSERT INTO guilds.guilds_joined(user_id,guild_id) values($1,$2) RETURNING *", [req[0].userid, req[0].guildid])
        return guild.rows[0]
    } catch (error) {
        console.log(error);
        res.status(400);
    }
};
//Takes a guild id
//Returns all user id in a guild
Guilds.getAllUsers = async function (req, res) {
    try {
        console.log(' getting all users in a guild \n')
        const guilds = await sql.query("SELECT user_id from guilds.guilds_joined WHERE guild_id = ANY ($1)", [req])
        return guilds.rows
    } catch (error) {
        console.log(error);
        res.status(400);
    }
};
//Adds a party to the guild
//Takes a guild id and a party id
//Returns new entry
Guilds.addPartyToGuild = async function (req, res) {
    try {
        console.log(' mapping party to guild \n')
        const party = await sql.query("INSERT INTO guilds.guilds_parties(guild_id,party_id) values($1,$2) RETURNING *", [req[0].guildid, req[0].partyid])
        return party.rows[0]
    } catch (error) {
        console.log(error);
        res.status(400);
    }
};
//Gets every party in guild
//Takes a guild id
//Returns all party ids that have that guild id
Guilds.getAllParties = async function (req, res) {
    try {
        console.log(' getting all parties in this guild \n')
        const parties = await sql.query("SELECT party_id FROM guilds.guilds_parties WHERE guild_id = ($1) RETURNING *", [req])
        return parties.rows
    } catch (error) {
        console.log(error);
        res.status(400);
    }
};
//Returns the id of the last entered guilds
Guilds.getLastEnteredGuild = async function (req, res) {
    try {
        console.log('getting last entered guilds')
        const guild = await sql.query("SELECT * from guilds.guilds ORDER by id DESC limit 1")
        return guild.rows[0].id
    } catch (error) {
        console.log(error);
        res.status(400);
    }
};

// finds a guilds by a guild id
// Takes a guild id
// Returns guilds entry
Guilds.getGuildsByGuildID = async function (req, res) {
    try {
        console.log('getting guilds by guild id \n')
        const guild = await sql.query("Select * from guilds.guilds where id = ($1)", [req])
        return guild.rows[0]
    } catch (error) {
        console.log(error);
        res.status(400);
    }
};
//Delete a guilds by setting delete flag
//Take a whole guilds object
//Returns guild entrys
Guilds.delete = async function (req, res) {
    try {
        console.log('deleting guild \n')
        const guild = await sql.query("UPDATE guilds.guilds SET deleted= 'T' WHERE id =($1)", [req.id])
        return guild.rows[0]      
    } catch (error) {
        console.log(error);
        res.status(400);
    }
};

module.exports = {
    Guilds
}