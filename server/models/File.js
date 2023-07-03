const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    downloadCount: {
        type: Number,
        required: true,
        default: 0
    },
    downloadURL: {
        type: String,
        required: true
    }
}, {timestamps: true})

const File = mongoose.model('file', FileSchema);

module.exports = File;