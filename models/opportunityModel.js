const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['Career Advice', 'Resume Review', 'Mock Interview'], required: true },
    status: { type: String, enum: ['submitted', 'approved', 'denied'], default:'submitted'},
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
    requestor:{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    comments : { type: String}
});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

module.exports = Opportunity;
