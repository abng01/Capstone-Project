'use strict'

const express = require('express')
const app = express()
const PORT = process.env.port || 3000
const session = require("express-session")

require("dotenv").config()

let dbConnect = require("./dbConnect")
let userRoutes = require("./routes/userRoutes")
let championRoutes = require("./routes/championRoutes")
let abilityRoutes = require('./routes/abilityRoutes')
let listRoutes = require('./routes/listRoutes')
let authRoutes = require('./routes/authRoutes')
let noteRoutes = require('./routes/noteRoutes')

app.use(express.json())
app.use(session({
  secret: "super-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: false, sameSite: "lax" }
}));
app.use('/api/users', userRoutes)
app.use('/api/champions', championRoutes)
app.use('/api/abilities', abilityRoutes)
app.use('/api/lists', listRoutes)
app.use('/auth', authRoutes)
app.use('/api/notes', noteRoutes)

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my SQL application." })
})

app.get("/me", (req, res) => {
  res.json({ userId: req.session.userId });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})

