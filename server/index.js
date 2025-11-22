// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 1. CONNECT TO MONGODB (Replace with your actual connection string)
// If using local MongoDB: 'mongodb://localhost:27017/mydatabase'
mongoose.connect('mongodb://localhost:27017/student_portal')
  .then(() => console.log("Connected to MongoDB Local"))
  .catch(err => console.error("Connection Error",err));

// 2. DEFINE USER SCHEMA ( The Structure of your Data )
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true } 
    // Note: In production, never store plain text passwords. Use bcrypt to hash them.
});

const UserModel = mongoose.model("users", UserSchema);

// 3. API ENDPOINT: REGISTER (Sign Up)
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.create({ email, password });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: "Email likely already exists" });
    }
});

// 4. API ENDPOINT: LOGIN
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            if (user.password === password) {
                res.json("Success");
            } else {
                res.json("Incorrect password");
            }
        } else {
            res.json("No user found");
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// START SERVER
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});