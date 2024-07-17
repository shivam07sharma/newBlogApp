"use client"
import React from 'react'
import Link from 'next/link'
const BlogPreview = ({ image, title, content, author, date,category, id }) => {
  const ellipsisStyle = {
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
  return (
    <>
     <Link href={`/BlogPost/${id}`}> <div className=' shadow-xl w-[98vw] md:w-[80vmin]  h-48 mx-auto rounded-lg my-3 flex items-center '>
      
        <div className="w-2/5  h-[90%] grid place-content-center rounded-md overflow-hidden bg-gray-200 mx-2">
          <img src={image||"/BlogImages/defaultBlogimg.jpeg"} alt={title} className='w-full h-auto max-h-full' />
        </div>
        <div className="mx-2 w-7/12 flex flex-col ">
          <div className=' px-3 mb-2 w-fit h-fit bg-black rounded-md text-white font-medium text-sm grid place-content-center'>{category}</div>
          <div className="w-full text-base md:text-lg font-semibold text-black max-h-16 overflow-hidden text-ellipsis mb-2 pr-2">
            {title.toUpperCase()}
          </div>
          <div className='w-full text-xs text-slate-600 max-h-12 overflow-hidden text-ellipsis pr-2' style={ellipsisStyle}>
            {content}
          </div>
          <div className='w-full  my-2 flex justify-between'>
            <div className="min-w-fit max-w-2/3 text-sm font-semibold">~{author||"author"}</div>
          </div>
        </div>
      </div></Link>
    </>
  )
}

export default BlogPreview;
