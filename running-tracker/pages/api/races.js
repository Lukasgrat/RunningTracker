const mysql = require('mysql2/promise');
const db = require('../../db/db_connection.js')

export default async function handler(req, res) {
    const { method } = req;

    if (method === "GET") {
        const [rows, fields] = await db.execute('SELECT * FROM `Race`');
        console.log(rows);
        return res.status(200).json(rows);
    }
}