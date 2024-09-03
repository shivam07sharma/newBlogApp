"use client"
import React from 'react'
import Link from 'next/link'
const BlogPreview = ({ image, title, content, author, date, category, id }) => {
  const ellipsisStyle = {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
  return (
    <>
      <Link href={`/BlogPost/${id}`}>
        <div className='shadow-xl shadow-slate-300 w-11/12 md:w-[80vmin] h-max md:h-48 mx-auto rounded-lg my-1 md:my-3 flex flex-col md:flex-row flex-wrap items-center overflow-hidden pb-2'>

          <div className="w-full md:w-2/5 h-fit md:h-[90%] md:rounded-md grid place-content-center overflow-hidden bg-gray-900 mx-auto md:mx-2">
            <img src={image || "/BlogImages/defaultBlogimg.jpeg"} alt={title} className='w-full h-auto max-h-64 md:max-h-full' />
          </div>
          <div className="mx-auto md:mx-2 w-11/12 md:w-6/12 flex flex-col ">
            <div className='hidden px-2 mb-2 w-fit h-fit bg-black rounded-md text-white font-medium text-sm md:grid place-content-center'>{category}</div>
            <div className="w-full my-3 md:my-0 text-base md:text-lg font-semibold text-black max-h-12 md:max-h-16 overflow-hidden text-ellipsis mb-2 md:pr-2">
              {title.toUpperCase()}
            </div>
            <div className='w-full text-xs text-slate-600 max-h-12 overflow-hidden text-ellipsis pr-2' style={ellipsisStyle}>
              {content}
            </div>
            <div className='w-full  my-2 flex justify-between'>
              <Link href={"/GetBlogsByUsername/" + author}> <div className="min-w-fit text-sm font-medium">~{author || "author"}</div></Link>
            </div>
          </div>
        </div></Link>
    </>
  )
}

export default BlogPreview;
