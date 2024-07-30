const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        // required:true
    },

    tags:{
        type:String
    },
    email:{
        type:String,
    }
});

//post middleware
fileSchema.post("save", async function(doc){
    try {
        console.log("doc",doc);

        //transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,               
            },
        });


        //mail send
        let info = await transporter.sendMail({
            from: `varunmishra-by golu`,
            to: doc.email,
            subject: "new file uploaded on cloudnariy",
            html: `<h2>Hello ji</h2> <p> file uploaded View here: <a href="${doc.imageUrl}"> ${doc.imageUrl}</a></p>`,
        })
        console.log("info",info);



    } 
    catch (error) {
        console.error(error);

    }
});



const File = mongoose.model("File", fileSchema);
module.exports = File;