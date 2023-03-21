import faculty from "../../models/faculty.js";
import bcrypt from "bcryptjs";
import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const router = express.Router();
dotenv.config();

/*  SECTION - I : USER CREATION    */
router.post('/signup', async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const newFaculty = await faculty.create(req.body);

        newFaculty.save().then(() => console.log("Faculty added"));
        res.json(newFaculty);
    } catch (error) {
        res.status(400).json({ error });
    }
});
/*  END OF SECTION - I  */

/*  SECTION - II : AUTHENTICATION    */
router.get('/login', async (req, res) => {
    try{
        const faculty_detail = await faculty.findOne({ faculty_code: req.body.faculty_code });

        if (faculty_detail) {

            const valid = await bcrypt.compare(req.body.password, faculty_detail.password)
            if (valid) {

                const token = jwt.sign({ faculty_code: req.body.faculty_code }, process.env.SECRET);
                res.json({ token });

            } else {
                res.status(400).json({ error: "invalid password"});
            }

        } else { 
            res.status(400).json({ error: "invalid faculty code"});
        }

    } catch (error){
        res.status(400).json({ error });
    }
});
/*  END OF SECTION - II  */

export default router;