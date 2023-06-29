const mongoose = require('mongoose');

const Employee = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    idNumber: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: false },
    email: { type: String, required: true, lowercase: true, index: { unique: true } },
    phoneNumber:  { type: String, required: true },
    password: { type: String, required: false },
    photoURL: { type: String, required: false },
    role: { type: String, required: true },
    status: { type: String, required: true },
    about: { type: String, required: true },
    dateJoined: { type: Date, required: true, default: () => Date.now(), immutable: true },
    updatedBy: { type: String, required: false },
    dateUpdated: { type: Date, required: false },
});

module.exports = mongoose.model('Employee', Employee);

// To set the value to an Object ID use this
// mongoose.SchemaTypes.ObjectId