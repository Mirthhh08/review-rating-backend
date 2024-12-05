import { Company } from "../models/company.models.js"
import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from '../utils/ApiError.js'
import { deleteFile, uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { isValidObjectId } from "mongoose"

const getAllCompanies = async (req, res) => {
    const { query, sortBy = 'createdAt'} = req.query;
    const sortType = (sortBy === 'name' || sortBy === 'city') ? 'asc' : 'desc';

    const match = query
        ? {
              $or: [
                  { address: { $regex: query, $options: "i" } }, 
                  { city: { $regex: query, $options: "i" } },
                  { name: { $regex: query, $options: "i" } }
              ]
          }
        : {};

    const companies = await Company.find(match)
        .sort({ [sortBy]: sortType === "asc" ? 1 : -1 });

    return res.status(200).json(
        new ApiResponse(200, companies, "Companies fetched successfully")
    );
};


const addCompany = asyncHandler(async (req, res) => {
    const { name, address, city, founded } = req.body

    if (!(name && address && city && founded)) {
        throw new ApiError(400, "Please add all the information")
    }


    const logoLocalPath = req.file?.path
    const logo = await uploadOnCloudinary(logoLocalPath);

    if (!logo) {
        throw new ApiError(500, "An error occurred while uploading to Cloudinary");
    }

    const companyObj = await Company.create({
        name: name,
        address: address,
        founded: founded,
        logo: {
            url: logo.url,
            public_id: logo.public_id,
        },
        city: city,
    });

    if (!companyObj) {
        throw new ApiError(500, "An error occurred while creating the company object");
    }

    res.status(200).json(
        new ApiResponse(200, companyObj, "Company Added Successfully")
    )

})

const getCompanyById = asyncHandler(async (req, res) => {
    const { companyId } = req.params

    if (!isValidObjectId(companyId)) {
        throw new ApiError(401, "Not a valid company id")
    }

    const company = await Company.findOne({ _id: companyId })

    if (!company) {
        throw new ApiError(400, "No company found")
    }

    res.status(200).json(
        new ApiResponse(200, company)
    )
})

export { getAllCompanies, addCompany, getCompanyById }