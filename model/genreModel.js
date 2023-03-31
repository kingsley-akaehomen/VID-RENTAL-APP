const mongoose = require("mongoose");

const genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your genre name"]
    },
    movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    }]
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Genre", genreSchema);