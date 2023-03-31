const asyncHandler = require("express-async-handler");
const Rental = require("../model/rentalModel");
const Customer = require("../model/customerModel");
const Movie = require("../model/movieModel");


//@desc Get all Rental
//@route GET /api/v1/rentals
const getAllRentals = asyncHandler(async (req, res) => {
    //validation for rental documents
    const rentals = await Rental.find().sort("dateOut");
    if (rentals.length === 0) {
        res.status(404);
        throw new Error("No rental is currently available")
    }
    res.status(200).json(rentals);
});

//@desc Get a rental
//@route GET /api/v1/rental/:id
const getRental = async (req, res) => {

    try {
        const rental = await Rental.findById(req.params.id);
        if (!rental) {
            res.status(404);
            throw new Error("Rental not found");
        }
        await rental.populate("customer", { name: 1, _id: 0 });
        await rental.populate("movie", { title: 1, _id: 0 });
        res.status(200).json(rental);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: "This  rental is not found" });
    }

};

//@desc Create a new rental
//@route POST /api/v1/rental/:customerId/:movieId
const createRental = asyncHandler(async (req, res) => {
    //checking to see if this customer  exists
    const customer = await Customer.findById(req.params.customerId);

    //throwing an error if customer doesn't exist
    if (!customer) {
        res.status(404);
        throw new Error("This customer was not found");
    }

    //checking to see if movie available for rental
    const movie = await Movie.findById(req.params.movieId);
    if (movie.numberInStock === 0) {
        res.status(404);
        throw new Error("This movie is currently out of stock...check later")
    }

    //create a new rental
    const { dateOut, dateReturned, rentalFee } = req.body;
    if (!dateReturned || !rentalFee) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const newRental = await Rental.create(
        {
            customer,
            movie,
            dateOut,
            dateReturned,
            rentalFee
        }
    );
    
    //updating the numberInStock and dailyRentalRate of a document
    //in the movie collection after creating a rental
    await Movie.updateOne({ _id: movie.id }, { $inc: { numberInStock: -1, dailyRentalRate: 1 } })
    res.status(201).json(newRental);
});

//@desc Update a rental
//@route PUT /api/v1/rental/:id
const updateRental = asyncHandler(async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental) {
        res.status(404);
        throw new Error("No rental found!")
    }
    const updatedRental = await Rental.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedRental);

});

//@desc Deleting a rental
//@route DELETE /api/v1/rental/:id
const deleteRental = asyncHandler(async (req, res) => {
    //checking if the rental exists
    const rental = await Rental.findById(req.params.id);
    if (!rental) {
        res.status(404);
        throw new Error("this genre doesn't exist")
    }
    await Rental.deleteOne();
    res.status(200).json(rental);
});

module.exports = {
    getAllRentals,
    getRental,
    createRental,
    updateRental,
    deleteRental
}