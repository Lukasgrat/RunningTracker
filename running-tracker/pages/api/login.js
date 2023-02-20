const db = require('../../db/db_connection')

export default async function handler(req, res) {
    let {method} = req;
    let {body} = req;
    if (method === 'POST') { 
        const [r, f, e] = await db.execute('SELECT * FROM Person WHERE Person.email = ?', [body.email]);
        if (e) {
            return res.status(500);
        } else if (r.length > 0) {
            return res.status(200).json(r);
        } else {      
            console.log("here");
            let [first, last] = body.name.split(" ");
            let id = await makeid();
            const [rows, fields, errors] = await db.execute('INSERT INTO Person (firstName, lastName, email, id) VALUES (?, ?, ?, ?)',
                                                    [first, last, body.email, id]);
            if (errors) {
                return res.status(500);
            } else {
                return res.status(200).json(rows);
            }
        }
    }
}

async function makeid() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i<11; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const [r, f, e] = await db.execute('SELECT * FROM Person WHERE Person.id = ?', [result]);
    if (r.length > 0) {
        result = await makeid();
    }
    return result;
}