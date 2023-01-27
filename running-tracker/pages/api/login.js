const mysql = require('mysql2');
const db = require('../../db/db_connection.js')

export default async function handler(req, res) {
    let { method } = req;
<<<<<<< HEAD
    let body = { req };
=======
    let { body } =  req ;
    console.log(body);
    
    
>>>>>>> eff68dac89495477c1d84f01ecfb2a9035c11cdb

    if (method === 'POST') {
        // TODO: Check if the person's email is already in the database. If it is not, add them to the database.
    }

    return res.status(200).json("Hello");
}