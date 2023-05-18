const db = require('../../db/db_connection')

export default async function handler(req, res) {
  const { method } = req;
  let { body } = req;
  let picture = body[0].pic;
  let id = body[0].id;
  if (method === "POST") {
    const [r, f, e] = await db.execute(`UPDATE Person SET profilePicture = ? WHERE Person.id = ?`, [picture, id]);
    if (e) {
      res.status(500).send(e);
    }
    console.log(r);
    const [rows, fields, errors] = await db.execute("SELECT profilePicture FROM Person WHERE Person.id = ?", [body[0].id]);
    if (errors) {
      res.status(500).send(errors);
    }
    res.status(200).send(rows);
  }
}
