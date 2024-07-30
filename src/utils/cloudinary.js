import {v2 as cloudinary} from "cloudinary";
import fs from "fs"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRATE
});


const uplodeOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // uplode the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",
        })
        // file has been uploded successfull
        consol.log("File is uploded on cloudinary",response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved tempory file as the uplode operation got faild
        return null;
    }
}

export {uplodeOnCloudinary}