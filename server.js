'use strict'

const express = require('express')
const app = express()
const PORT = process.env.port || 3000

require("dotenv").config()

let dbConnect = require("./dbConnect")
let userRoutes = require("./routes/userRoutes")
let championRoutes = require("./routes/championRoutes")
let abilityRoutes = require('./routes/abilityRoutes')
let archiveRoutes = require('./routes/archiveRoutes')
let listRoutes = require('./routes/listRoutes')
let authRoutes = require('./routes/authRoutes')

app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/champions', championRoutes)
app.use('/api/abilities', abilityRoutes)
app.use('/api/archives', archiveRoutes)
app.use('/api/lists', listRoutes)
app.use('/auth', authRoutes)

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my SQL application." })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})

