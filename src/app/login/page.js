"use client"
import React, { useContext, useEffect,  useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {UserContext} from '../../../context/UserContext';
import  {useRouter} from 'next/navigation';
const Login = () => {
  const {user,setUser}=useContext(UserContext);
  const [hidePass, sethidePass] = useState(true);
  const [error,setError]=useState(false);
  const [userData,setUserData]=useState(null);
  const [success,setSuccess]=useState(false);
  const [loading, setLoading]=useState(false);
  const {
    register,
    handleSubmit,
    formState:{errors}
  }=useForm();
  const router=useRouter();
  useEffect(()=>{
    setUser(userData);
  },[userData])
 
  const onSubmit=async(data)=>{
  
    setLoading(true);
    console.log(data);
    fetch("/api/authorize", { 
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
    .then(response => response.json())
    .then(res => {
      if(res.status==200){
        setUserData(res.data);
        setLoading(false);
        setSuccess(true);
        setError(false);
        router.push("/")
         }
      else{
        setError(true);
        setLoading(false);
         }})
    .catch(err=>{setError(true);setLoading(false)})
   
  
  }


  return (
    <>
      
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full md:w-[80vmin] h-max mx-auto my-2 md:my-10 md:shadow-lg shadow-[grey] rounded-3xl flex flex-col justify-center px-6 ">
        <div className="w-11/12 md:w-[80vmin] h-max mx-auto my-5  flex ">
          <div className='flex flex-col text-4xl font-bold my-9 '><span>Hola,</span>
            <span>Welcome Back</span>
            <span className='text-sm mt-4 font-normal'>Hey! Welcome Back to your special place</span>
          </div>
        </div>
        <div className='w-full flex flex-col justify-center h-max gap-5'>
          <div className="w-[80vmin] md:w-3/5 h-10 rounded-xl">
          <input type="text" className="w-full h-10 rounded-xl bg-[#e7e7e7] outline-[black] border-none px-3 text-wrap outline-2" placeholder='Enter Username' {...register("username",{required:true})} />
          </div>
          <div className="w-[80vmin] md:w-3/5 h-10 rounded-xl  outline-[black] flex justify-between">
           <input type={hidePass ? "password" : "text"} className="w-[83%] h-10 rounded-xl bg-[#e7e7e7] outline-2 outline-[black] border-none px-3 " placeholder='Enter Your Password' {...register("password", { required: "All fields are required"})}/>
            <div className=" w-[14%] h-full rounded-xl hover:outline hover:outline-2 hover:outline-[black] grid place-content-center bg-[#e7e7e7]" onClick={() => sethidePass(!hidePass)} onMouseOver={() => sethidePass(false)} onMouseLeave={() => sethidePass(true)}>
              <span className="material-symbols-outlined">
              {hidePass ? "visibility" : "visibility_off"}
            </span>
            </div>
          </div>
          <div className='flex items-center gap-1 text-sm'> <input type="checkbox" id='Remember' name='Remember' {...register("rememberMe")}/> <label htmlFor="Remember" >Remember Me</label></div>
        </div>
        {error && <ErrorPopup/>}
        <div><button type="submit" className='w-32 h-9 grid place-content-center bg-[black] rounded-full text-white my-10 active:bg-lime-400' >{loading?<LoadingBar/>:"LOG IN"}</button></div>
        <div className='flex justify-start text-sm gap-1 mb-11'><span>Don't have an account? </span><span><Link href="/signup" className='text-[black] active:text-slate-600'>Create One</Link></span></div>
      </div >
      </form>
    </>
  )
};
const LoadingBar=()=>{
  return(
    <>
    <div className="w-7 h-7 rounded-full border-4 border-white border-t-black animate-spin"></div>
    </>
  )
}
const ErrorPopup = () => {
  return (
    <>
    <div className='text-white bg-red-600 text-sm mx-3 my-2 p-1 font-normal max-w-fit'>Incorrect Username or Password. Try Again!</div>
    </>
  )
}

export default Login;
