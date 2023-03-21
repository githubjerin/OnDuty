import mongoose from "mongoose";

const Schema = mongoose.Schema({
    year_of_study: {
        type: Number
    },
    section: {
        type: String
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

const class_incharge = mongoose.model('class_incharge', Schema);

export default class_incharge;