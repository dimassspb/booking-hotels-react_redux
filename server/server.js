import express from "express";
import { readdirSync } from "fs";
import cors from "cors";
import mongoose from "mongoose";
import config from "config";
const morgan = require("morgan");
require("dotenv").config();

const app = express();

// db connection
mongoose
    .connect(config.get('DATABASE'), {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Connection Error: ", err));

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); //

// route middleware
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

// const port = process.env.PORT || 8000;
const PORT = config.get("PORT") || 8000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
