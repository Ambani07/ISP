const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name : {type: String, required: true, max: [128, 'Too long, max is 128 characters']},
    surname: {type: String, required: true, max: [128, 'Too long, max is 128 characters']},
    email: {type: String, required: true},
    company: {type: String, required: true, lowercase: true},
    product: {type: String, required: true, lowercase: true},
    term: Number,
    createdAt: {type: Date, default: Date.now },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
}, {collection: "Customer"});

module.exports = mongoose.model('Customer', customerSchema);