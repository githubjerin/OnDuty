import faculty from "../../models/faculty.js";
import express from "express";
import dotenv from "dotenv";

import { createToken, comparePassword, maxAge } from "../../modules/jwt-auth.modules.js";
import isLoggedIn from "../../middleware/isLoggedIn.middleware.js";

const router = express.Router();
dotenv.config();

/*  SECTION - I : USER CREATION    */
router.post('/signup', async (req, res) => {
    try {
        const newFaculty = await faculty.create(req.body);

        newFaculty.save().then(() => console.log("Faculty added"));
        res.json(newFaculty);
    } catch (error) {
        res.status(400).json({ error });
    }
});
/*  END OF SECTION - I  */

/*  SECTION - II : AUTHENTICATION    */
router.post('/login', async (req, res) => {
    try{
        const faculty_detail = await faculty.findOne({ faculty_code: req.body.faculty_code });

        if (faculty_detail) {

            const valid = await comparePassword(req.body.password, faculty_detail.password);
            if (valid) {

                const token = createToken({ faculty_code: faculty_detail.faculty_code });
                res.cookie('jwt', token, { httpOnly: true, maxAge: (maxAge * 1000) });
                res.status(200).json({ 
                    faculty_code: faculty_detail.faculty_code
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
                error: "invalid faculty code"
            });
        }

    } catch (error){
        res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
        res.status(400).json({ error });
    }
});
/*  END OF SECTION - II  */

router.get('/get-details', isLoggedIn, async (req, res) => {
    try {
        const faculty_detail = await faculty
                                        .findOne({ faculty_code: req.user.faculty_code })
                                        .select({
                                            authority: {
                                                department: 1,
                                                year_of_study: 1,
                                                section: 1
                                            }, 
                                            _id: 0,
                                            name: 1,
                                            faculty_code: 1
                                        });

        if (faculty_detail) {
            res.status(200).json(faculty_detail);
        } else { 
            res.status(400).json({ 
                error: "Faculty not found"
            });
        }

    } catch (error){
        res.status(400).json({ error });
    }
});

export default router;