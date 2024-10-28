import User from "../Models/users.js";
import bcrypt from "bcryptjs"; // Ensure this import is correct
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// Signup User
export const signup = async (req, res) => {
  const { name, email, phone, Address, profile, password } = req.body;

  try {
    // Validation checks
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    // Check if the user already exists
    let user = await User.findOne({ email });
    console.log("User found:", user);

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    console.log("Before hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword, "hashedPassword");

    // Create new user
    console.log("Before creating user");
    user = new User({
      email,
      password: password,
      hashpassword: hashedPassword, // Store hashed password
    });
    console.log("User created");

    // Save the user to the database
    await user.save();
    console.log("After saving user, before generating token");

    // Generate token for verification
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Token generated");

    // Send verification email
    console.log("Before creating transporter");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Use env variables
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    console.log(
      "Transporter created",
      process.env.EMAIL,
      process.env.EMAIL_PASSWORD
    );

    const verificationUrl = `http://localhost:3000/verify/${token}`;
    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Account Verification",
      text: `Click the following link to verify your account: ${verificationUrl}`,
    };

    console.log("Before sending email");
    await transporter.sendMail(mailOptions);
    console.log("Email sent");

    // Respond to the client
    res.status(201).json({ msg: "User registered, verify your email" });
  } catch (err) {
    // Detailed error logging
    console.error("Error during signup:", err.message);
    res.status(500).send("Server error");
  }
};

// Login User

// Login Controller

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Log to see the password being compared
    console.log("Plain password:", password);
    console.log("Hashed password in DB:", user.password);

    // Compare the provided password with the hashed password in the DB
    const isMatch = password === user?.password;

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user?._id, email: user?.email }, // Add more fields if necessary
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return token and user details (if needed)
    return res.json({
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error("Error during login:", err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

// Verify User
export const verifyUser = async (req, res) => {
  const token = req.params.token;

  console.log(req.params, "req.params");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    console.log(user, "user");

    if (!user) return res.status(400).json({ msg: "Invalid token" });

    user.isVerified = true;
    await user.save();

    res.json({ msg: "Email verified successfully" });
  } catch (err) {
    res.status(400).json({ msg: "Invalid or expired token" });
  }
};
