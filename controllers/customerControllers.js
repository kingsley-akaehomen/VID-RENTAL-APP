const asyncHandler = require('express-async-handler');
const { constants } = require('../constants');
const Customer = require("../model/customerModel");

//@desc Get all customers
//@route GET /api/v1/customers
const getCustomers = asyncHandler(async (req, res) => {
    const customers = await Customer.find();
    if (customers.length === 0) {
        res.status(404);
        throw new Error("No registered customer yet")
    }
    res.status(200).json(customers);

});

//@desc Get a customer
//@route GET /api/v1/customer/:id
const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            res.status(constants.NOT_FOUND);
            throw new Error("Customer not found");
        }
        res.status(200).json(customer);
    } catch (err) {
        console.error(err);
        res.status(constants.NOT_FOUND).json({ error: "An error occurred while retrieving customer", message: err.message });
    }

};

//@desc Create a customer
//@route POST /api/v1/customer
const createCustomer = asyncHandler(async (req, res) => {
    const { name, isGold, phoneNumber } = req.body;
    if (!name || !phoneNumber) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const newCustomer = await Customer.create(
        {
            name,
            isGold,
            phoneNumber
        }
    );
    res.status(201).json(newCustomer);

});

//@desc Updating a customer
//@route PUT /api/v1/customer/:id
const updateCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        res.status(404);
        throw new Error("this customer doesn't exist")
    }
    const updatedCustomer = await Customer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedCustomer);

});

//@desc Deleting a customer
//@route DELETE /api/v1/customer/:id
const deleteCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        res.status(404);
        throw new Error("this customer doesn't exist")
    }
    await Customer.deleteOne();
    res.status(200).json(customer);
});

module.exports = {
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer
};