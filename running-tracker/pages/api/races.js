const db = require('../../db/db_connection.js')

export default async function handler(req, res) {
    const { method } = req;
    let {body} = req;

    if (method === "POST") {
        if(body.isDelete){
            db.execute('delete from Race where raceID = ?',[body.ID]);
            return res.status(200);
        }
        else{
            const { body } = req;
            const [rows, fields] = await db.execute('INSERT INTO `Race` (organizerID, raceName, raceDate, raceLocation, raceLength, Signup) VALUES (?,?,?,?,?,?)',
            [body.ID, body.name, body.time, body.location, body.distance, body.contact]);
            return res.status(200).json(rows);
        }
    }
}