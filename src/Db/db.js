import "dotenv/config";
import mongoose from "mongoose";
import { Db_Name } from "../../constant.js";

const Connection = async () => {
  try {
    const response = await mongoose.connect(
      `${process.env.MONGODB_URL}/${process.env.Db_Name}`
    );
    console.log("Mongodb Connected Successfully", response.Connection.host);
  } catch (error) {
    console.log("Error in connecting with database", error);
    process.exit(1);
  }
};

export default Connection;
