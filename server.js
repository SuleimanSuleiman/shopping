require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const RouteingUsers = require('./routes/users')
const RouteingAuth = require('./routes/auth')
const RouteingCard = require('./routes/card')
const RouteingProduct = require('./routes/product')
const RouteingStats = require('./routes/stats')
const cookieParser = require('cookie-parser')
const path = require('path')


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log(`connect with mongodb`)
    } catch (err) {
        throw Error('error in connect with database')
    }
}

mongoose.connection.on('disconnected', () => {

    console.log('disconnect database')
})

mongoose.connection.on('connected', () => {

    console.log('connect mongodb')
})

app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.json())
app.use(cookieParser())



app.use('/api/users', RouteingUsers)
app.use('/api/auth', RouteingAuth)
app.use('/api/card', RouteingCard)
app.use('/api/product', RouteingProduct)
app.use('/api/stats', RouteingStats)


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || 'error'
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
    })
})

app.listen(process.env.PORT, () => {
    connect()
    console.log('Connect with Backend')
})