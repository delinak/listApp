const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: false
    },
    tasks: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Entry',
        default: [],
    }],
    listCollection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
        required: false,
    },
});

module.exports = mongoose.model('List', listSchema);