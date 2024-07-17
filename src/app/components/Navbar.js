"use client"
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { UserContext } from '../../../context/UserContext'
const Navbar = () => {
  const [showSidebar, setSidebar] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const Sidebar = () => {
    const MenuButton=({route,symbol,text})=>{
      return(
        <>
          <Link href={route} onClick={()=>setSidebar(!showSidebar)} >
              <div className='border-b-2 border-white text-base font-normal flex items-center p-4'>
                <span className='material-symbols-outlined w-10 text-lime-400'>{symbol}</span><span>{text}</span>
              </div>
            </Link>
        </>
      )
    }
    return (
      <>
        <div className={`h-screen bg-black fixed w-56 md:w-72 z-10 top-11 md:top-12 md:right-0`}>
          <ul className='flex flex-col justify-start border-t-2 mt-1 md:mt-2 border-white'>
            <li><MenuButton route={"/"} symbol={"home"} text={"HOME"}/></li>
            {user ? 
          <><li><MenuButton onClick={()=>setUser(null)} route={"/"} symbol={"logout"} text={"LOGOUT"}/></li>
            <li><MenuButton route={"/Newpost"} symbol={'add_circle'} text={'NEW POST'}/></li>
            <li><MenuButton route={"/GetBlogsByUsername/"+user.username} symbol={'profile'} text={'MY BLOGS'}/></li></>

         :<>
            <li><MenuButton route={"/login"} symbol={"login"} text={"LOGIN"}/></li>
            <li><MenuButton route={"/signup"} symbol={'group_add'} text={'SIGNUP'}/></li></>}
            <li><MenuButton route={"/About"} symbol={'description'} text={'ABOUT'}/></li>
            <li><MenuButton route={"/ContactUs"} symbol={'call'} text={'CONTACT US'}/></li>
            <li><MenuButton route={"/ContactUs"} symbol={'help'} text={'HELP'}/></li>
            <li><MenuButton route={"/"} symbol={'share'} text={'SHARE'}/></li>


            </ul>
        </div>
      </>
    )
  }
  return (
    <div className='w-full bg-black h-12 max-h-max md:h-14 flex justify-between items-center text-white sticky z-50 top-0 overflow-hidden'>
      <div className='md:hidden mx-5 text-2xl' onClick={() =>{ setSidebar(!showSidebar)}}><span className="material-symbols-outlined font-light scale-125">menu</span></div>
      {showSidebar &&<Sidebar />}
      <div className="mx-5 md:mx-9 font-semibold text-xl">BlogShare</div>
      <ul className='md:flex gap-2 mr-5 hidden'>
        {user && <>
          <Link href={"/"}><li className='text-sm  hover:bg-[#bababa36] font-normal rounded-3xl py-2 px-5 transition-all'>HOME</li></Link>
          <Link href={"/GetBlogsByUsername/"+user.username}><li className='text-sm  hover:bg-[#bababa36] font-normal rounded-3xl py-2 px-5 transition-all'>MY BLOGS</li></Link>
          <Link href={"/"}><li className='text-sm  hover:bg-[#bababa36] font-normal rounded-3xl py-2 px-5 transition-all flex items-center' onClick={() => {setUser(null) }}>LOGOUT </li></Link>
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
