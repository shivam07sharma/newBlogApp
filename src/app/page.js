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
 
  useEffect(()=>{
    const getData=async()=>{
      fetch("/api/Blogs")
    .then((resp)=> resp.json())
    .then((res)=>{if(res.status==200){console.log("res",res);setBlogs(res.data);console.log(blogs);}})
   .catch((error) => console.error("Error fetching blog data:", error));
  }
  user && getData();
  },[user])
  return (
   <>
   {!user && <Login/>}
  {user &&<MyProfile pfp={user.profilePhoto} name={user.username} isVerified={user.isVerified} />}
  {blogs && <div className="w-screen h-max my-3 flex justify-evenly flex-wrap gap-4"> 
    {blogs.map(item=>(
    <BlogPreview image={item.image} title={item.title} content={item.content} author={item.username} date={item.created} category={item.category} id={item._id} />
  ))}
  </div>}
   </>
  );
}
