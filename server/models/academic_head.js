import mongoose from "mongoose";

const Schema = mongoose.Schema({
    year_of_study: {
        type: Number,
    },
    department: {
        type: String,
    },
    faculty_code: {
        type: String
    }
}, {
    timestamps: true
});

const academic_head = mongoose.model('academic_head', Schema);

export default academic_head;