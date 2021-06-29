//Env import
require("dotenv").config();

//Dependencies
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

const app = express();

//Middleware
app.use(morgan("dev"));
//app.use(helmet());
app.use(
    cors({
        origin: "http://localhost:3000",
        allowedHeaders: "Authorization",
    })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
require("./auth/passportConfig")(app);

//Open Dota routes
app.use("/api/v1", require("./routes/dotaRoutes"));

//Auth Routes
app.use("/auth", require("./routes/steamRoutes"));

module.exports = app;
