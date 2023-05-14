const db = require('../../db/db_connection.js')

export default async function handler(req, res) {
    const { method } = req;
    let {body} = req;
    console.log("here");
    if (method === "POST") {
        db.execute('Update Person SET roleID = ? WHERE id = ?',[body.role,body.ID]);
        return res.status(200);
    }
}