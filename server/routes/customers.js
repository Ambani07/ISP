const express = require('express');
const router = express.Router();
const Customer = require('../models/customers');

const UserCrl = require('../controllers/user');

router.get('/secret', UserCrl.authMiddleware , function(req, res){
    return res.json({"secret": true});
});

router.get('', function(req, res){
    Customer.find({}, function(err, foundCustomers){
        res.json(foundCustomers);
    })
});

router.get('/:id', function(req, res){
    const customerId = req.params.id;

    Customer.findById(customerId, function(err, foundCustomer){
        if(err){
            res.status(422).send({errors: [{title: 'Customer Error!', detail: 'Could not find customer'}]});
        }
        res.json(foundCustomer);
    })
})

module.exports = router;