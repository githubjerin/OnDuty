import mongoose from "mongoose";

const schema = mongoose.Schema({
    register_number: {
        type: Number,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: false
    },
    start_date: {
        type: Date,
        requried: true
    },
    end_date: {
        type: Date,
        requried: true
    },
    outcome: {
        type: String,
        enum : ['PARTICIPATED', 'WINNER', 'RUNNER', 'RUNNER-UP', 'NIL'],
        default: "NIL"
    },
    proof: {
        type: String
    },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'NOT-APPROVED'],
        default: "PENDING"
    }
});

const on_duty_detail = mongoose.model('on_duty_detail', schema);

export default on_duty_detail;