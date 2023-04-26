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

// MONGOOSE HOOKS (PRE HOOK)
/*Schema.pre('save', async function (next) {
    //const salt = bcrypt.genSalt();
    console.log('hi');
    this.password = await bcrypt.hash(this.password, 10);
    console.log('hi');
    next();
});*/

const student = mongoose.model('student', Schema);

export default student;