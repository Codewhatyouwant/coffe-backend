import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uplodeOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res)=>{
    // get user details from frontend
    // Validation - not empty
    // Check if user already exists: username , email
    // Check for images, check for avatar
    // Uplode them to cloudinary, avatar
    // Create user object - Create entry in db
    // Remove password and refresh token field from response
    // check for user creation
    // Return res 
    
    const {fullname,username, email, password,} = req.body
    console.log("Email: ", email, "username:", username);

    if([fullname,email,username,password].some((field)=> field?.trim()==="")){
        throw new ApiError("Please fill all fields", 400)
    }
    const existedUser = User.findOne({
        $or: [{username}, {email}]
    })
    
    if(existedUser){
        throw new ApiError("Username or Email already exists", 409)
    }

    const avatarLocalPath = req.field?.avatar[0]?.path;
    const coverLocalPath = req.field?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400,"Avatar file is required")
    }

    const avatar = await uplodeOnCloudinary(avatarLocalPath)
    const coverImage = await uplodeOnCloudinary(coverLocalPath)

    if(!avatar){
        throw new ApiError(404,"Avatar file is required")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),

    })

    const createdUsername = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUsername){
        throw new ApiError(500, "Somthing want Wrong ")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUsername,"User Registerd Succesfully")
    )
    
    

})

export {registerUser}