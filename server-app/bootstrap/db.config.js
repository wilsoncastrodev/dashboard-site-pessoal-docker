import mongoose from "mongoose";
import winston from "winston";

(() => {
    const { DB_CONNECTION_URL } = process.env;
    mongoose.set('strictQuery', false);

    mongoose
        .connect(
            DB_CONNECTION_URL, 
            {
                useNewUrlParser: true, 
                useUnifiedTopology: true,
            }
        ).then(() => winston.info("MongoDb conectado com sucesso"));;
})();