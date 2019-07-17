const express = require('express');
const router = express.Router();
const Customer = require('../models/customers');
const { normalizeErrors } = require('../helpers/mongoose');
const User = require('../models/user');
const Product = require('../models/products');
const UserCrl = require('../controllers/user');
const CustomerProduct = require('../models/customerProduct');
const mongoose = require('mongoose');

router.get('/secret', UserCrl.authMiddleware , function(req, res){
    return res.json({"secret": true});
});

router.get('',  function(req, res){
    Customer.find({}, function(err, foundCustomers){
        Product.find({}, function(err, foundProducts){
            return res.json([foundCustomers, foundProducts]);
        });
    });
});

router.get('/customers/products/:id', function(req, res){
    const productId = req.params.id;
    // console.log(productId);
    Customer.find({customerProductId: mongoose.Types.ObjectId(productId)}, function(err, foundProducts){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        console.log(foundProducts);
        return res.json(foundProducts);
    });
});

router.get('/customer-product-add', function(req, res){
    Product.find({}, function(err, foundProducts){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        return res.json(foundProducts);
    });
});

router.get('/:id', function(req, res){
    const customerId = req.params.id;
    const customerDetails = [];

    Customer.findById(customerId, function(err, foundCustomer){
        if(err){
            res.status(422).send({errors: [{title: 'Customer Error!', detail: 'Could not find customer'}]});
        }

        customerDetails.push(foundCustomer);

        User.findById(foundCustomer.user, function(err, foundCustomerUser){
            if(err){
                res.status(422).send({errors: [{title: 'Customer Product Error!', detail: 'Could not find customer product'}]});
            }

            customerDetails.push(foundCustomerUser);
        });

        CustomerProduct.findById(foundCustomer.customerProductId, function(err, foundCustomerProduct){
            if(err){
                res.status(422).send({errors: [{title: 'Customer Product Error!', detail: 'Could not find customer product'}]});
            }

            customerDetails.push(foundCustomerProduct);
    
            Product.findById(foundCustomer.productId, function(err, foundProduct){
                if(err){
                    res.status(422).send({errors: [{title: 'Customer Product Error!', detail: 'Could not find product'}]});
                }
    
                customerDetails.push(foundProduct);
        
                console.log(customerDetails);
        
                res.json(customerDetails);
            });
    
            // res.json(customerDetails);
        });
    });

});

router.post('/customer-product-add', function(req, res){
    const { customerDetails, productDetails } = req.body;
    const { name, surname, email, company, contactPersonName, contactPersonCellNo, contactPersonPhoneNo, address } = customerDetails;
    const { vlanId, productId, term, circuitNo, accessType, 
            accessSpeed, noIPs, totalBandwidth, localBandwidth,
            intBandwidth, teracoConnect, eiOption, prioritisation, 
            productName, username, accessUsername } = productDetails;

    const {userId} = req.body;

    const customer = new Customer({ name, surname, email, company, contactPersonName, contactPersonCellNo, contactPersonPhoneNo, address });
    const customerProduct = new CustomerProduct({ vlanId, productId, term, circuitNo, accessType, 
        accessSpeed, noIPs, totalBandwidth, localBandwidth,
        intBandwidth, teracoConnect, eiOption, prioritisation, 
        productName, username, accessUsername });

    
    // Customer.save
    

    Customer.create(customer, function(err, newCustomer){
        if(err){
            console.log('error creating customer');
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        // newCustomer.user = mongoose.Types.ObjectId(userId);

        this.customer = newCustomer;

        User.update({_id: userId}, {$push: {customers: newCustomer._id}}, function(){});
        
    });

    CustomerProduct.create(customerProduct, function(err, newCustomerProduct){
        if(err){
            console.log('error creating product');
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        // console.log(customer);
        this.customerProduct = newCustomerProduct;
        // console.log(customerProduct);

        Customer.update({_id: customer._id}, {customerProductId: mongoose.Types.ObjectId(newCustomerProduct._id)}, function(){});

        Customer.update({_id: customer._id}, {user: mongoose.Types.ObjectId(userId)}, function(){});

        return res.json(customerProduct);
    });

    
});

module.exports = router;