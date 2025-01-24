const mongoose = require('mongoose');
const connectDB = require('../config/db');

const collectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    lists: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'List',
        default: [],
    }],
    notes: {
        type: String,
        required: false,
    },
})

module.exports = mongoose.model('Collection', collectionSchema);