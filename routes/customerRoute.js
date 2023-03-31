const express = require('express');
const router = express.Router();
const {
    getCustomers,
    createCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customerControllers');




router.route("/customers").get(getCustomers);

router.route("/customer").post(createCustomer);

router.route("/customer/:id").get(getCustomer);

router.route("/customer/:id").put(updateCustomer);

router.route("/customer/:id").delete(deleteCustomer);

module.exports = router