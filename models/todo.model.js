const mongoose = require('mongoose');
const connectDB = require('../config/db');

const todoSchema = new mongoose.Schema({
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
    }
});

module.exports = mongoose.model('Todo', todoSchema);
