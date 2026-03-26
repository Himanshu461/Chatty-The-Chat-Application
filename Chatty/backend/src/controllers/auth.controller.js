import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";   //profile photo upload
import { generateToken } from "../lib/util.js";  //Login/signup ke baad JWT token cookie me set karta hai
import User from "../models/user.model.js"; //MongoDB user schema

// --------------------- SIGNUP ---------------------
export const signup = async (req, res) => { 
    const { email, fullName, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        // FIRST save user
        await newUser.save();

        // THEN generate token
        genereateToken(newUser._id, res);  //Login ke bina hi signup user ko auto-login kar deta hai

        return res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
        });

    } catch (error) {
        console.log("Error in Signup Controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


// --------------------- LOGIN ---------------------
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        genereateToken(user._id, res);

        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.log("Error in login Controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


// --------------------- LOGOUT ---------------------
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


// --------------------- UPDATE PROFILE ---------------------
export const updateProfile = async (req, res) => { 
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile picture is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        return res.status(200).json(updatedUser);

    } catch (error) {
        console.log("Error in update profile:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


// --------------------- CHECK AUTH ---------------------
export const checkAuth = (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
