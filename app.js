const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectdb = require("./config/db");
const errorHandler = require("./middlewares/errorMiddleware");
const app = express();
const PORT = process.env.PORT || 3000 ;

dotenv.config();
connectdb();

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(errorHandler);

// Routes
app.use("/appointment", require('./routes/appointment'))
app.use('/auth', require('./routes/auth'))
app.use('/', require('./routes/index'))



app.listen(PORT, console.log( `Server is running  on Port ${PORT}`));
