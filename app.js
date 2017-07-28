var path = require("path");
var express = require("express");
var app = express();
var multer  = require('multer');
var upload = multer({ dest: './uploads/', limits: { fileSize: 500000 },
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, "tmp")
        }
    })
    });

app.use(express.static(path.join(__dirname, 'static')));

app.post("/upload", upload.single("fileToUpload"), (req, res) => {
    console.log(req.file);
    res.send({name: req.file.originalname, size: req.file.size});
})


app.use(function (req, res, next) {
    res.status(404).send("Page not found!")
})

app.listen((process.env.PORT || 3000), () => {
    console.log("Server up");
});