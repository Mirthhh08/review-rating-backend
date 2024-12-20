import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            media_metadata: true
        })
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

async function deleteFile(id) {
    try {
        if (!id) return null;
        const result = await cloudinary.uploader.destroy(id);
        console.log('Deleted image:', result);
        return result;
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
}

export { uploadOnCloudinary, deleteFile }
