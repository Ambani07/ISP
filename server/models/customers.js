const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name : {type: String, required: true, max: [128, 'Too long, max is 128 characters']},
    surname: {type: String, required: true, max: [128, 'Too long, max is 128 characters']},
    email: {type: String, required: true},
    company: {type: String, required: true, lowercase: true},
    contactPersonName: {type: String, required: true, lowercase: true },
    contactPersonCellNo: {type: String, required: true},
    contactPersonPhoneNo: {type: String, required: true},
    address: {type: String, required: true},
    createdAt: {type: Date, default: Date.now },
    customerProductId: {type: Schema.Types.ObjectId, ref: 'Product'},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
}, {collection: "Customer"});

module.exports = mongoose.model('Customer', customerSchema);