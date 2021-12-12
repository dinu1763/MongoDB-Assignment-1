const express = require("express");
const User = require("../model/user.model");
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post("/",
body("first_name").notEmpty().withMessage("First Name is Required!"),
body("email").isEmail().withMessage("Valid Email is Required!"),
body("pincode").isLength({min:6, max:6}).withMessage("Pincode with 6 digits only"),
body("age").isLength({min:18, max:99}).withMessage("Age is Required!"),
body("gender").notEmpty().withMessage("Gender is Required!"),
async (req, res)=>{
    console.log(body("first_name"));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.create(req.body);
        return res.status(201).json({user});
    } catch (e){
        return res.status(500).json({status: "failed", message: e.message});
    }

});




module.exports = router;