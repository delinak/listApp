const mongoose = require('mongoose');
const connectDB = require('../config/db');

const entrySchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false,
    },
    list: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'List',
        required: true,
    }
});

module.exports = mongoose.model('Entry', entrySchema);
