import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import studentRouter from "./routes/student/student.route.js";
import odRouterStudent from "./routes/student/ODdetail.route.js";
import facultyRouter from "./routes/faculty/faculty.route.js";
import odRouterFaculty from "./routes/faculty/ODdetail.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
    credentials: true, 
    origin: [process.env.CORS_ACCEPTED_ORIGIN_1]
}));
app.use(json());
app.use(morgan("tiny"));
app.use(cookieParser());

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
mongoose.connection.once('open', () => {
    console.log("Connection Established Successfully");
});

app.listen(port, () => {
    console.log(`Server is active on port : ${port}`);
});

app.get('/', (req, res) => {
    res.send("Test");
});

app.use("/student", studentRouter);
app.use("/od-application", odRouterStudent);
app.use("/faculty", facultyRouter);
app.use("/od-approval", odRouterFaculty);