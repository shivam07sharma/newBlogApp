"use client"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../../utlis/firebase";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import Link from "next/link";
import { UserContext } from "../../../context/UserContext";
const NewPost = () => {
    const [media,setMedia]=useState(null);
    const [file,setFile]=useState(null);
    const [success,setSuccess]=useState(false);
    const [error,setError]=useState(false);
    const {user}=useContext(UserContext);
    const Published=()=>{
        return (<div className="w-full h-full overscroll-none bg-[#efe9e9e6] flex flex-col justify-center items-center absolute z-10">
           <div className="w-[30vmin] h-[30vmin] rounded-full bg-black shadow-lg shadow-[#afdde5] grid place-content-center"><span className="material-symbols-outlined text-9xl scale-[4] text-white md:scale-[7]">check</span></div>
           <div className="text-lg text-black font-semibold mx-auto">Blog Published</div>
           <Link href={"/"}> <div className="w-40 h-10 bg-[#024950] text-lg grid place-content-center rounded-xl my-7 mx-auto text-white ">Continue</div> </Link>
         </div>)
       }
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    useEffect(()=>{ 
        const storage = getStorage(app);
        const upload = () => {
          const name = new Date().getTime() + file.name;
          const storageRef = ref(storage, name);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            (error) => {
              console.error("Upload failed:", error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                console.log("File available at", downloadURL);
                setMedia(downloadURL);
              });
            }
          )
        }
        if (file) {
          upload();
        }

    },[file])

    const onSubmit = (data) => {
        const data1={username:user.username,image:media,...data,created:Date.now()}
        console.log("form data from page.js "+data1);
    fetch("/api/Blogs", { 
      method: "POST",
      body: JSON.stringify(data1),
      headers: {
        "Content-type": "application/json",
      },
    })
    .then(response => response.json())
    .then(res => {
        if(res.status==200){
            setSuccess(true)
        } 
        else{
            setError(true)
        }
    })
    }
    

    return (
        <>   
        {success && <Published/>}
            <div className="h-screen w-screen bg-gray-500">
                <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-white w-[100vmin] mx-auto flex flex-col justify-start">
                    <h2 className=' my-10 text-3xl font-semibold text-black mx-auto'>NEW POST</h2>
                    <div className='mx-5 my-2 w-10/12'>
                    <label htmlFor="media" className=' w-full md:w-72 bg-black p-1 text-base text-white rounded-md text-center flex gap-2 justify-center items-center'>Choose Image <span className='material-symbols-outlined'>image</span></label>
                    <input type="file" onChange={(e)=>{setFile(e.target.files[0])}}  name='media' id="media" className='hidden'/>
                    </div>

                    <div className='mx-5 my-2 w-10/12'>
                        <input type="text" id='Name' className="w-full lg:w-8/12 h-10   outline-none  px-3 border-b-2 border-black" placeholder='Enter Blog Title' {...register("title", {
                            required: {
                                value: true, message: "Title is Required"},
                                minLength: { value: 4, message: "At Least 4 Characters are Required for the Title"},
                                maxLength:{value:70, message:"Maximum Length Exceeded"}})}/>
                                </div>
                     {errors.title && <ErrorPopup text={errors.title.message}/>}           
                    <div className='mx-5 my-2 w-10/12'>
                        <select id="Category" name='Category' className='p-1 border-none bg-black rounded-md text-white outline-none w-72 text-base' {...register("category",{required:{value:true,message:"Please Select a Category"}})}>
                            <option  disabled selected>Choose Category</option>
                            <option value="News">News</option>
                            <option value="Health">Health</option>
                            <option value="Education">Education</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Technology">Technology</option>
                            <option value="Travel">Travel</option>


                        </select>
                        {errors.category && <ErrorPopup text={errors.category.message} />}

                        </div> 
                    
                    <div className='mx-5 my-2 w-10/12'>
                        <textarea className="w-full lg:w-8/12 min-h-52 max-h-max rounded-lg  outline-none  p-3 border-2 border-black" placeholder='Enter Your Text...' {...register("content", {
                            required: {
                                value: true, message: "Blog Content is Required"},
                                minLength:{ value: 40, message: "Enter At Least 40 Characters" }
                            
                        })}></textarea>
                    </div>
                    {errors.content && <ErrorPopup text={errors.content.message}/>} 
                    <div className='mx-5 my-2 w-10/12'>
                    <button type="submit" className="w-full md:w-72 mx-auto py-1 bg-black rounded-lg text-white text-center hover:scale-y-110 transition-all">Publish</button>
                    </div>
                    {error && <ErrorPopup text={"Some Error Occured! Try Again."}/>}
                </form>
            </div>
        </>
    )
}
const ErrorPopup=({text})=>{
    return(
        <>
        <div className='mx-5 my-2 w-10/12'>
        <div className="bg-red-600 p-1 flex items-center text-base text-white"><span className="material-symbols-outlined mr-1">error</span>{text}</div>
        </div>
        </>
    )
}
export default NewPost;
