"use client"
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../context/UserContext';
import BlogPreview from '../../components/blogPreview';
import { useParams } from 'next/navigation';

const GetMyBlogs = () => {
    const {user}=useContext(UserContext);
    const [myBlogs,setMyBlogs]=useState(null);
    const {slug}=useParams();
    const [loading,setLoading]=useState(false);
    const LoadingBar=()=>{
      return (
       <>
        <div className="w-16 md:w-24 h-16 md:h-24 rounded-full mt-[30%] mx-auto border-4 animate-spin border-black border-t-lime-400"></div>
        </>
      )
     }
    useEffect(()=>{
        const getBlogs=async()=>{
            setLoading(true);
            fetch(`/api/Blogs/byUsername/${slug}`)
            .then(res=>res.json())
            .then(response=>{console.log(response);setMyBlogs(response.data);setLoading(false);})
            .catch(e=>{console.log("Error Occured : ",e);setLoading(false);});
            setLoading(false);
        }
        getBlogs();
    },[slug])
  return (
    user ? <>
     <div className='w-screen h-max flex  justify-evenly flex-wrap'>
    {loading &&<LoadingBar/>}
        {myBlogs && myBlogs.map(item=>(
    <BlogPreview image={item.image} title={item.title} content={item.content} author={item.username} date={item.created} id={item._id} category={item.category} />
  ))}
     </div>
     </>
     :
     <><h1>Please Login to Continue...</h1></>
  )
}

export default GetMyBlogs;
