import express from "express";
// import sql from "./db.js";
import { spawn } from "child_process";
import { v4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const data = {};

const manageProcess = (process, id, responser) => {
  let buffer = "";
  process.stdout.on("data", (responseData) => {
    buffer += responseData;
    console.log(`stdout: ${responseData}`);
  });

  process.on("close", (code) => {
    console.log("close:", code);
    console.log(buffer);
    if (code === 0) {
      if (responser) {
        data[id] = { ...data[id], response: buffer, done: true };
      } else {
        data[id] = {
          ...data[id],
          classification: +JSON.parse(buffer)["response"],
        };
      }
    }
  });

  process.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
};

app.get("/", async (req, res) => {
  // select all from mails table
  // const mails = await sql`SELECT * FROM mails`;
  const mails = Object.keys(data).map((x) => ({ key: x, ...data[x] }));
  res.json(mails);
});

app.get("/process_mail", async (req, res) => {
  const { body, subject, from, to } = req.query;
  if (!body || !subject || !from || !to) {
    res.status(400).json({ msg: "Missing parameters" });
  }
  const id = v4();

  // await sql`
  // INSERT INTO mails (id, body, subject, from, to)
  // VALUES
  // (${id}, ${body}, ${subject}, ${from}, ${to})
  // `;
  data[id] = { body, subject, from, to, done: false };

  console.log(data[id]);
  const classifierProcess = spawn("python3", [
    "process_mail.py",
    "classifier",
    `${JSON.stringify({ body, subject, from, to })}`,
  ]);
  manageProcess(classifierProcess, id);

  const responserProcess = spawn("python3", [
    "process_mail.py",
    "responser",
    `${JSON.stringify({ body, subject, from, to })}`,
  ]);
  manageProcess(responserProcess, id, true);

  res.json({ id, msg: "Mail processing started" });
});

app.listen(3000, () => console.log("Server ready"));
