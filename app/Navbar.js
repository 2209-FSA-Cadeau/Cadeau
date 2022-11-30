"use client";

import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
  <div>
    Navbar
    <Link href='/home/'>Home</Link>
    <Link href='/shop/'>Shop Products</Link>
    <Link href='/dashboard/'>Dashboard</Link>
  </div>
  );
};

export default Navbar;
