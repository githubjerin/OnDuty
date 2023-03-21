import mongoose from "mongoose";

const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    register_number: {
        type: Number,
        required: true,
        unique: true
    },
    year_of_study: {
        type: Number
    },
    department: {
        type: String
    },
    section: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: false
});

const student = mongoose.model('student', Schema);

export default student;