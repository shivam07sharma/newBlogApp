"use client"
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../context/UserContext';
import BlogPreview from '../components/blogPreview';

const GetMyBlogs = () => {
    const {user}=useContext(UserContext);
    const [myBlogs,setMyBlogs]=useState(null);
    useEffect(()=>{
        const getBlogs=async()=>{
            fetch(`/api/Blogs/MyBlogs/${user.username}`)
            .then(res=>res.json())
            .then(response=>{console.log(response);setMyBlogs(response.data)})
            .catch(e=>console.log("Error Occured : ",e));
        }
        getBlogs();
    },[])
  return (
     <>
     <div className='w-screen h-max flex  justify-evenly flex-wrap'>
        {myBlogs && myBlogs.map(item=>(
    <BlogPreview image={item.image} title={item.title} content={item.content} author={item.username} date={item.created} />
  ))}
     </div>
     </>
  )
}

export default GetMyBlogs;
