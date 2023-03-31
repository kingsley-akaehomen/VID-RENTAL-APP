const asyncHandler = require("express-async-handler");
const Genre = require("../model/genreModel");
const Movie = require("../model/movieModel");

//@desc Get all Genres
//@route GET /api/v1/genres
const getAllGenres = asyncHandler(async (req, res) => {
    //checking the database for an array of genre objects
    const genres = await Genre.find().sort("name");
    if (genres.length === 0) {
        res.status(404);
        throw new Error("No genre is currently available")
    }
    res.status(200).json(genres);
});

//@desc Get a Genre
//@route GET /api/v1/genre/:id
const getGenre = async (req, res) => {

    //checking to see if there is a genre in the database
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) {
            res.status(404);
            throw new Error("No genre was  found apparently");
        }
        await genre.populate("movies", { title: 1, _id: 0 });
        res.status(200).json(genre);

    } catch (err) {
        console.error(err);
        res.status(404).json({ error: "An error occurred and no genre was found" });
    }

};

//@desc Create a genre
//@route POST /api/v1/genre/:movieId
const createGenre = asyncHandler(async (req, res) => {
    //checking to see if this movie exists
    const movie = await Movie.findById(req.params.movieId);
    //throwing an error if movies doesnt exist
    if (!movie) {
        res.status(404);
        throw new Error("This movie was not found");
    }
    //checking if 'name' field is empty
    const { name, movies } = req.body;
    console.log(req.body);
    if (!name) {
        res.status(400);
        throw new Error("The name field is mandatory")
    }
    console.log("check from here")
    //creating a new genre and returning with the movie id 
    const newGenre = await Genre.create(
        {
            name: req.body.name,
            movies: movie._id
        }
    );

    //pushing the new genre created to genres array in the movie object
    movie.genres.addToSet(newGenre._id);
    movie.save();
    res.status(201).json(newGenre);
});

//@desc Update a genre
//@route PUT /api/v1/genre/:id
const updateGenre = asyncHandler(async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
        res.status(404);
        throw new Error("this genre doesn't exist")
    }
    const updatedGenre = await Genre.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedGenre);

});

//@desc Deleting a Genre
//@route DELETE /api/v1/genre/:id
const deleteGenre = asyncHandler(async (req, res) => {
    //checking if the genre exists
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
        res.status(404);
        throw new Error("this genre doesn't exist")
    }
    await Genre.deleteOne();
    res.status(200).json(genre);
});

module.exports = {
    getAllGenres,
    getGenre,
    createGenre,
    updateGenre,
    deleteGenre
};