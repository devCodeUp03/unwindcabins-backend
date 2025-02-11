const mongoose = require("mongoose");
require("dotenv").config();
// const url = "mongodb://localhost:27017/unwindcabins";
// mongoose.connect(url).then(()=> console.log("DB Connected!"));

mongoose
  .connect(
    process.env.DB_CONNECTION_STRING,
    {
      dbName: "unwindcabins", // Specify the name of the database you want to use
    }
  )
  .then(() => {
    console.log("DB CONNECTED"); // If the connection is successful
  })
  .catch((err) => console.log(err));
