
import mongoose from "mongoose";

export function dbConnection() {

    mongoose.set("strictQuery", true);

    mongoose.connect(process.env.DB_CONNECTION).then(() => {

        console.log("database connection ESTABLISHED SUCCESSFULLY!");

    }).catch((err) => {

        console.log("SORRY.. database connection FAILED!!!", err);

    });
}