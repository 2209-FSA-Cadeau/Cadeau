"use client";
import "./globals.css";
import Providers from "./providers";
import Navbar from "./Navbar";

function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <Providers>
        <body>
          <Navbar />
          <div className="w-fill h-screen pt-[104px] pb-6 px-6 ">{children}</div>
        </body>
      </Providers>
    </html>
  );
}

export default RootLayout;
