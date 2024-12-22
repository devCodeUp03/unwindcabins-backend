const express = require("express");
const { bookCabin } = require("../controller/book");
const router = express.Router();

router.post("", bookCabin);

module.exports = router;
