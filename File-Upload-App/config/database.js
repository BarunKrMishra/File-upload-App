// const  mongoose = require("mongoose")

// require ("dotenv").config();

// exports.connect = () => {

//     mongoose.connect(process.env.MONGODB_URL, {
//         useNewUrlParser:true,
//         useUnifiedTopology:true,
//     })
//     .then(console.log("db connection succesfully"))
//     .catch ( (error) => {
//         console.log("DB Connection ISSUES");
//         console.error(error);
//         process.exit(1);
//     });
// }

const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () =>{
    mongoose.connect( process.env.MONGODB_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then( () => {
        console.log("db connected successfuly");
    })
    .catch( (err)=>{
        console.log("db conection issues");
        console.error(err);
        process.exit(1);
    });
}
