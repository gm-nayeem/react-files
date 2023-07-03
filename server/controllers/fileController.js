const File = require('../models/File')
const createError = require('../utils/error');

const createFile = async (req, res, next) => {
    const url = `http://localhost:${process.env.PORT}/api/files/single`;
    
    const fileObj = {
        path: req.file.path,
        name: req.file.originalname,
        size: req.file.size,
        downloadURL: url
    }

    try {
        const file = await File.create(fileObj);

        res.status(200).json(file);
    } catch (error) {
        console.error(error.message);
        next(error);
    }
}

const getFile = async (req, res, next) => { 
    try {
        const file = await File.findById(req.params.fileId);

        file.downloadCount++;

        await file.save();

        res.download(file.path, file.name);
    } catch (error) {
        console.error(error.message);
        next(error)
    }
}

const allFile = async (req, res, next) => {
    try {
        const files = await File.find().sort({createdAt: -1});

        res.status(200).send(files);
    } catch (err) {
        console.log(err.message)
        next(err);
    }
}

const removeFile = async (req, res, next) => {
    const id = req.params.fileId;

    try {
        await File.findByIdAndDelete(id);
        res.status(200).send('File deleted successfully!');
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createFile,
    getFile,
    allFile,
    removeFile
}