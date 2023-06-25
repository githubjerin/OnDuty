import on_duty_detail from "../../models/on_duty_detail.js";
import express from "express";
import dotenv from "dotenv";
import isLoggedIn from "../../middleware/isLoggedIn.middleware.js";
import { upload } from "../../modules/file-handler.modules.js";
import fs from "fs";
import path from "path";

const router = express.Router();
dotenv.config();

/* CREATE - ADD NEW ONDUTY ENTRY */
router.post('/new-entry', [isLoggedIn, upload.single("proof")], async (req, res) => {
    try {
        const { register_number } = req.user;
        req.body.register_number = register_number;
        if (req.file !== undefined) {
            req.body.proof = req.file.filename;
        }

        const newEntry = await on_duty_detail.create(req.body);
        newEntry.save().then(() => console.log("OD details added"));
        res.json(newEntry);
    } catch(error) {
        res.status(400).json({ error })
    }
});

/* READ - LIST ALL ONDUTY ENTRIES */
router.get('/', isLoggedIn, async (req, res) => {
    try {
        const { register_number } = req.user;

        const entries = await on_duty_detail.find({ register_number: register_number });
        res.json(entries);
    } catch(error) {
        res.status(400).json({ error });
    }
});

/* UPDATE - MAKE CHANGES TO EXISTING ENTRY ( OUTCOME & PROOF ) */
router.post('/modify-entry/:id', [isLoggedIn, upload.single("proof")], async (req, res) => {
    try {
        const { register_number } = req.user;
        on_duty_detail
            .findById(req.params.id)
            .then(async (updatedEntry) => {
                if(updatedEntry.register_number != register_number) {
                    res.status(400).json({ 
                        error: "Malfunctioned Authentication",
                        cause: "Register number does not match with token"
                    });
                } else {
                    updatedEntry.outcome = req.body.outcome;
                    const { proof } = await on_duty_detail.findById(req.params.id).select({_id:0, proof:1});
                    if (req.file !== undefined) {
                        fs.unlink(path.join(path.resolve(), '/uploads', proof), (err) => {console.log(err)});
                        updatedEntry.proof = req.file.filename;
                    }

                    updatedEntry
                        .save()
                        .then(() => {
                            console.log("Details Updated");
                            res.json({ updatedEntry });
                        })
                        .catch((error) => res.status(400).json({ error }));
                }
            });
    } catch(error) {
        res.status(400).json({ error });
    }
});

/* DELETE - REMOVE ENTRIES */
router.get('/delete-entry/:id', isLoggedIn, async (req, res) => {
    try {
        const { proof } = await on_duty_detail.findById(req.params.id).select({_id:0, proof:1});
        fs.unlink(path.join(path.resolve(), '/uploads', proof), (err) => {console.log(err)});
        on_duty_detail
            .findByIdAndDelete(req.params.id)
            .then(() => res.json("Entry removed"));
    } catch(error) {
        res.status(400).json({ error });
    }
});

export default router;