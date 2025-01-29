const express = require("express");
const { fetchCabins, postCabin, deleteCabin, postInspirationCabin, fetchInspirationCabins, fetchOneCabin, fetchOneInspirationCabin, searchCabinByNameOrByPlace, updateCabin } = require("../controller/cabin");
const 
router = express.Router()


router.get("/getcabins", fetchCabins);
router.post("/inspirationcabin", postInspirationCabin);
router.get("/inspirationCabins", fetchInspirationCabins);
router.post("/cabin", postCabin);
router.delete("/:id", deleteCabin);
router.get("/getCabins/one/:id", fetchOneCabin);
router.get("/inspirationcabins/one/:id", fetchOneInspirationCabin);
router.post("/cabins/search", searchCabinByNameOrByPlace);
router.put("/cabins/editone/:id", updateCabin);

module.exports = router;
