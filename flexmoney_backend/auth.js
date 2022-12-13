const jwt = require('jsonwebtoken')
const User = require("./user_model")

async function authenticateToken(req, res, next){

    const token = req.headers['authorization']
    if(token == null) return res.status(401).send("Not Authorized")
    jwt.verify(token, "MySuperSecretKey123",(err, user)=>{
        if(err) return res.status(401).send("Cannot verify")
        req.user = user
        next()
    } ) 
}


module.exports = {
    authenticateToken
}