import on_duty_detail from "../../models/on_duty_detail.js";
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
                        authority: {
                            department: 1,
                            year_of_study: 1,
                            section: 1
                        }, 
                        _id: 0 
                    });

        if ( authority[0].toString().length > 2 ) {
            //GETTING STUDENTS' REGISTER NUMBER
            const students = 
                await student
                    .find(authority[0].authority)
                    .select({
                        register_number: 1,
                        _id: 0
                    });

            //GETTING OD DETAILS
            var od_details = [];
            for (const each of students) {
                const od_detail = await on_duty_detail.find(each).select("-__v");
                if (od_detail[0]) {
                    od_details.push(od_detail);
                }
            }
            var result = [];
            for (const each of od_details) {
                for (const detail of each) {
                    result.push(detail);
                }
            }

        } else {
            res.status(400).json({ error: "Faculty is not an authority of any"});
        }

        res.json(result);
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