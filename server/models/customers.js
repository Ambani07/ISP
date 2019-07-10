const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name : {type: String, required: true, max: [128, 'Too long, max is 128 characters']},
    surname: {type: String, required: true, max: [128, 'Too long, max is 128 characters']},
    email: {type: String, required: true},
    city: {type: String, required: true, lowercase: true},
    street: {type: String, required: true, lowercase: true},
    region: {type: String, required: true, lowercase: true},
    contactPerson: {type: String, required: true, max: [128, 'Too long, max is 128 characters']},
    contactPersonPhoneNumber: {type: String, required: true, max: [10, 'Too long, max is 10 numbers']},
    contactPersonCellNumber: {type: String, required: true, max: [10, 'Too long, max is 10 numbers']},
    category: {type: String, required: true, lowercase: true},
    term: Number,
    createdAt: {type: Date, default: Date.now },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
}, {collection: "Customer"});

module.exports = mongoose.model('Customer', customerSchema);