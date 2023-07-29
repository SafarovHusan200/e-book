const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/uploadsImages",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 },
  fileFilter: function (file, cb) {
    checkFileTypes(file, cb);
  },
});

// check file types
function checkFileTypes(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: You can only upload image files");
  }
}
