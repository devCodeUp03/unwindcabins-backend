const express = require("express");
const { fetchCabins, postCabin, deleteCabin, postInspirationCabin, fetchInspirationCabins, fetchOneCabin, fetchOneInspirationCabin } = require("../controller/cabin");
const 
router = express.Router()


router.get("/getcabins", fetchCabins);
router.post("/inspirationcabin", postInspirationCabin);
router.get("/inspirationCabins", fetchInspirationCabins);
router.post("", postCabin);
router.delete("/:id", deleteCabin);
router.get("/getCabins/one/:id", fetchOneCabin);
router.get("/inspirationcabins/one/:id", fetchOneInspirationCabin);

module.exports = router;
