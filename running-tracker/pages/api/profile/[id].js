const mysql = require('mysql2/promise');

let connection;


async function setUpConnection() {
    connection = await mysql.createConnection({
        host: 'soccerdb.calingaiy4id.us-east-2.rds.amazonaws.com',
        user: 'lew_sch_teg',
        password: '8nXUKMHfVUtY',
        database: 'capstone_2223_5krun'
    });
}


export default async function handler(req, res) {
    const method = { req };

    if (method === "GET") {
        const { id } = req.query;
        // TODO: Query DB to get information that matches the ID
        return res.status(200).json(rows); // Incomplete; still need to get the running data, but this should get the basics
    }
}