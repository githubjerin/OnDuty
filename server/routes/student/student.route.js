import student from "../../models/student.js";
import express from "express";
import dotenv from "dotenv";

import { createToken, comparePassword, maxAge } from "../../modules/jwt-auth.modules.js";

const router = express.Router();
dotenv.config();

/*  SECTION - I : USER CREATION    */
router.post('/signup', async (req, res) => {
    try {
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

            const valid = await comparePassword(req.body.password, student_detail.password)
            if (valid) {

                const token = createToken({ register_number: req.body.register_number });
                res.cookie('jwt', token, { httpOnly: true, maxAge: (maxAge * 1000) });
                res.status(200).json({
                    token: token
                });

            } else {
                res.status(401).json({
                    error: "invalid password"
                });
            }

        } else { 
            res.status(401).json({
                error: "invalid register numeber"
            });
        }

    } catch (error){
        res.status(400).json({ error });
    }
});
/*  END OF SECTION - II  */

export default router;