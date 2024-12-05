import { Review } from '../models/reviews.model.js'
import mongoose, { isValidObjectId } from 'mongoose'
import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Company } from '../models/company.models.js'


const getCompanyReviews = asyncHandler(async (req, res) => {
    const { companyId } = req.params;
    if (!isValidObjectId(companyId)) {
        throw new ApiError(400, "Company id is not valid")
    }
    const company = await Company.findById(companyId)

    if (!company) {
        throw new ApiError(404, "Company not found");
    }
    const reviews = await Review.aggregate([
        {
            $match: { companyId: new mongoose.Types.ObjectId(companyId) }
        }
    ]);

    res.status(200).json(
        new ApiResponse(200, reviews, "Reviews fetched successfully")
    );
});


const addReview = asyncHandler(async (req, res) => {

    const { name, subject, reviewText, rating, companyId } = req.body;



    if (!(name && subject && reviewText && rating)) {
        throw new ApiError(400, "Please add all the information");
    }

    if (!isValidObjectId(companyId)) {
        throw new ApiError(400, "Company id is not valid")
    }

    if (rating < 1 || rating > 5) {
        throw new ApiError(400, "Rating must be between 1 and 5");
    }

    const company = await Company.findById(new mongoose.Types.ObjectId(companyId));

    if (!company) {
        throw new ApiError(404, "Company Not Found");
    }

    const review = await Review.create({
        companyId: company?._id,
        name: name,
        rating: Number(rating),
        subject: subject,
        reviewText: reviewText,
    });

    if (!review) {
        throw new ApiError(500, "Something went wrong");
    }

    let updatedRating

    if (company.averageRating == 0) {
        updatedRating = review.rating
    } else {
        updatedRating = Math.ceil((company.averageRating + review.rating) / 2);

    }
    const updateResponse = await Company.findByIdAndUpdate(
        companyId,
        {
            $addToSet: { reviews: review._id },
            $set: { averageRating: updatedRating },
        },
        { new: true }
    );
    if (!updateResponse) {
        throw new ApiError(500, "Failed to update company with review");
    }

    res.status(201).json(
        new ApiResponse(200, review, "Review added successfully")
    );
});

export { getCompanyReviews, addReview }
