"use client"
import SearchBar from "./ShopNavBar";
import ShoppingSideBar from "./ShoppingSideBar";

function ShopLayout({ children }) {
  return (
    <div className="flex flex-col h-full w-full">
      <SearchBar />
      <div className="flex h-full w-full mt-4">
        <div className="basis-1/4 h-full">
          <ShoppingSideBar />
        </div>
        <div className="basis-3/4 h-full">{children}</div>
      </div>
    </div>
  );
}

export default ShopLayout;
