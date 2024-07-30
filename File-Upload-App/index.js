//app create
const express = require("express");
const app = express();


//port find krna h
require("dotenv").config();
const PORT = process.env.PORT||3000;


//middleware add krna h
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles:true,
    tempFileDir: '/temp/'
}));


//db se connect
const db = require("./config/database");
db.connect();

//cloud se connect
const cloudinary = require("./config/cloudinary")
cloudinary.cloudinaryConnect();


//api route mount
const upload = require("./routes/FileUpload");
app.use('/api/v1/upload', upload);


//activate server
app.listen(PORT, () => {
    console.log(`app is running at ${PORT}`);
})