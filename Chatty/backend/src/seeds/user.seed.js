import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

config();

const seedUsers = [
  // Female Users
  
  {
    email: "olivia.miller@example.com",
    fullName: "her💗",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    email: "sophia.davis@example.com",
    fullName: "Kylie jenner",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  
 
  {
    email: "mia.johnson@example.com",
    fullName: "Slim Shaddy",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
  },

  // Male Users
  {
    email: "james.anderson@example.com",
    fullName: "John Wick",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },

  {
    email: "william.clark@example.com",
    fullName: "Samba",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "benjamin.taylor@example.com",
    fullName: "OG",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "lucas.moore@example.com",
    fullName: "GodL",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  
  {
    email: "daniel.rodriguez@example.com",
    fullName: "Shooter",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();