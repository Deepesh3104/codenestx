import express from "express";
import Connection from "./src/Db/db.js";
import "dotenv/config";

const app = express();

Connection()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.log("Error in connecting to database");
  });
