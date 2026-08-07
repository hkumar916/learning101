import express from "express";
import UserModel from "../models/user.model.js";
import { handleRouteError } from "../helpers/error-handling.js";

//import { registerValidation, handleValidationErrors, loginValidation } from "../validators/auth.validator.js";
import { generateToken } from "../helpers/jwt.js";


const router = express.Router();

router.post("/register", async (req, res) => {
  try {

    const { email } = req.body

    const existingUserByEmail = await UserModel.findOne({ email })
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: req.t("emailAlreadyExists")
      })
    }

    //const newUser = await UserModel.create(req.body);
    //const token = generateToken(user)
    const user = new UserModel(req.body);
    await user.save();
    res.status(201).json({
      success: true,
      message: req.t("userRegisteredSuccessfully"),
      data: user.toJSON(),
      token: "Yet to be created"//token
    });

  } catch (error) {
    handleRouteError(error, res)
  }
});

router.post("/login", async(req, res) => {
  try {

    const { email, password } = req.body
    const userData = await UserModel.findOne({ email })

    // if user is not exist 
    if (!userData) {
        return res.status(401).json({
          success: false,
          message: req.t("userNotFound"),
        });
      }

    const isPasswordCorrect = await userData.comparePassword(password)

    if(!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: req.t("incorrectPassword")
      })
    }

    const token = generateToken(userData)

    res.json({
      success: true,
      message: req.t("loginSuccessful"),
      data: {
        user: userData.toJSON(),
        token: token
      }
    })

  } catch (error) {
    handleRouteError(error, res)
  }
})

export default router
