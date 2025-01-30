const express = require("express");
const cors = require("cors");
// const fileUpload =  require("express-fileupload"); this cannot be used while using multer
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();
app.use(express.json());
// app.use(fileUpload());
app.use(cors());
app.use("/uploads", express.static("uploads"));
const usersRoutes = require("../route/user");
require("../config/database");

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, "./uploads");
//   },
  
//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });

// let upload = multer({ storage });
// upload.single("image"),
// app.post("/signup",  async (req, res) => {
// try {
//     let imagePath = req.file.path.replaceAll("\\", "/");
//     let user = await userModel.create({ ...req.body, image: imagePath });
//     res.send(user);
//   } catch (error) {
//     res.send(error);
//   }
// });

app.use("/api/users", usersRoutes);

// app.delete("/signup/:id", async (req, res) => {
//   let matched = await userModel.findOne({_id: req.params.id})
//   if(matched){
//     await userModel.deleteOne({_id:req.params.id});
//     fs.unlink(path.join(path.resolve(), matched.image), (err, data) => {
//       console.log(err);
//     })
    
//   } else {
//     return res.send("No user found");
//   }
  
//   res.send("successfully deleted...");
// })


// app.get("/get-signup", async (req, res) => {
//   let users = await userModel.find({});
//   res.send(users);
// });

app.listen(8000, () => {
  console.log("The server is up and running on port 8000...");
});
console.log("Hello")


// mongoose.connect("mongodb://localhost:27017/unwindcabins");
// const userSchema = mongoose.Schema({
//   username: {
//     type: String,
//     // required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   age: {
//     type: Number,
//     // required: true,
//   },
//   gender: {
//     type: String,
//     // required: true,
//   },
//   image: {
//     type: String,
//     // required: true,
//   },
// });

// const userModel = mongoose.model("userModel", userSchema);