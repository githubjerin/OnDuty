import mongoose from "mongoose";

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

const faculty = mongoose.model('faculty', Schema);

export default faculty;