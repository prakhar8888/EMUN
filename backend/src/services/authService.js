import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../lib/prisma.js";


// ==============================
// GENERATE JWT TOKEN
// ==============================
export const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
};


// ==============================
// REGISTER USER
// ==============================
export const registerUserService = async ({
    fullName,
    email,
    password
}) => {

    // Check existing user
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
        data: {
            fullName,
            email,
            password: hashedPassword
        }
    });

    // Generate token
    const token = generateToken(user);

    // Return safe user data
    return {
        token,
        user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role
        }
    };
};


// ==============================
// LOGIN USER
// ==============================
export const loginUserService = async ({
    email,
    password
}) => {

    // Find user
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordMatch) {
        throw new Error("Invalid email or password");
    }

    // Generate token
    const token = generateToken(user);

    // Return safe user data
    return {
        token,
        user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role
        }
    };
};
