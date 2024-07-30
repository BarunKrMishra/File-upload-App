const { cloudinaryConnect } = require("../config/cloudinary");
const File = require("../models/File");
const cloudinary = require("cloudinary").v2;


//localfileupload -> handler function
exports.localFileUpload = async (req,res)=> {
    try {
        
        //fetch file from request
        const file = req.files.file;
        console.log("FILES AAGYI HAI", file);

        //store file at path usko define jha kiya h
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("path->", path);

        //add path to the move function move wala function jruri hai btana 
        file.mv(path, (err)=>{
            console.log(err);
        });

        //create successfully responce
        res.json({
            success:true,
            message:"Local File Uploaded Successfuly",
        });

    } 
    catch (error) {
        console.log(error);

    }
}





//is function ko hum use kr rhe h ye btane ke liye ki given file type supported hai ya nhi
function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}






//is function ko hr jagh resue hoga for upload to cloudinary
async function uploadFileToCloudinary(file, folder,quality) {
    const options = {folder}
    console.log("temp file path", file.tempFilePath);

    if(quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";    //hume ye btana jruri hota hai hmesha
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}





//images upload ka handler
exports.imageUpload = async (req, res) => {
    try {
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes =  ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'file formated not supported',
            })
        };

        //file format supported hai uss case mein upload krenge
        const responce = await uploadFileToCloudinary(file, "VarunMishra");
        console.log(responce);

        //db ke anadr save krna hai entry
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:responce.secure_url,
        })
        res.json({
            success:true,
            imageUrl:responce.secure_url,
            message: "image successfully uploaded",
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:"something went rong",
        });
        
    }
}





//video upload ka handler
exports.videoUpload = async (req,res) => {
    try {
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name,tags,email);

        //video file leni h
        const file = req.files.videoFile;
        console.log(file);

        //validation
        const supportedTypes =  ["mov", "mp4"];
        const fileType = file.name.split('.')[1].toLowerCase();

        //kaam :- add a upper limit of 5mb for video

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'file formated not supported',
            })
        };


        //file format supported hai uss case mein upload krenge
        const responce = await uploadFileToCloudinary(file, "VarunMishra");
        console.log(responce);

        //db ke anadr save krna hai entry
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:responce.secure_url,
        })
        res.json({
            success:true,
            imageUrl:responce.secure_url,
            message: "video successfully uploaded",
        });
    } 
    catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:"something went rong",
        });
        
    }
}





exports.imageReducerUpload = async (req,res) => {
    try {
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name,tags,email);

        //image file leni h
        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes =  ["png", "jpg","jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase();

        //kaam :- add a upper limit of 5mb for video

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'file formated not supported',
            })
        };


        //file format supported hai uss case mein upload krenge
        const responce = await uploadFileToCloudinary(file, "VarunMishra",10);
        console.log(responce);

        //db ke anadr save krna hai entry
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:responce.secure_url,
        })
        res.json({
            success:true,
            imageUrl:responce.secure_url,
            message: "image successfully uploaded",
        });
        
    } 
    catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:"something went rong",
        });
        
    }
}
