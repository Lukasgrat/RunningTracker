const db = require('../../db/db_connection.js')
const { dateTime } = require("luxon")

export default async function handler(req, res) {
    const { method } = req;
    const { body } = req;

    if (method === "GET") {
        const [rows, fields, errors] = await db.execute("SELECT * FROM `Run` WHERE `Run`.userID = ?", [body.id]);
        return res.status(200).json(rows);
    }

    if (method === "POST") {
        const date = dateTime.now();
        const [r,f,e] = await db.execute("INSERT INTO `Run` (userID, runTime, runLength, runDate) VALUES (?,?,?,?)",
        [body.id, body.time, body.distance,`${date.year}-${date.month}-${date.day}`]);
        if (e) {
            return res.status(500);
        }
        const [rows, fields, errors] = await db.execute("SELECT * FROM `Run` WHERE `Run`.userID = ?", [body.id]);
        return res.status(200).json(rows);
    }
}