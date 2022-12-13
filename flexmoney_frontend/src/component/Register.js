import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import {useState} from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import validator from 'validator'


function Register() {
    
    const Navigate = useNavigate();
    const NavigateToLogin = () => {
        Navigate('/Login');
      };
    const URL = process.env.REACT_APP_SERVER
    const [username,setusername] = useState("")
    const [password,setpassword] = useState("")
    const [email,setemail] = useState("")    
    const [Cpassword,setCpassword] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const [phone,setPhone] = useState("")
    const [age,setAge] = useState("")

    const [passFlag,setPassFlag] = useState(false)
    const validate = (value) => {
        
        if (validator.isStrongPassword(value, {
          minLength: 8, minLowercase: 1,
          minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setErrorMessage('')          
            setPassFlag(true)
        }
        else if(value==''){
            setErrorMessage('')
            setPassFlag(false)
        }
        else{
            setErrorMessage('Password is invalid')
            setPassFlag(false)
        }
        
      }

      function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }



    const handleSubmit = (e)=>{
        e.preventDefault();
        const data = {
            name:username,
            password:password,
            confirm_password:Cpassword,
            email:email,
            phone:phone,
            age:age
        }
        console.log(data)
        if (password !== Cpassword ){
            toast.error("Password didn't match")
        }
        else if (username.length<3){
            toast.error("Incorrect name")
        }
        else if(!passFlag){
            toast.error("Password must be 8 to 20 digit long and have atleast one uppercase, one lower case alphabet, one number and one special character ")
        }
        else if (!isValidEmail(email)) {
            toast.error('Email is invalid');
          } 
        else if(phone.length != 10){
            toast.error("Invalid Number")
        }else if(age<17 || age>65){
            toast.error("age must be between 18 to 65")
        }
        else{
            axios.post(`http://localhost:5000/register`,data).then(
                res=>{
                    console.log(res)
                        toast.success("registered")
                        NavigateToLogin()

                }
                ).catch(e=>{
                    toast.error(e.message)
                    console.log (e)
                })
        }
        
    }
    return (
        <div className="min-h-screen bg-white flex justify-center items-center">
           <div className="absolute top-28 left-64 w-96 h-96 mix-blend-multiply filter blur-2xl opacity-80 bg-purple-300 animate-blob rounded-full"></div>
        <div className="absolute top-28 right-64 w-96 h-96 mix-blend-multiply filter blur-2xl opacity-80 bg-pink-300 animate-blob animation-delay-2000 rounded-full"></div>
        <div className="absolute top-60 left-96 w-96 h-96 mix-blend-multiply filter blur-2xl opacity-80 bg-yellow-300 animate-blob animation-delay-4000 rounded-full"></div>
            <div className="py-12 px-12 bg-gray-100 rounded-2xl shadow-xl opacity-90 z-20">
                <div>
                    <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Register</h1>
                    <hr className='mb-4'/>
                    <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-900 tracking-wide cursor-pointer">Register and
                        enjoy all the services</p>
                </div>
                <form method='post'>
                <div className="space-y-4">
                    <input type="text" autoComplete='off' required placeholder="Full Name" maxLength="28" value={username.name} onChange={(e)=> setusername(e.target.value)} className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                    
                    <input type="number"  autoComplete='off' maxLength="2" placeholder="Age" value={age} onChange={(e)=> setAge(e.target.value)} className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                    
                    <input type="tel"  autoComplete='off' maxLength="10" placeholder="Phone" value={phone} onChange={(e)=> setPhone(e.target.value)} className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />

                    <input type="email" autoComplete='off' required placeholder="Email Address" maxLength="40" value={email.email} onChange={(e)=> setemail(e.target.value)} className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"  />
                    
                    <input type="password" 
                        autoComplete='off' 
                        placeholder="Password" 
                        maxLength="20" 
                        minLength="6" 
                        value={password.password} 
                        onChange={(e)=> {
                            validate(e.target.value)
                            setpassword(e.target.value)
                            }} 
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"  />
                        <br />
                        {errorMessage === '' ? null :
                        <span style={{
                        fontWeight:'bold',
                        color: 'red',
                        fontSize:'14px'
                        }}>{errorMessage}</span>}

                    
                    <input 
                        type="password" 
                        autoComplete='off' 
                        maxLength="20" 
                        minLength="6" 
                        placeholder="Confirm password" 
                        value={password.Cpassword} 
                        onChange={(e)=> {
                            setCpassword(e.target.value)
                            }} className="block text-sm py-3  px-4 rounded-lg w-full border outline-none"  />
                    
                        </div>
                </form>
                
                <div className="text-center mt-6">
                    <button onClick={handleSubmit} className="py-3 w-64 text-xl text-white bg-green-500 rounded-2xl hover:bg-green-600 active:bg-green-600">Submit</button>
                    <p className="mt-4 text-sm">Already Have An Account? <span><button onClick={NavigateToLogin} className="py-3 w-50px text-l text-gray-900 bg-gray-100 rounded-2xl">Sign in</button></span>
                    </p>
                </div>
            </div>
           
        </div>
    )
}

export default Register;