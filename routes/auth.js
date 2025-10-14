import express from "express";
import bcrypt from "bcrypt";
import supabase from "../supabaseClient.js";

const router = express.Router();

// POST /auth/signup
router.post("/signup", async (req, res) => {
  const { name, email, password, profile_picture } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // 1️⃣ Hash the password
    const password_hash = await bcrypt.hash(password, 10);

    // 2️⃣ Insert into Supabase users table
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password_hash,
          profile_picture
        }
      ])
      .select(); // returns inserted row

    if (error) throw error;

    // 3️⃣ Respond with created user (without password)
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: data[0].id,
        name: data[0].name,
        email: data[0].email,
        profile_picture: data[0].profile_picture
      }
    });
  } catch (err) {
    // handle duplicate email
    if (err.message.includes("duplicate key value")) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

export default router;
