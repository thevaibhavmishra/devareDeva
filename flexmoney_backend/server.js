const cont = require("./form_controller")
const express = require("express")
const bodyparser = require('body-parser')
require("./database")
app = express()
const cors = require('cors')
app.use(cors());
app.use(bodyparser.json())
const auth = require("./auth")

app.post('/register',cont.register)

app.post('/login',cont.login)

app.post('/payment', auth.authenticateToken,cont.payment)

app.get('/status', auth.authenticateToken, cont.status)

app.listen(5000, (req, res)=>{
    console.log("connection has started")
})
