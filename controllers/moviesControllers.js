const asyncHandler = require("express-async-handler");
const Movie = require("../model/movieModel")

//@desc Get all Movies
//@route GET /api/v1/movies
const getAllMovies = asyncHandler(async (req, res) => {
    //checking the database for an array of movie objects
    const movies = await Movie.find();
    if (movies.length === 0) {
        res.status(404);
        throw new Error("No movies currently available")
    }

    res.status(200).json(movies);

});

//@desc Get a movie
//@route GET /api/v1/movie/:id
const getMovie = async (req, res) => {

    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            res.status(404);
            throw new Error("This movie was not found");
        }
        await movie.populate("genres", { name: 1, _id: 0 })
        res.status(200).json(movie);

    } catch (err) {
        console.error(err);
        res.status(404).json({ error: "An error occurred and no movie was found" });
    }
};

//@desc Create a movie
//@route POST /api/v1/movie
const createMovie = asyncHandler(async (req, res) => {
    const { title, genres, numberInStock, dailyRentalRate } = req.body;
    if (!title || !numberInStock || !dailyRentalRate) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const newMovie = await Movie.create(
        {
            title,
            genres,
            numberInStock,
            dailyRentalRate
        }
    );
    res.status(201).json(newMovie);

});

//@desc Update a movie
//@route PUT /api/v1/movie/:id
const updateMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
        res.status(404);
        throw new Error("this customer doesn't exist")
    }
    const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedMovie);

});

//@desc Deleting a Movie
//@route DELETE /api/v1/movie/:id
const deleteMovie = asyncHandler(async (req, res) => {
    //checking if the movie exists
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
        res.status(404);
        throw new Error("this customer doesn't exist")
    }
    await Movie.deleteOne();
    res.status(200).json(movie);
});

module.exports = {
    getAllMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie
};