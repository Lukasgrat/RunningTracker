const db = require('../../db/db_connection')

export default async function handler(req, res) {
    let {method} = req;
    let {body} = req;

    if (method === 'POST') {
        return new Promise((resolve, reject) => {
            db.execute('SELECT * FROM Person WHERE Person.email = ?', [body.email], (error, results) => {
                if (error) {
                    res.status(500);
                    resolve();
                } else if (results.length > 0) {
                    res.status(200).json(results);
                    resolve();
                } else {
                    let [first, last] = body.name.split(" ");
                    db.execute('INSERT INTO Person (firstName, lastName, email) VALUES (?, ?, ?)',
                        [first, last, body.email], (error, results) => {
                            if (error) {
                                res.status(500);
                                resolve();
                            } else if (results.length > 0) {
                                res.status(200).json(results);
                                resolve();
                            }
                    });
                }
            });
        });
    }
}