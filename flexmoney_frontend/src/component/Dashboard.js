import React,{useEffect, useState} from 'react'
import Payment from './Payment';
import axios from 'axios'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const Dashboard = () =>{

    const [Status,setStatus] = useState(false)
    const Navigate = useNavigate();
    const date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
    const token = Cookies.get('token')
    
    useEffect(()=>{
        axios.get(`http://localhost:5000/status`,{
            headers: {
                'Authorization': token
            }
        }).then(res=>{
            setStatus(res.data.status)
        }).catch(e=>console.log(e))
    },[])
    const makePayment = ({ slot,fee }) => {
            axios.post(`http://localhost:5000/payment`,{
                slot,
                fee
            },{
                headers: {
                  'Authorization':token 
                }
              }).then(
                res=>{
                    setStatus(false)
                }
                ).catch(e=>{
                    toast.error(e.message)
                })
    }

    const Logout = () =>{
        Cookies.remove('token')
        Navigate('/Login')
    }
    return (
        <div className='relative '>
            
            <div className="flex flex-row ">

                <div className='flex flex-col w-full'>
                     <h1 className='mt-4 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                            Dashboard
                     </h1>
                        <hr className="w-3/5 mx-auto h-2 mb-5" />
                        <div className="text-center mt-6">
                        
                    
                        <div>
                            <h1 className='mt-4 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                                Status
                            </h1>
                            {Status?<h1 className='mt-4 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                                Active for {monthNames[date.getMonth()]}
                            </h1>:<h1 className='mt-4 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                                Inactive
                            </h1>}
                        </div>
                        <div>
                            <Payment disable={Status} makePayment={makePayment}/>
                        </div>
                        <div>
                        <button className="ml-8 py-3 w-56 text-xl text-white bg-green-500 rounded-2xl hover:bg-green-600 active:bg-green-600" onClick={Logout}>Logout</button>
                        </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;