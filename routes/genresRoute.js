const express = require("express");
const router = express.Router();
const { 
    getAllGenres, 
    getGenre, 
    createGenre, 
    updateGenre, 
    deleteGenre 
} = require("../controllers/genresControllers")


router.get("/genres", getAllGenres);
router.get("/genre/:id", getGenre);
router.post("/genre/:movieId", createGenre);
router.put("/genre/:id", updateGenre);
router.delete("/genre/:id", deleteGenre);

module.exports = router;