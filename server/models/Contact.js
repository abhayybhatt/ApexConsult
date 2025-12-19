const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    city: { type: String, required: true },
    submittedAt: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Contact', contactSchema);