import Router from "express";
import { upload } from "../middleware/multer.js";
import { getAllCompanies, addCompany, getCompanyById } from "../controllers/company.controller.js"

const router = Router()


router.route("/").get(getAllCompanies)
router.route("/add").post(upload.single("logo"), addCompany)
router.route("/:companyId").get(getCompanyById)


export default router