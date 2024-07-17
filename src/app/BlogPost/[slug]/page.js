"use client"
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import BlogContext from '../../../../context/BlogData';

const FullPost = () => {
  const { slug } = useParams();
  const [blog,setBlog]=useState(null);
  const {blogs}=useContext(BlogContext);

  useEffect(() => {
    const fetchBlog = async () => {
      let index=-1;
      if(blogs){ index = blogs.findIndex(item => item._id == slug);}
      if (index !== -1) {
        setBlog(blogs[index]);
      }
      else{
        fetch(`/api/getBlog/${slug}`)
        .then(res=>res.json())
        .then(resp=>{if(resp.status===200){setBlog(resp.data)}})
        .catch(e=>console.log(e))
      }
    };
    fetchBlog();
  }, [slug]);

  return (
    <>
      { blog && <div className='w-full h-max flex flex-wrap overflow-hidden'>
        <div className="w-full h-auto md:w-1/2 md:min-h-[calc(100vh-48px)] bg-black overflow-hidden md:fixed top-12 left-0 flex  items-center">
          <img src={blog.image||"/BlogImages/defaultBlogimg.jpeg"} alt="" className='w-full h-auto max-h-[100%]' />
        </div>
        <div className="w-full min-h-fit md:w-1/2 md:ml-[50vw] h-max my-7">
          <div className='w-full h-max overflow-hidden mb-2 text-3xl md:text-4xl font-semibold px-5 py-3'>
            {blog.title}
          </div>
        <div className='mx-5 flex justify-between'>
          <div className='w-fit h-fit px-3 py-1 mb-2 rounded-md bg-black hover:bg-lime-400 text-white text-base font-medium'>{blog.category.toUpperCase()}</div>
          <div className="w-fit h-fit px-3 py-1 text-black mr-5 hover:bg-lime-400 rounded-md text-base font-medium">{blog.created.slice(0,10)}</div>
          </div>
          <div className="w-full h-max px-5 py-3 my-2 text-base md:text-lg text-gray-600">
            {blog.content}      
          </div>
          <div className='w-max px-5 mx-5 py-2 my-5 mb-7 rounded-lg text-base font-semibold bg-black hover:scale-105 hover:bg-lime-500 transition-all text-white'>{"@"+blog.username}</div>
        </div>
      </div>}
    </>
  )
}

export default FullPost;
