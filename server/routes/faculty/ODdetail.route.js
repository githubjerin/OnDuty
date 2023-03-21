import on_duty_detail from "../../models/on_duty_detail.js";
import class_incharge from "../../models/class_incharge.js";
import head_of_department from "../../models/head_of_department.js";
import academic_head from "../../models/academic_head.js";
import student from "../../models/student.js";
import faculty from "../../models/faculty.js";
import express from "express";
import dotenv from "dotenv";
import isLoggedIn from "../../middleware/isLoggedIn.middleware.js";

const router = express.Router();
dotenv.config();

/* READ - LIST ALL ONDUTY ENTRIES */
router.get('/', isLoggedIn, async (req, res) => {
    try {
        const { faculty_code } = req.user;

        //FINDING FACUTY AUTHORITY
        const authority = 
            await faculty
                    .find({ faculty_code: faculty_code })
                    .select({ 
                        authority: 1, 
                        _id: 0 
                    });
        
        //GETTING STUDENT FILTER FROM RESPECTIVE AUTHORITY
        var filter;
        if (authority[0].authority == "CLASS-INCHARGE") {
            filter = 
                await class_incharge
                    .find({ faculty_code: faculty_code })
                    .select({
                        year_of_study: 1,
                        section: 1,
                        department: 1,
                        _id: 0
                    });
        } else if (authority[0].authority == "ACADEMIC-HEAD") {
            filter = 
                await academic_head
                    .find({ faculty_code: faculty_code })
                    .select({
                        year_of_study: 1,
                        department: 1,
                        _id: 0
                    });
        }else if (authority[0].authority == "HEAD-OF-DEPARTMENT") {
            filter = 
                await head_of_department
                    .find({ faculty_code: faculty_code })
                    .select({
                        year_of_study: 1,
                        department: 1,
                        _id: 0
                    });
        } else {
            res.res.status(400).json({ error: "Invalid Authority" })
        }

        //GETTING STUDENTS' REGISTER NUMBER
        const students = 
            await student
                .find(filter[0])
                .select({
                    register_number: 1,
                    _id: 0
                });

        //GETTING OD DETAILS
        var od_details = [];
        for (const each of students) {
            const od_detail = await on_duty_detail.find(each).select("-__v");
            if (od_detail[0]) {
                od_details.push(od_detail[0]);
            }
        }

        res.json(od_details);
    } catch(error) {
        res.status(400).json({ error: error });
    }
});

/* UPDATE - MAKE CHANGES TO EXISTING ENTRY ( OUTCOME & PROOF ) */
router.post('/modify-entry/:id', async (req, res) => {
    try {
        on_duty_detail
            .findById(req.params.id)
            .then((updatedEntry) => {
                updatedEntry.status = req.body.status;

                updatedEntry
                    .save()
                    .then(() => {
                        console.log("Details Updated");
                        res.json({ updatedEntry });
                    })
                    .catch((error) => res.status(400).json({ error }));
            });
    } catch(error) {
        res.status(400).json({ error });
    }
});

export default router;