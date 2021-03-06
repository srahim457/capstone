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
        var d = new Date();
        console.log('inserting new guilds now \n ', req[0])
        // privacy not implemented yet
        //const guild = await sql.query("INSERT INTO guilds.guilds(name,picture,public,desc) values($1,$2,$3,$4,$5) RETURNING *", [req[0].name, req[0].picture, req[0].public, req[0].desc,d])
        const guild = await sql.query("INSERT INTO guilds.guilds(name,picture,guild_desc,date_created,creator_id) values($1,$2,$3,$4,$5) RETURNING *", [req[0].guild.name, req[0].guild.picture,req[0].guild.desc,d,req[0].userid])
        console.log(guild.rows[0],'\n result')
        return guild.rows[0]
    } catch (error) {
        console.log(error);
        res.status(400);
    }
};

//Listing

//Create a new picture for item
//Takes in an item object
//Returns created item id
Guilds.createItemImage = async function (req, res) {
    try {
        const listing = await sql.query('UPDATE guilds.guilds SET picture = ($1) WHERE id = ($2) RETURNING *', [req[0].image_picture, req[0].id]);
        return listing.rows[0].id
    } catch (error) {
        console.log(error)
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
        var d = new Date();
        console.log(' mapping user to guild \n', req)
        const guild = await sql.query("INSERT INTO guilds.guilds_joined(user_id,guild_id,date_joined) values($1,$2,$3) RETURNING *", [req[0].userid, req[0].guildid, d])
        return guild.rows[0]
    } catch (error) {
        console.log(error);
        res.status(200).json(error);
    }
};
//Search for all guilds that match the name provided

Guilds.searchForGuilds = async function (req, res) {
    try {
        //console.log(' search for guilds \n', req)
        // in case of privacy
        //const guilds = await sql.query("SELECT * from guilds WHERE private <> 'F'", [req])
        if (req === undefined) {
            console.log('undefined search')
        }
        else {
            //I dont like concat + query
            const guilds = await sql.query("SELECT * from guilds.guilds WHERE name LIKE ($1)", ['%' + req + '%'])
            console.log('there are ', guilds.rows.length, 'results \n')
            return guilds.rows
        }

    } catch (error) {
        console.log(error);
        res.status(400);
    }
};
//Returns all guilds
Guilds.getAllGuilds = async function (req, res) {
    try {
        console.log(' getting all guilds \n')
        // in case of privacy
        //const guilds = await sql.query("SELECT * from guilds WHERE private <> 'F'", [req])
        const guilds = await sql.query("SELECT * from guilds.guilds ORDER BY name ASC")
        return guilds.rows
    } catch (error) {
        console.log(error);
        res.status(400);
    }
};
//Returns all guilds
Guilds.getAllUserGuilds = async function (req, res) {
    try {
        console.log(' getting all guilds for user \n', req)
        // in case of privacy
        //const guilds = await sql.query("SELECT * from guilds WHERE private <> 'F'", [req])
        //const guilds = await sql.query("SELECT * from guilds.guilds.joined WHERE user_id = ($1) ORDER BY name ASC")
        const guilds = await sql.query("SELECT G.* from guilds.guilds AS G INNER JOIN guilds.guilds_joined AS GJ ON G.id = GJ.guild_id WHERE user_id = ($1) ORDER BY name ASC", req);
        console.log('number of guilds under userid ', req, 'are', guilds.rows.length, '\n')
        return guilds.rows
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
//Takes a guild id
//Returns first user id in a guild
Guilds.getFirstUser = async function (req, res) {
    try {
        console.log(' getting the first user in a guild \n')
        const firstuser = await sql.query("SELECT user_id from guilds.guilds_joined WHERE guild_id = ANY ($1) ORDER BY date_joined ASC RETURNING 1", [req])
        console.log(firstuser, 'first')
        return firstuser.rows
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