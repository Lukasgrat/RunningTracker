const db = require('../../db/db_connection')

export default async function handler(req, res) {
    let { method } = req;

    if (method === 'POST') {
        let { body } =  req;
        db.execute('SELECT * FROM `Person` WHERE Person.email = ?', [body.email], (error, results) => {
            if (error) {
                res.status(500);
            } else if (results) {
                console.log(results);
                res.status(200).json(results);
            }
        });
    }
}