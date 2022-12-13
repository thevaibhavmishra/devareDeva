const express = require("express")
const mongoose = require("mongoose")


const uri = `mongodb+srv://DevashishKhare:XlINXgrClBmgBkcU@cluster0.p9zxars.mongodb.net/?retryWrites=true&w=majority`



mongoose.connect(uri).then(()=>{console.log("Database connection successfull")} )
.catch((err) => console.log("No Connections "+err) );