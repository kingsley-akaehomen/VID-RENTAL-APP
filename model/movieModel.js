const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide title of movie"]
    },
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre"
    }],
    numberInStock: {
        type: Number,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Movie", movieSchema);