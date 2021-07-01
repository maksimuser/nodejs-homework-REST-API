const multer = require('multer');
const path = require('path');
require('dotenv').config();

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const fileName = req.user.id + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2097152,
  },
  fileFilter,
});

function fileFilter(req, file, cb) {
  if (file.mimetype.includes('image')) {
    cb(null, true);
    return;
  }
  cb(null, false);
}

module.exports = upload;
