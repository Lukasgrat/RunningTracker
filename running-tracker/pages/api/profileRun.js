const db = require('../../db/db_connection.js')

export default function handler(req, res) {
    let {method} = req;
    if (method === "POST") {
        let {body} = req;
        if (body.isUpdate) {
            //TODO: Return a list of members from the team and their stats
            const [rows, errors, fields] = db.execute(`select concat(Person.firstName, " ", Person.lastName) as name,
                                                              runTime,
                                                              runLength,
                                                              runDate
                                                       from Person
                                                                join Run
                                                                     on Run.userID = Person.id
                                                       where id in
                                                             (select userID
                                                              from Membership
                                                              where teamID = ?)`, [body.ID]);
            if (errors) {
                res.status(500);
            } else {
                res.status(200).json(rows);
            }
        }
        else if(body.isDelete){
            db.execute('delete from Run where runID = ?',[body.ID])
            res.status(200);
        }
    }
}