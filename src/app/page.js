"use client"
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import MyProfile from "./components/MyProfile";
import BlogPreview from "./components/blogPreview";
import BlogContext from "../../context/BlogData"
export default function Home() {
  const [Data,setData]=useState(null);
  const {user}=useContext(UserContext);
  const {blogs,setBlogs}=useContext(BlogContext);
  const [loading,setLoading]=useState(false);
 const LoadingBar=()=>{
  return (
   <>
    <div className="w-14 md:w-20 h-14 md:h-20 rounded-full mt-[30%] md:mt-[10%] mx-auto border-4 animate-spin border-black border-r-0 border-t-0"></div>
    </>
  )
 }
  useEffect(()=>{
    const getData=async()=>{
      setLoading(true);
      fetch("/api/Blogs")
    .then((resp)=> resp.json())
    .then((res)=>{
      if(res.status===200){
        setLoading(false);
      setBlogs(res.data);
    }})
   .catch((error) => console.error("Error fetching blog data:", error));
  }
  getData();
  },[user])
  return (
   <>
  {user &&<MyProfile/>}
  {loading && <LoadingBar/>}
  {blogs && <div key={blogs} className="w-screen h-max my-3 flex justify-evenly flex-wrap gap-4"> 
    {blogs.map(item=>(
    <BlogPreview key={item._id} image={item.image} title={item.title} content={item.content} author={item.username} date={item.created} category={item.category} id={item._id} />
  ))}
  </div>}
   </>
  );
}
