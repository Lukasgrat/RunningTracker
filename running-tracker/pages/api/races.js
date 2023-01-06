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
    const { method } = req;
    await setUpConnection();

    if (method === "GET") {
        const [rows, fields] = await connection.execute('SELECT * FROM `Race`');
        return res.status(200).json(rows);
    }
}