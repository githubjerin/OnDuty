import student from "../../models/student.js";
import express from "express";
import dotenv from "dotenv";

import { createToken, comparePassword, maxAge } from "../../modules/jwt-auth.modules.js";
import isLoggedIn from "../../middleware/isLoggedIn.middleware.js";
import isAuthorized from "../../middleware/isAuthorized.middleware.js";

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
                    register_number: req.body.register_number
                });

            } else {
                res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
                res.status(401).json({
                    error: "invalid password"
                });
            }

        } else { 
            res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
            res.status(401).json({
                error: "invalid register numeber"
            });
        }

    } catch (error){
        res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
        res.status(400).json({ error });
    }
});
/*  END OF SECTION - II  */

router.post('/get-details', [isLoggedIn, isAuthorized], async (req, res) => {
    const student_detail = await student.findOne({ register_number: req.body.register_number })
                                    .select({
                                        name: 1,
                                        year_of_study: 1,
                                        department: 1,
                                        section: 1,
                                        _id: 0
                                    });
    res.status(200).json(student_detail);
});

router.get('/get-details', isLoggedIn, async (req, res) => {
    const student_detail = await student.findOne({ register_number: req.user.register_number })
                                    .select({
                                        name: 1,
                                        year_of_study: 1,
                                        department: 1,
                                        section: 1,
                                        _id: 0
                                    });
    
    if (student_detail) {
        res.status(200).json(student_detail);
    } else { 
        res.status(400).json({ 
            error: "Student not found"
        });
    }
});

export default router;