const db = require('../../db/db_connection.js')

export default async function handler(req, res) {
    const { method } = req;

    if (method === "GET") {
        const [rows, fields] = await db.execute('SELECT * FROM `Race`');
        return res.status(200).json(rows);
    }

    if (method === "POST") {
        const { body } = req;
        const [rows, fields] = await connection.execute('INSERT INTO `Race` (raceName, raceDate, raceLocation, raceLength, Signup) VALUES (?,?,?,?,?)',
        [body.name, body.time, body.location, body.distance, body.signupInfo]);
        return res.status(200).json(rows);
    }
}