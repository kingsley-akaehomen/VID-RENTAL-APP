const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please input your name"]
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phoneNumber: {
        type: String,
        required: [true, "Please input your phone number"]
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Customer", customerSchema);