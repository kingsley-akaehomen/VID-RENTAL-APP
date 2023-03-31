const express = require("express");
const router = express.Router();

const { 
    getAllMovies, 
    getMovie, 
    createMovie, 
    updateMovie, 
    deleteMovie 
} = require("../controllers/moviesControllers")

router.get("/movies", getAllMovies);
router.get("/movie/:id", getMovie);
router.post("/movie", createMovie);
router.put("/movie/:id", updateMovie);
router.delete("/movie/:id", deleteMovie);

module.exports = router;