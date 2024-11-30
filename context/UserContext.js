"use client"
import { createContext, useState } from 'react';
import BlogContext from './BlogData';
const UserContext = createContext(null);
const blog=[{
    _id:224323,
    image:null,
    title:"Lorerem ipsum dolor sit amet",
    content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, alias consequatur. Quibusdam in modi pariatur cumque eum, corrupti eius praesentium odit quae laborum impedit amet vero nesciunt repudiandae excepturi! Architecto aut numquam, quaerat perferendis ea aperiam debitis ullam eius nobis rem dolorum incidunt hic voluptate omnis enim beatae soluta repellendus?",
    category:"News",
    date:Date.now(),
    username:"shivam",
    isVerified:true
},
{
    _id:224324,
    image:null,
    title:"Lorerem ipsum dolor sit amet",
    content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, alias consequatur. Quibusdam in modi pariatur cumque eum, corrupti eius praesentium odit quae laborum impedit amet vero nesciunt repudiandae excepturi! Architecto aut numquam, quaerat perferendis ea aperiam debitis ullam eius nobis rem dolorum incidunt hic voluptate omnis enim beatae soluta repellendus?",
    category:"News",
    date:Date.now(),
    username:"shivam",
    isVerified:true
}
,{
    _id:224326,
    image:null,
    title:"Lorerem ipsum dolor sit amet",
    content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, alias consequatur. Quibusdam in modi pariatur cumque eum, corrupti eius praesentium odit quae laborum impedit amet vero nesciunt repudiandae excepturi! Architecto aut numquam, quaerat perferendis ea aperiam debitis ullam eius nobis rem dolorum incidunt hic voluptate omnis enim beatae soluta repellendus?",
    category:"News",
    date:Date.now(),
    username:"shivam",
    isVerified:true
}]

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [blogs,setBlogs]=useState(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <BlogContext.Provider value={{blogs,setBlogs}}>
            {children}
            </BlogContext.Provider>
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };


