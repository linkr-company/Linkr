import express from "express";
import bcrypt from "bcrypt";
import supabase from "../../supabaseClient.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, password, profile_picture } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Name, email, and password are required." });

    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    const password_hash = await bcrypt.hash(password, 10);

    const { data: newUser, error } = await supabase
      .from("users")
      .insert([{ name, email, password_hash, profile_picture }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;