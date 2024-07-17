"use client"
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import {useForm} from 'react-hook-form';
const Signup = () => {
const [error,seterror]=useState(false);
const [Success,setSuccess]=useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async(data) => {
    console.log(data);
    const dp=dpGenerator();
    fetch("/api/createaccount", { 
      method: "POST",
      body: JSON.stringify({...data,Profile:dp}),
      headers: {
        "Content-type": "application/json",
      },
    })
    .then(response => response.json())
    .then(res => {if(res.status==400){seterror(true)} else{setSuccess(true)}})
    
  }
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-screen md:w-[80vmin] h-max mx-auto my-3 md:my-10 md:shadow-lg shadow-[grey] rounded-3xl flex flex-col justify-center px-6 ">
        <div className="w-11/12 md:w-[80vmin] h-max mx-auto my-5  flex ">
          <div className='flex flex-col text-4xl font-bold my-9'>
            <span>SIGN UP</span><span className="material-symbols-outlined ml-2"></span>
           <span className='text-sm mt-4 font-normal'>Connecting writers, one blog at a time</span>
          </div>
        </div>
        <div className='w-full flex flex-col justify-center h-max gap-5'>
          <div className="w-[80vmin] md:w-3/5 h-10 rounded-xl">
            <input type="text"  className="w-full h-10 rounded-xl bg-[#e7e7e7] outline-[black] border-none px-3 text-wrap outline-2" placeholder='Enter Username'  {...register("Username",{ required:true,message:"All Fields are required*"} )}/>
          </div>
          <div className="w-[80vmin] md:w-3/5 h-10 rounded-xl  outline-[black] flex justify-between">
            <input type='password' className="w-full h-10 rounded-xl bg-[#e7e7e7] outline-2 outline-[black] border-none px-3 " placeholder='Enter Password'  {...register("Password",{ required:true,message:"All Fields are required*", min:4, max:20 } )}/>
          </div>
          <div className="w-[80vmin] md:w-3/5 h-10 rounded-xl  outline-[black] flex justify-between">
            <input type='password' className="w-full h-10 rounded-xl bg-[#e7e7e7] outline-2 outline-[black] border-none px-3 " placeholder='Confirm Password'  {...register("Confirm-Password",{ required:"All Fields are required*"  } )}/>

          </div>
          <div className='flex items-center gap-1 text-sm'> <input type="checkbox" name='Remember' {...register("Terms", { required: "You must agree to the Terms & Conditions." })}/> <label htmlFor="Remember" >I Agree all Terms & Conditions</label> 
          </div>
          {errors.Terms && <ErrorPopup text={errors.Terms.message}/>}
          {(errors.Password || errors.name ) &&<ErrorPopup text={"**All fields are required**"}/>}
          {error && <ErrorPopup text={"Usename Already Exists, Try Another or Try Logging In"}/>}

        </div>
        <div><button type={'submit'} className='w-32 h-9 grid place-content-center bg-[black] rounded-full text-white my-8 active:bg-lime-400'>SIGN UP</button></div>
        <div className='flex justify-start text-sm gap-1 mb-11'><span>Already have an account? </span><span><Link href="/login" className='text-[#0fafaf] active:text-slate-600'>Log In</Link></span></div>
      </div >
      </form>
    </>
  )

}

const ErrorPopup = ({text}) => {
  return (
    <>
    <div className='text-white bg-red-600 text-sm mx-3 p-1 font-normal max-w-fit'>{text}</div>
    </>
  )
}

const dpGenerator = () => {
  const rn=Math.ceil(Math.random()*19);
  return `/profileImages/${rn}.jpg`
}

export default Signup;
