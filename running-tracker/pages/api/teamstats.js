const db = require('../../db/db_connection.js')

export default function handler(req, res) {
    let {method} = req;
    console.log("here");
    if (method === "POST") {
        let {body} = req;
        if (body.isGet) {
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
            console.log("here");
            if (errors) {
                return res.status(500);
            } else {
                return res.status(200);
            }
        }
        else if(body.isLeave){
            db.execute('delete from Membership where userID = ? and teamID = ?',[body.ID,body.teamID])
            return res.status(200);
        }
    }
}