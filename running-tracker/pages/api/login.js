const mysql = require('mysql2/promise');

let connection;


async function setUpConnection() {
    connection = await mysql.createConnection({
        host: 'soccerdb.calingaiy4id.us-east-2.rds.amazonaws.com',
        user: 'lew_sch_teg',
        password: '8nXUKMHfVUtY',
        database: 'capstone_2223_5krun'
    });
}


export default async function handler(req, res) {
    const method = { req };
    const { body } = req;
    

    if (method === "GET") {
        // TODO?: Query DB: Select * from Person where Person.email = body.email and return that json
        const [rows, fields] = await connection.execute('SELECT * from `Person` where Person.email = body.email');
        return res.status(200).json(rows);
    }
    else if (method === "POST") {
        // TODO: Query DB to input user information. All information should be in body.
        //TODO?: Query the DB: Select * from Person where Person.email = body.email and return that json
        const [rows, fields] = await connection.execute('SELECT * from `Person` where Person.email = body.email');
    }
}

async function generateID() {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i <= 10; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    //TODO: Query DB: Select * from Person where Person.id = result
    //If the result is empty we can use that id for the person registering
}