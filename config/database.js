const mongoose = require("mongoose");
require("dotenv").config();
const url = "mongodb://localhost:27017/unwindcabins";
mongoose.connect(url).then(()=> console.log("DB Connected!"));

// mongoose
//   .connect(
//     "mongodb+srv://devashish:devashishUp03@cluster0.gurcn.mongodb.net/",
//     {
//       dbName: "unwindcabins", // Specify the name of the database you want to use
//     }
//   )
//   .then(() => {
//     console.log("DB CONNECTED"); // If the connection is successful
//   })
//   .catch((err) => console.log(err));
