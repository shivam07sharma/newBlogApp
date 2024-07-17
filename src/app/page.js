"use client"
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import MyProfile from "./components/MyProfile";
import BlogPreview from "./components/blogPreview";
import BlogContext from "../../context/BlogData"
import Login from "./login/page";
export default function Home() {
  const [Data,setData]=useState(null);
  const {user}=useContext(UserContext);
  const {blogs,setBlogs}=useContext(BlogContext);
  const [loading,setLoading]=useState(false);
 const LoadingBar=()=>{
  return (
   loading && <>
    <div className="w-16 md:w-24 h-16 md:h-24 rounded-full mt-[30%] md:mt-[10%] mx-auto border-4 animate-spin border-black border-t-lime-400"></div>
    </>
  )
 }
  useEffect(()=>{
    const getData=async()=>{
      setLoading(true)
      fetch("/api/Blogs")
    .then((resp)=> resp.json())
    .then((res)=>{
      if(res.status===200){
      setBlogs(res.data)
    }})
   .catch((error) => console.error("Error fetching blog data:", error));
  }
  user && getData();
  },[user])
  return (
   <>
   {!user && <Login/>}
  {user &&<MyProfile/>}
  {user && <LoadingBar/>}
  {blogs && <div key={blogs} className="w-screen h-max my-3 flex justify-evenly flex-wrap gap-4"> 
    {blogs.map(item=>(
    <BlogPreview key={item._id} image={item.image} title={item.title} content={item.content} author={item.username} date={item.created} category={item.category} id={item._id} />
  ))}
  </div>}
   </>
  );
}
