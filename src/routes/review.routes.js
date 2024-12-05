import Router from "express";
import { getCompanyReviews, addReview } from "../controllers/review.controller.js"

const router = Router()

router.route("/:companyId").get(getCompanyReviews)
router.route("/add").post(addReview)


export default router