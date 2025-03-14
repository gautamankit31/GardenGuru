const mongoose=require('mongoose');
require("dotenv").config();

const DATABASE_URL=process.env.DATABASE_URL;
const dbConnect=()=>{
    mongoose.connect(DATABASE_URL)
    .then(()=>{
        console.log("DB connection succesful");
    })
    .catch((err)=>{
        console.log("DB connection failed", err);
        process.exit(1);
    })
}

module.exports={dbConnect};
