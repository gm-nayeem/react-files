const router = require('express').Router();
const {
    createFile, getFile, 
    allFile, removeFile
} = require('../controllers/fileController');
const upload = require('../middleware/upload');

router.post('/upload', upload.single('file'), createFile);
router.get('/single/:fileId', getFile);
router.get('/all', allFile);
router.delete('/:fileId', removeFile);

module.exports = router;