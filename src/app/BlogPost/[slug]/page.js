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
      const index = blogs.findIndex(item => item._id == slug);
      if (index !== -1) {
        setBlog(blogs[index]);
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
          <div className='w-full h-max overflow-hidden mb-4 text-3xl md:text-4xl font-semibold px-5 py-3'>
            {blog.title}
          </div>
          <div className="w-full h-max px-5 py-3 my-2 text-base md:text-lg text-gray-600">
            {blog.content}      
          </div>
          <div className='w-max px-5 mx-5 py-2 my-5 mb-7 rounded-lg text-base font-semibold bg-black hover:scale-105 hover:bg-orange-600 transition-all text-white'>{"@"+blog.username}</div>
        </div>
      </div>}
    </>
  )
}

export default FullPost;