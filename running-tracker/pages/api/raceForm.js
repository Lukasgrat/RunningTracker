const db = require('../../db/db_connection')

export default async function handler(req, res) {
    let {method} = req;
    let {body} = req;
    if (method === 'POST') { 
        const [r, f, e] = await db.execute('SELECT * FROM Person WHERE Person.email = ?', [body.email]);
        if (e) {
            return res.status(500);
        } else if(r.length > 0){
            return res.status(200).json(r);}
}
}