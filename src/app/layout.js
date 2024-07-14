import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { UserContext, UserProvider } from "../../context/UserContext";

const poppins = Poppins({subsets: ['latin'], weight: ['400', '700'],
});


export const metadata = {
  title: "Blog Writer",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /></head>
      <body className={poppins.className}><UserProvider><Navbar/>{children}</UserProvider></body>
    </html>
  )
}
