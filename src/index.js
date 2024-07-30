import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js"


dotenv.config({
    path: './env'
})

// Server canection
connectDB()

// Server Listen
.then(()=>{
    app.listen(process.env.PORT || 8000, () =>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db Connection failed in src/index.js ",err)
})




// First Approch 


// import express from "express";
// const app = express()
// (async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//         app.on("error", (error)=>{
//             console.error("Error connecting to MongoDB");
//             throw error
//         })
//         append.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.error("ERROR: ",error)
//         throw error
//     }
// })()