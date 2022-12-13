"use client"
import ShopNavBar from "./ShopNavBar";
import ShoppingSideBar from "./ShoppingSideBar";

function ShopLayout({ children }) {
  return (
    <div className="flex flex-col h-full w-full">
      <ShopNavBar />
      <div className="grow flex w-full mt-4 min-h-0 gap-8">
        <div className="basis-[20%] h-full pb-6">
          <ShoppingSideBar />
        </div>
        <div className="basis-[80%] h-full">{children}</div>
      </div>
    </div>
  );
}

export default ShopLayout;
