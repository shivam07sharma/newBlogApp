"use client"
import { createContext, useState } from 'react';
import BlogContext from './BlogData';

const UserContext = createContext(null);
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
