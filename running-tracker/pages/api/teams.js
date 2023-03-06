const db = require('../../db/db_connection.js')

export default async function handler(req, res) {
    const { method } = req;
    const { body } = req;
    const [i, ifields, ie] = await db.execute("SELECT id FROM `Person` WHERE `Person`.email = ?", [body[0].email])
    const id = i[0].id;
    console.log("8");
    if (body[0].isGet) {
        const [teams, fields2, errors2] = await db.execute("SELECT teamName, teamCode FROM `Membership` JOIN `Team` ON `Team`.teamID = `Membership`.teamID WHERE `Membership`.userID = ?",
            [id]);
        console.log(teams);
        return res.status(200).json(teams);
    }

    else if (method === "POST") {
        const [r, f, e] = await db.execute("INSERT INTO `Team` (teamName, teamDesc, teamCode) VALUES (?,?,?)",
            [ body[0].name, body[0].desc, getTeamCode()]);
        if (e) {
            return res.status(500);
        }
        const [teams, fields2, errors2] = await db.execute("SELECT teamName, teamCode FROM `Membership` JOIN `Team` ON `Team`.teamID = `Membership`.teamID WHERE `Membership`.userID = ?",
            [id]);
        return res.status(200).json(teams);
    }

    else if (method === "UPDATE") {
        const [ti, tf, te] = db.execute("SELECT teamID FROM `Team` WHERE `Team`.teamCode = ?", [body[0].code]);
        const teamID = ti[0].teamID;
        const [r, f, e] = await db.execute("INSERT INTO `Membership` (userID, teamID) VALUES (?,?)",
            [ id, teamID ]);
    }
}

async function getTeamCode() {
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