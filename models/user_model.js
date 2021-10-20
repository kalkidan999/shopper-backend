const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    hashed_password: {type: String, required: true},
    verified: {type: Boolean, required: true, default: false},
    address: {
        country: { type: String, required: false},
        region:  { type: String, required: false},
        city: { type: String, required: false},
        street1: { type: String, required: false},
        street2: { type: String, required: false},
        house_number: {type: String, required: false}
    }
}, { collection: 'customers' });

const user_model = mongoose.model("UserSchema", UserSchema)

module.exports = user_model;