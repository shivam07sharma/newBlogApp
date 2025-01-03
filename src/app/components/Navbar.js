"use client"
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { UserContext } from '../../../context/UserContext'
import BlogContext from '../../../context/BlogData'
const Navbar = () => {
  const [showSidebar, setSidebar] = useState(false);
  const {setBlogs}=useContext(BlogContext);
  const { user, setUser } = useContext(UserContext);
  const Sidebar = () => {
    const shareMessage="Hey There! Follow this link to join the amazing community of blog writers, BlogShare - https://webblogshare.netlify.app";
    const MenuButton=({route,symbol,text})=>{
      return(
        <>
          <Link href={route} onClick={()=>setSidebar(!showSidebar)} >
              <div className='text-base font-normal flex items-center pt-4 p-2 rounded-full'>
                <div className='h-5/6 w-11/12 bg-gray-950 p-3 hover:bg-gray-800 shadow-sm shadow-gray-700 transition-all active:bg-gray-700 rounded-full'>
                <span className='material-symbols-outlined w-12 overflow-hidden text-lime-400'>{symbol}</span><span>{text}</span>
                </div>
              </div>
            </Link>
        </>
      )
    }
    return (
      <>
        <div className={`h-screen bg-black fixed w-56 md:w-72 z-10 top-14 md:right-0 transition-all `}>
          <ul className='flex flex-col justify-start border-t-2  border-white'>
            <li><MenuButton route={"/"} symbol={"home"} text={"HOME"}/></li>
            {user ? 
          <><li><MenuButton onClick={()=>{setUser(null);setBlogs(null)}} route={"/"} symbol={"logout"} text={"LOGOUT"}/></li>
            <li><MenuButton route={"/Newpost"} symbol={'add_circle'} text={'NEW POST'}/></li>
            <li><MenuButton route={"/GetBlogsByUsername/"+user.username} symbol={'person'} text={'MY BLOGS'}/></li></>

         :<>
            <li><MenuButton route={"/login"} symbol={"login"} text={"LOGIN"}/></li>
            <li><MenuButton route={"/signup"} symbol={'group_add'} text={'SIGNUP'}/></li></>}
            <li><MenuButton route={"/About"} symbol={'description'} text={'ABOUT'}/></li>
            <li><MenuButton route={"https://shivamsprofile.netlify.app/ContactMe"} symbol={'call'} text={'CONTACT US'}/></li>
            <li><MenuButton route={"https://shivamsprofile.netlify.app/ContactMe"} symbol={'help'} text={'HELP'}/></li>
            <li><MenuButton onClick={()=>{navigator.clipboard.writeText(shareMessage)}} route={"/"} symbol={'share'} text={'SHARE'}/></li>


            </ul>
        </div>
      </>
    )
  }
  return (
    <div className='w-full bg-black h-14 md:h-14 flex justify-between items-center text-white sticky z-50 top-0 overflow-hidden'>
      <div className='md:hidden mx-5 text-2xl' onClick={() =>{ setSidebar(!showSidebar)}}><span className="material-symbols-outlined font-light scale-125">menu</span></div>
      {showSidebar &&<Sidebar />}
      <div className="mx-5 md:mx-9 font-semibold text-xl">BlogShare</div>
      <ul className='md:flex gap-2 mr-5 hidden'>
        {user && <>
          <Link href={"/"}><li className='text-sm  hover:bg-[#bababa36] font-normal rounded-3xl py-2 px-5 transition-all'>HOME</li></Link>
          <Link href={"/GetBlogsByUsername/"+user.username}><li className='text-sm  hover:bg-[#bababa36] font-normal rounded-3xl py-2 px-5 transition-all'>MY BLOGS</li></Link>
          <Link href={"/"}><li className='text-sm  hover:bg-[#bababa36] font-normal rounded-3xl py-2 px-5 transition-all flex items-center' onClick={()=>{setUser(null);setBlogs(null)}} >LOGOUT </li></Link>
        </>}
        {!user && <>

        <Link href={"/login"}><li className='text-sm  hover:bg-[#bababa36] font-normal rounded-3xl py-2 px-5 transition-all'>LOGIN</li></Link>
        <Link href={"/signup"}><li className='text-sm hover:bg-[#bababa36] font-normal rounded-3xl py-2 px-5 transition-all'>SIGNUP</li></Link>
        </>}
          <span onClick={()=>{setSidebar(!showSidebar)}} className="material-symbols-outlined pointer text-sm hover:bg-[#bababa36] font-normal rounded-3xl py-[6px]">more_vert</span>
      </ul>

    </div>
  )
}
export default Navbar;
