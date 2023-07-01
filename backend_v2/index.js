const express = require("express");
const sql = require("./db");

const app = express();

app.get("/", async (req, res) => {
  // select all from mails table
  const mails = await sql`SELECT * FROM mails`;
  res.json(mails);
});

app.listen(3000, () => console.log("Server ready"));
