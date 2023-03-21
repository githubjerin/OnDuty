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
    authority: {
        type: String,
        required:true,
        enum: ["CLASS-INCHARGE", "ACADEMIC-HEAD", "HEAD-OF-DEPARTMENT"]
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: false
});

const faculty = mongoose.model('faculty', Schema);

export default faculty;