const mongoose = require('mongoose');
const connectDB = require('../config/db');

const entrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
        required: false, // Allowing standalone entries
    }
});

module.exports = mongoose.model('Entry', entrySchema);
