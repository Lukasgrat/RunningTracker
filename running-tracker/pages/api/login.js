const mysql = require('mysql2');
const db = require('../../db/db_connection')

export default async function handler(req, res) {
    let { method } = req;

    if (method === 'POST') {
        let { body } =  req;
        db.execute("SELECT * FROM PERSON;", (error, results) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).json(results);
            }
        })
    }
}