const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectdb = require("./config/db");
const app = express();
const PORT = 3000;

dotenv.config();
connectdb();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => res.render("index"));

app.listen(PORT, console.log( `Server is running  on Port ${PORT}`));
