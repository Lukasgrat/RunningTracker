const db = require('../../db/db_connection.js')

export default async function handler(req, res) {
    const { method } = req;
    const { body } = req;
    console.log(body);
    const [i, ifields, ie] = await db.execute("SELECT id FROM `Person` WHERE `Person`.email = ?", [body.email]);
    const id = i[0].id;
    console.log(id);
    if (body.isGet) {
        const [teams, fields2, errors2] = await db.execute("SELECT teamName, teamCode FROM `Membership` JOIN `Team` ON `Team`.teamID = `Membership`.teamID WHERE `Membership`.userID = ?",
            [id]);
        console.log(teams);
        return res.status(200).json(teams);
    }

    else if (body.isUpdate) {
        console.log("1");
        const [ti, tf, te] = await db.execute("SELECT teamID FROM `Team` WHERE `Team`.teamCode = ?", [body.code]);
        console.log("2");
        const teamID = ti[0];
        const [r, f, e] = await db.execute("INSERT INTO `Membership` (userID, teamID) VALUES (?,?)",
            [ id, teamID ]);
        console.log("3");
    }

    else if (method === "POST") {
        let teamCode = await getTeamCode();
        const [r, f, e] = await db.execute("INSERT INTO `Team` (teamName, teamDesc, teamCode) VALUES (?,?,?)",
            [ body.name, body.desc, teamCode]);
        if (e) {
            return res.status(500);
        }
        console.log("there");
        const [teams, fields2, errors2] = await db.execute("SELECT teamName, teamCode FROM `Membership` JOIN `Team` ON `Team`.teamID = `Membership`.teamID WHERE `Membership`.userID = ?",
            [id]);
    console.log("there");
        return res.status(200).json(teams);
    }
}

async function getTeamCode() {
    console.log("here");
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i<6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const [r, f, e] = await db.execute('SELECT * FROM `Team` WHERE `Team`.teamCode = ?', [result]);
    if (r.length > 0) {
        result = await getTeamCode();
    }
    return result;
}