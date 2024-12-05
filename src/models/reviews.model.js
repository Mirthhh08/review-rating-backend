import mongoose from 'mongoose'
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const reviewSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    subject: {
        type: String,
        required: true
    },
    reviewText: {
        type: String,
        required: true
    },
}, { timestamps: true });

reviewSchema.plugin(mongooseAggregatePaginate)
export const Review = mongoose.model('Review', reviewSchema);
