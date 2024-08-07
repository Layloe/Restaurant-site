const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.PORT || 4242
require('dotenv').config()

const app = express()

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)

//Middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(express.static('public'))



const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', ()=> {
    console.log("Connected to MongoDB!")
})

//Define a schema and model for the form data
const contactSchema = new mongoose.Schema({
    name: String,
    people: Number,
    date: Date,
    message: String
})

const Contact = mongoose.model('Contact', contactSchema)

//Handle Form Submission Request
app.post('/submit', async (req,res) => {
    const formData = {
        name: req.body.Name,
        people: req.body.People,
        date: new Date(req.body.date),
        message: req.body.Message
    }
    try {
        const newContact = new Contact(formData)
        await newContact.save()
        res.redirect('/reservation')
    } catch (err) {
        res.redirect('/?error')
    }

})

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/reservation', (req,res) => {
    res.sendFile(__dirname + '/public/reservation.html')
})

//Start Server

app.listen(PORT, () => {
    console.log(`Server connected on ${PORT}`)
})