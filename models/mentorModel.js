const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    expertise: { type: String, required: true },
    email: { type: String, required: true },

});

const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;
