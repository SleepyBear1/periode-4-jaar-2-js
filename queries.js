const pg = require('pg');
const process_db = require('dotenv').config();
const db_url = process.env.DATABASE_URL || process_db.parsed.DB_URL;
const { Client } = require('pg')

const client = new Client({
    connectionString: db_url,
    ssl: { rejectUnauthorized: false }
});
client.connect();

const insertChats = (request) => {
    const data = request;

    client.query('INSERT INTO chats (user_name, room, chat_text, date_time) VALUES ($1, $2, $3, NOW())',
    [data.user, data.room, data.msg], (error, results) => {
        if (error) {
            throw error
        }
        console.log('Chat added to room: ${data.room}');
    })
}


const getChats = (roomName) => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM chats WHERE room = '"+roomName+"' ORDER BY date_time ASC;")
        .then(result => {
            resolve(result.rows);
        })
        .catch(e => console.error(e.stack))
    });
}

module.exports = {
    getChats,
    insertChats
}

