const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/unwindcabins";
mongoose.connect(url).then(()=> console.log("DB Connected!"));