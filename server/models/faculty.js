import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    faculty_code: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    authority: 
        {
            title: {
                type: String,
                required: false,
                enum: ["CLASS-INCHARGE", "ACADEMIC-HEAD", "HEAD-OF-DEPARTMENT"]
            },
            department: {
                type: String,
                required: false
            },
            year_of_study: {
                type: Number,
                required: false
            },
            section: {
                type: String,
                required: false
            },
        }    
}, {
    timestamps: false
});

// MONGOOSE HOOKS (PRE HOOK)
Schema.pre('save', function (next) {
    //const salt = bcrypt.genSalt();
    this.password = bcrypt.hash(this.password, 10);
    next();
});


const faculty = mongoose.model('faculty', Schema);

export default faculty;