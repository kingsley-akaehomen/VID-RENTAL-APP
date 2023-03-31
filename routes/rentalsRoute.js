const express = require("express");
const router = express.Router();
const {
    getAllRentals,
    getRental,
    createRental,
    updateRental,
    deleteRental
} = require("../controllers/rentalsControllers")

router.get("/rentals", getAllRentals);
router.get("/rental/:id", getRental);
router.post("/rental/:customerId/:movieId", createRental);
router.put("/rental/:id", updateRental);
router.delete("/rental/:id", deleteRental);

module.exports = router;