import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="fixed w-full h-20 shadow-xl z-[100] bg-inherit">
      <div className="flex justify-between items-center w-full h-full px-2">
        <h2>Cadeau!</h2>
        <div>
          <ul className="flex">
            <Link href="/home/">
              <li className="mx-10 text-sm uppercase hover:border-b-2 hover:border-black">
                Home
              </li>
            </Link>
            <Link href="/shop/">
              <li className="mx-10 text-sm uppercase hover:border-b-2 hover:border-black ">
                Shop Products
              </li>
            </Link>
            <Link href="/dashboard/">
              <li className="mx-10 text-sm uppercase hover:border-b-2 hover:border-black">
                Dashboard
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
