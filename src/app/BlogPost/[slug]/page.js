"use client"
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useRef, useState } from 'react'
import BlogContext from '../../../../context/BlogData';
import { UserContext } from '../../../../context/UserContext';
const LoadingBar = () => {
  return (
    <>
      <div className='w-12 h-12 border-4 border-black rounded-full border-t-white animate-spin mx-auto my-[calc(50vh-48px-24px)]'>
      </div>
    </>
  )
}

const ErrorPopup = () => {
  return (
    <>
      <div className='w-max h-max text-red-600 font-semibold text-lg mx-auto my-[calc(50vh-48px-24px)]'>
        Something Went Wrong! Try Again Later.
      </div>
    </>
  )
}
const FullPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const { blogs } = useContext(BlogContext);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user } = useContext(UserContext);
  const [delWarning, setDelWarning] = useState(false);
  const copybutton=useRef(0);
  const share="Hey%20there!%20Check%20out%20this%20article%20on%20BlogShare%20By%20";
  const router = useRouter();
  useEffect(() => {
    //If the blog with that _id is present in the context fetch it from there, otherwise get it from the database =>
    const fetchBlog = async () => {
      let index = -1;
      if (blogs) {
        index = blogs.findIndex(item => item._id == slug);
      }
      if (index !== -1) {
        setBlog(blogs[index]);
        setLoading(false);
      }
      else {
        fetch(`/api/getBlog/${slug}`)
          .then(res => res.json())
          .then(resp => {
            setLoading(false);
            if (resp.status === 200) { setBlog(resp.data) }
            else {
              { setError(true) }
            }
          })
          .catch(e => console.log(e));
      }
    };
    fetchBlog();
  }, [slug]);

  const copytoclip=(e)=>{
    const shareMessage="Hey There! Checkout this Article on BlogShare - "+blog.title+" https://webblogwriter.netlify.app/BlogPost/"+blog._id;
    navigator.clipboard.writeText(shareMessage);
    copybutton.current.style.backgroundColor="green";
    copybutton.current.style.color="white";
    copybutton.current.innerHTML="check";
    
  }

  const deleteBlog = async () => {
    await fetch("/api/getBlog/" + slug, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
    router.push("/");
  }

  const DeleteWarning = () => {
    return (
      <>
        <div className='h-[calc(100vh-48px)] w-screen grid place-content-center bg-#81818123 top-0 overflow-y-hidden fixed z-20'>
          <div className='w-[80vmin] h-max rounded-md bg-gray-300 py-3 px-2 shadow-sm shadow-gray-800 '>
            <h3 className='text-black text-base font-medium text-center my-4 px-2'>
              Are you sure you want to delete this Blog with Title {blog.title} ?
            </h3>
            <div className='w-full h-12 flex justify-evenly text-sm mt-8 mb-2'>
              <div onClick={deleteBlog} className='w-20 h-max p-1 text-center bg-red-600 text-white rounded-md active:bg-slate-600 cursor-pointer animate-bounce'>Yes</div>
              <div onClick={() => { setDelWarning(false) }} className='w-20 h-max p-1 text-center bg-black text-white rounded-md active:bg-slate-600 cursor-pointer'>No</div>

            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {Loading && <LoadingBar />}
      {blog && <div className='w-full h-max flex flex-wrap overflow-hidden'>
        <div className="w-full h-auto md:w-1/2 md:min-h-[calc(100vh-48px)] bg-black overflow-hidden md:fixed top-12 left-0 flex  items-center">
          <img src={blog.image || "/BlogImages/defaultBlogimg.jpeg"} alt="" className='w-full h-auto max-h-[100%]' />
        </div>
        <div className="w-full min-h-fit md:w-1/2 md:ml-[50vw] h-max my-7">
          <div className='w-full h-max overflow-hidden mb-4 text-3xl md:text-4xl font-semibold px-5 py-3'>
            {blog.title}
          </div>
          <div className='mx-5 flex justify-between'>
            <div className='w-fit h-fit px-3 py-1 mb-2 rounded-md bg-black hover:bg-lime-400 text-white text-base font-medium'>{blog.category.toUpperCase()}</div>
            <div className="w-fit h-fit px-3 py-1 text-gray-700 mr-5 hover:bg-lime-400 rounded-md text-base font-medium">{blog.created}</div>
          </div>
          <div className="w-full h-max px-5 py-3 my-2 text-base md:text-lg text-gray-600">
            {blog.content}
          </div>
          <div className='w-max px-5 mx-5 py-2 my-5 mb-7 rounded-lg text-base font-base bg-black  hover:text-lime-500 transition-all text-white'>{"@" + blog.username}</div>
          <div className='w-max mx-5 h-max p-1 text-lg text-white  text-center my-8 rounded-md flex justify-start gap-3'>
                  <a href={`https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fwebblogwriter.netlify.app/BlogPost/${blog._id}&title=${encodeURIComponent(blog.title)}&source=LinkedIn`} target="_blank">
                  <div className='h-9 w-9 my-1 rounded-xl overflow-hidden hover:scale-105 transition-all'>
                  <img src="/socialmedia/linkedin.png" alt="" className='w-full h-full mix-blend-screen scale-110'/>
                </div> 
                </a>
                <a href={`https://wa.me/?text=${share}${blog.username}%20https%3A%2F%2Fwebblogwiter/BlogPost/${blog._id}`} target="_blank">
                  <div className='h-9 w-9 m-1 rounded-xl overflow-hidden'>
                  <img src="/socialmedia/wsp.png" alt="" className='w-full h-full mix-blend-screen scale-125'/>
                </div> 
                </a>
                <a href="https://www.instagram.com" target="_blank">
                  <div className='h-9 w-9 m-1 rounded-xl overflow-hidden'>
                  <img src="/socialmedia/instag.png" alt="" className='w-full h-full mix-blend-screen scale-110'/>
                </div> 
                </a>
                <a href={`https://twitter.com/intent/tweet?text=Check+out+this+awesome+blog+on+BlogShare%21&url=https%3A%2F%2Fwebblogwriter/${blog._id}&hashtags=example,content,blogs,BlogShare,Articles`} target="_blank">
                  <div className='h-9 w-9 m-1 rounded-xl overflow-hidden'>
                  <img src="/socialmedia/xicon.png" alt="" className='w-full h-full mix-blend-screen scale-110'/>
                </div> 
                </a>
                <a href="#">
                  <div onClick={copytoclip} className='h-9 w-9 m-1 rounded-xl overflow-hidden grid place-content-center border-[1px] border-black active:bg-green-500'>
                  <span ref={copybutton} className='material-symbols-outlined w-full h-full text-black mix-blend-screen scale-150'>content_copy</span>
                </div> 
                </a>
          </div>
          {user && (blog.username == user.username || user.isAdmin == true) &&
            <div className='my-3 mb-9 mx-auto w-1/2 h-max py-1 bg-red-600 text-white text-center text-lg rounded-full' onClick={()=>{setDelWarning(true)}}>
              Delete This Article
            </div>
          }
        </div>
      </div>
      }
      {delWarning && <DeleteWarning/>}
      {error && <ErrorPopup />}
    </>
  )
}
export default FullPost;
