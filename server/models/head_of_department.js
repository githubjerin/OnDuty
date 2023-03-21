import mongoose from "mongoose";

const Schema = mongoose.Schema({
    year_of_study: {
        type: Number
    },
    department: {
        type: String
    },
    faculty_code: {
        type: String
    }
}, {
    timestamps: true
});

const head_of_department = mongoose.model('head_of_department', Schema);

export default head_of_department;