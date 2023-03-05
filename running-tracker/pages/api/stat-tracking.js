const db = require('../../db/db_connection.js')
const { DateTime } = require("luxon")

export default async function handler(req, res) {
    const { method } = req;
    const { body } = req;
    const [i, ifields, ie] = await db.execute("SELECT id FROM `Person` WHERE `Person`.email = ?", [body[0].email])
    const id = i[0].id;
    const date = DateTime.now();
    console.log("here");
    if (body[0].isGet) {
        const [runData, fields, errors] = await db.execute("SELECT * FROM `Run` WHERE `Run`.userID = ?", [id]);
        const [teams, fields2, errors2] = await db.execute("SELECT teamName FROM `Membership` JOIN `Team` ON `Team`.teamID = `Membership`.teamID WHERE `Membership`.userID = ?",
            [id]);
        const [races, fields3, errors3] = await db.execute("select raceName, raceDate from Racer join Race on Racer.raceID = Race.raceID where Racer.userID = ?",
            [id]);
        return res.status(200).json(runData);
    }

    else if (method === "POST") {
        const [r, f, e] = await db.execute("INSERT INTO `Run` (userID, runTime, runLength, runDate) VALUES (?,?,?,?)",
            [id, body[0].time, body[0].distance, `${date.year}-${date.month}-${date.day}`]);
        if (e) {
            return res.status(500);
        }
        const [rows, fields, errors] = await db.execute("SELECT * FROM `Run` WHERE `Run`.userID = ?", [id]);
        return res.status(200).json(rows);
    }
}