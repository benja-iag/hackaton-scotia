import postgres from "postgres";
const uri =
  process.env.POSTGRES_CONNECTION || "postgres://root:root@localhost:5432/test";
const sql = postgres(uri); // will use psql environment variables

export default sql;
