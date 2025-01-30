const express = require("express");
const usersRoutes = require("./route/user")
const cabinsRoutes = require("./route/cabin");
const orderRoutes = require("./route/book");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("./config/database");
require('dotenv').config()

let port = process.env.PORT || 8000;


const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use("/uploads", express.static("uploads"));


app.use("/api/users", usersRoutes);
app.use("/api/cabins", cabinsRoutes);
app.use("/api/orders", orderRoutes);



app.listen(port, () => {console.log("server up and running at port 8000")});