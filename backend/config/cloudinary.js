import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
const uploadOnCloudinary=async(file)=>{
    try {
    cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});
 console.log("Uploading file:", file);
const result= await cloudinary.uploader
  .upload(file,{
    resource_type:'auto'
  }) 
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
        console.log("Cloudinary Success");
        console.log(result);

    return result.secure_url
    } catch (error) {

            if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
            console.log("Cloudinary Failed");

        console.log(error)
    }



}
export default uploadOnCloudinary