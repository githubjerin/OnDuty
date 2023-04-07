import student from "../../models/student.js";
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
        const newStudent = await student.create(req.body);

        newStudent.save().then(() => console.log("Student added"));
        res.json(newStudent);
    } catch (error) {
        res.status(400).json({ error });
    }
});
/*  END OF SECTION - I  */

/*  SECTION - II : AUTHENTICATION    */
router.post('/login', async (req, res) => {
    try{
        const student_detail = await student.findOne({ register_number: req.body.register_number });

        if (student_detail) {

            const valid = await bcrypt.compare(req.body.password, student_detail.password)
            if (valid) {

                const token = jwt.sign({ register_number: req.body.register_number }, process.env.SECRET);
                res.status(200).json({
                    token: token,
                });

            } else {
                res.status(401).json({
                    error: "invalid password",
                });
            }

        } else { 
            res.status(401).json({
                error: "invalid register numeber",
            });
        }

    } catch (error){
        res.status(400).json({ error });
    }
});
/*  END OF SECTION - II  */

export default router;