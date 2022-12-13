const express = require('express');
const { request } = require('http');
const mongoose = require('mongoose')
const User = require('./user_model')

const bcrypt = require("bcryptjs");

async function register (req, res){
    const us = await User.exists({email:req.body.email})
    console.log(us)
    if (us){
        console.log

    }
    const user = new User(req.body);
    user.payment = undefined
    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((e)=>{
        res.send(e);
    })

}

async function login (req, res){
    console.log(req.body)
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({email});
        const token = await user.generateAuthToken();
  
        const isMatch = await bcrypt.compare(password, user.password);
        if( isMatch ){
            res.status(200).json({"token": token, "status": "Authorised",  "userId": user._id, 'username': user.name });
        }else{
            res.status(401).send("Invalid Credentials");
        }
    }catch(error){
        res.status(401).send("Invalid Credentials")
    }
}

async function payment(req, res){
    try{
        const fee = req.body.fee
        const slot = req.body.slot
        const date = new Date()
        const user = await User.findById(req.user._id)
        user.payment.slot = slot
        user.payment.status = true
        user.payment.date = date.getMonth()
        user.save().then(()=>{
            res.status(200).send("Payment Done")
        }).catch((e)=>{
            res.status(404).send(e)
        })

    }catch(e){
        res.status(404).send(e)
    }
}

async function status(req, res){
    try{

        const user = await User.findOne({_id: req.user._id})
        const date = new Date()
        const month = date.getMonth()

        if (user.payment && user.payment.date == month  ){
            res.send({status: true})
        }else{
            user.payment = undefined
            user.save()
            res.send({status: false})
        }

    }catch(e){
        res.status(400).send(e)
    }
}

module.exports = {
    register,
    login,
    payment,
    status
}