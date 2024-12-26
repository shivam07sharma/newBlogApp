"use client"
import { createContext, useState } from 'react';
import BlogContext from './BlogData';
const UserContext = createContext(null);
const blog=[{
    _id:224323,
    image:null,
    title:"Lorerem ipsum dolor sit amet",
    content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, alias consequatur. Quibusdam in modi pariatur cumque eum, corrupti eius praesentium odit quae laborum impedit amet vero nesciunt repudiandae excepturi! Architecto aut numquam, quaerat perferendis ea aperiam debitis ullam eius nobis rem dolorum incidunt hic voluptate omnis enim beatae soluta repellendus?\n Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore, labore. Asperiores beatae culpa ea fugit, tenetur deserunt! Obcaecati laborum natus, quasi aut ducimus asperiores similique iure. Rerum accusantium neque dignissimos inventore eum perspiciatis voluptatum harum numquam consectetur qui? Id tenetur amet alias asperiores deserunt error magni deleniti saepe unde fugit. \n Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum perferendis sapiente aperiam ducimus est aut officia in dignissimos dolor ratione minus ipsum facilis molestias obcaecati maxime, cum eaque magnam nobis ut impedit natus quidem! Nostrum architecto quae dolore quam, esse perferendis iure assumenda error eveniet. Nam exercitationem obcaecati sit quasi quibusdam repellat accusamus vero, inventore deleniti adipisci possimus numquam nisi ratione maxime, explicabo tempore veritatis magnam! Eveniet, recusandae minima. ",
    category:"News",
    created:Date.now(),
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


