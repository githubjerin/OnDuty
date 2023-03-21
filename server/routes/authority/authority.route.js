import academic_head from "../../models/academic_head.js";
import class_incharge from "../../models/class_incharge.js";
import head_of_department from "../../models/head_of_department.js";
import express from "express";
import dotenv from "dotenv";
import isLoggedIn from "../../middleware/isLoggedIn.middleware.js";

const router = express.Router();
dotenv.config();

/*  SECTION - I : AUTHORITY CREATION    */
router.post('/new-authority/:authority', isLoggedIn, async (req, res) => {
    try {
        const { faculty_code } = req.user;
        req.body.faculty_code = faculty_code;

        var newAuthority;
        if (req.params.authority == 'ci') {
            newAuthority = await class_incharge.create(req.body);
        } else if (req.params.authority == 'ah') {
            newAuthority = await academic_head.create(req.body);
        } else if (req.params.authority == 'hod') {
            newAuthority = await head_of_department.create(req.body);
        } else {
            console.log("Bad authority parameter");
            res.status(400).json("Bad authority parameter");
        }

        newAuthority.save().then(() => console.log("Authority added"));
        res.json(newAuthority);
    } catch (error) {
        res.status(400).json({ error });
    }
});
/*  END OF SECTION - I  */

export default router;