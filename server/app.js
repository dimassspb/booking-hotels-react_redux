const express = require("express");
const path = require("path");
const { readdirSync } = require("fs");
const cors = require("cors");
const morgan = require("morgan");
const config = require("config");
const mongoose = require("mongoose");

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

const PORT = config.get("port") || 8080

// const PORT = process.env.PORT || 8080;

// ***************************
if (process.env.NODE_ENV === "production") {
app.use("/", express.static(path.join(__dirname, "client")));

const indexPath = path.join(__dirname, "client", "index.html");

app.get("*", (req, res) => {
    res.sendFile(indexPath);
});
}
// ***************************

// app.use(express.static(path.join(__dirname, "client", "build")));
// // Right before your app.listen(), add this:
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

// if (process.env.NODE_ENV === "production") {
//     app.use("/", express.static("client/build"));

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "client/build/index.html"));
//     });
// }

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
