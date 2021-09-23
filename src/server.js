require('dotenv').config()
const express = require('express')
const path = require('path')
const routes = require('./routes')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const port = process.env.PORT | 3000
app.use(routes)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname,"public")));
app.listen(port,()=> console.log(`server running on port: ${port}`))