const db = require('../../db/db_connection')

export default async function handler(req, res) {
    let { method } = req;
    let { body } = req;

    if (method === 'POST') {
        console.log(`${body.email} 8`);
        db.execute('SELECT * FROM Person WHERE Person.email = ?', [body.email], (error, results) => {
            if (error) {
                return res.status(500);
            } else if (results.length > 0) {
                return res.status(200).json(results);
            } else {
                let [first, last] = body.name.split(" ");
                console.log(`${first}, ${last}`)
                db.execute('INSERT INTO Person (firstName, lastName, email) VALUES (?, ?, ?)',
                           [first, last, body.email], (error, results) => {
                    if (error) {
                        return res.status(500);
                    } else if (results.length > 0) {
                        console.log(results);
                        return res.status(200).json(results);
                    }
                });
            }
        });
    }
}