import "./globals.css";
import Navbar from "./Navbar";
import Providers from "./providers";

function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}

export default RootLayout;
