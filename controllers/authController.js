const { User } = require('../models')
const bcrypt = require('bcrypt')

// Signup function
const signup = async (req, res) => {
    try {
        const { first_name, last_name, email, username, password } = req.body
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!first_name?.trim()) {
            return res.status(400).json({ message: "First name cannot be empty" });
        }
        if (!last_name?.trim()) {
            return res.status(400).json({ message: "Last name cannot be empty" });
        }
        if (!email?.trim()) {
            return res.status(400).json({ message: "Email cannot be empty" });
        } else if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }
        if (!username?.trim()) {
            return res.status(400).json({ message: "Username cannot be empty" });
        }
        if (!password) {
            return res.status(400).json({ message: "Password cannot be empty" })
        } else if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Check if email exists
        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            return res.status(400).json({ message: "This email is already in use" })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            first_name,
            last_name,
            email,
            username,
            password: hashedPassword
        })
        res.status(200).json({ message: "Account has been created successfully", user })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Login function
const login = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username?.trim()) {
            return res.status(400).json({ message: "Please input your username" });
        }
        if (!password) {
            return res.status(400).json({ message: "Please input your password" });
        }

        // Find user
        const user = await User.findOne({ where: { username } })
        if (!user) {
            return res.status(401).json({ message: "Account does not exist." })
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(401).json({ message: "Incorrect password." })
        }

        req.session.userId = user.id

        req.session.save(err => {
            if (err) console.log(err)
            return res.json({ message: "Logged in successfully", userId: user.id })
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Logout function
const logout = (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.error(err)
                return res.status(500).json({ result: 500, error: "Logout failed" })
            }
            res.clearCookie("connect.sid")
            res.json({ result: 200, message: "Logout successful" })
        })
    } else {
        res.status(400).json({ message: "No active session" })
    }
}

module.exports = { signup, login, logout }