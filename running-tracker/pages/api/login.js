const db = require('../../db/db_connection')

export default async function handler(req, res) {
    let { method } = req;

    if (db !== null) {
        console.log("DB is not null");
    }

    if (method === 'POST') {
        let { body } =  req;
        db.execute('SELECT * FROM `Person`', (error, results) => {
            if (error) {
                res.status(500);
            } else if (results) {
                res.status(200).json(results);
            }
        });
    }
}