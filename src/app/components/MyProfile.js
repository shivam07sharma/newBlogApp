"use client"
import React from 'react'
const MyProfile = ({pfp,name,isVerified}) => {
  return (
    <>
    <div className='w-full h-28 lg:h-40 shadow-lg shadow-gray-500 flex items-center'>
        <div className='w-[18vmin] h-[18vmin] rounded-full ml-8 border-2 border-black overflow-hidden'>
            <img src={pfp} className='w-full h-full' alt="" />
        </div>
        <div className="text-lg md:text-2xl font-medium text-[#003135] ml-5 mr-1">{"@"+name.toUpperCase()}</div>
        {isVerified && <div className=" w-4 h-4 bg-blue-600 rounded-full text-xs text-white grid place-content-center"> <span className="material-symbols-outlined grid place-content-center">check</span> </div> }
    </div>
    </>
  )
}

export default MyProfile
