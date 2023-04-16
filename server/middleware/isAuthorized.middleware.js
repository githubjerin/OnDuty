import faculty from "../models/faculty.js";
import student from "../models/student.js";

const isAuthorized = async (req, res, next) => {
    let flag = true;
    try {
        const authority = await faculty.findOne({ faculty_code: req.user.faculty_code })
                                    .select({
                                        authority: {
                                            department: 1,
                                            year_of_study: 1,
                                            section: 1
                                        },
                                        _id: 0
                                    });
    
        if (!authority && !flag) {
            res.status(400).json({ Error: "Authority Not Found" });
            flag = false;
        }
        
        const register_number = req.body.register_number;

        if (!register_number && !flag) {
            res.status(400).json({ Error: "Register number not provided" });
            flag = false;
        }

        const student_detail = await student.findOne({ register_number })
                                        .select({
                                            year_of_study: 1,
                                            department: 1,
                                            section: 1,
                                            _id: 0
                                        });
                
        if (!student_detail && !flag) {
            res.status(400).json({ Error: "Student Not Found" });
            flag = false;
        }
        
        if ( authority.authority.section !== undefined && flag ) {
            if ( authority.authority.section !== student_detail.section ) {
                flag = false;
                res.status(400).json({ Error: "Not the authority of the student" });
            }
        } 

        if ( authority.authority.department !== undefined && flag ) {
            if ( authority.authority.department !== student_detail.department ) {
                flag = false;
                res.status(400).json({ Error: "Not the authority of the student" });
            }
        } 

        if ( authority.authority.year_of_study !== undefined && flag ) {
            if ( authority.authority.year_of_study !== student_detail.year_of_study ) {
                flag = false;
                res.status(400).json({ Error: "Not the authority of the student" });
            }
        } 

        if ( flag ) { next(); }
        else { res.status(400).json({ Error: "Not the authority of the student" }); }

    } catch (error) {
        res.status(400).json({ error });
    }
}

export default isAuthorized;