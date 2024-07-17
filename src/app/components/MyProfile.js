"use client"
import React, { useContext } from 'react'
import { UserContext } from '../../../context/UserContext'
const MyProfile = () => {
  const {user}=useContext(UserContext);
  return (
   user && <>
      <div className='w-full h-fit shadow-lg shadow-grey-400 flex items-center'>
        <div className='w-20 h-20 my-3 md:w-28 md:h-28 rounded-full ml-8 border-2 border-black overflow-hidden'>
          <img src={user.profilePhoto} className='w-full h-full' alt="" />
        </div>
        <div className="text-lg md:text-2xl font-medium text-[#003135] ml-5 mr-1">{"@" + (user.username).toUpperCase()}</div>
        {user.isVerified && <div className=" w-4 h-4 bg-lime-400 rounded-full text-xs text-white grid place-content-center"> <span className="material-symbols-outlined grid scale-90 place-content-center">check</span> </div>}
      </div>
    </>
  )
}

export default MyProfile;
