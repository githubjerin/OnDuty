import express from "express";
import isLoggedIn from "../middleware/isLoggedIn.middleware.js";
import on_duty_detail from "../models/on_duty_detail.js";
import path from "path";
import { error } from "console";

const router = express.Router();

router.get('/:filename', [isLoggedIn], async (req, res) => {
    /*try{
        if (req.user.register_number) {
            const od_detail = await on_duty_detail
                                                .find({ 
                                                    proof: req.params.filename
                                                })
                                                .select({
                                                    _id: 0,
                                                    proof: 1,
                                                    register_number: 1
                                                });
            if (od_detail[0].proof != undefined) {
                if(od_detail[0].register_number === req.user.register_number) {*/
                    res.status(200).sendfile(path.join(path.resolve('uploads'), req.params.filename/*od_detail[0].proof*/));
                /*} else {
                    res.status(400).json('File route failed #1');
                }
            } else {
                res.status(400).json('File route failed #2');
            }
        } else {
            res.status(400).json('File route failed #3');
        }
    } catch ( error ) {
        res.status(400).json(error);
    }*/
});

export default router;