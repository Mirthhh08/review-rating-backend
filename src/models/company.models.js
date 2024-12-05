import mongoose from 'mongoose'
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        logo: {
            url: {
                type: String,
                required: true
            },
            public_id: {
                type: String,
                required: true
            }
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        founded: {
            type: Date,
            required: true
        },
        reviews: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Review'
        }],
        averageRating: {
            type: Number,
            default: 0
        },
    }
);
companySchema.plugin(mongooseAggregatePaginate)
export const Company = mongoose.model("Company", companySchema)
