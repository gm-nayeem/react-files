const multer = require('multer');
const createError = require('../utils/error');

// configure how the files are stored
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // where to store the file
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // allowable files
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "application/pdf" ||
    // file.mimetype === "application/powerpoint" ||
    // file.mimetype === "application/msword" ||
    // file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype === "application/zip"
    ) {
    cb(null, true);
  } else {
    cb(createError(422, "Unsupported file type"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

module.exports = upload;
