import SearchBar from "./SearchBar";

// import ShoppingSideBar from "./[recipient]/ShoppingSideBar";

function ShopLayout({ children }) {
  return (
    <div className="flex flex-col text-center h-screen">
      <SearchBar />
      <div className="flex h-screen">
        {/* <div className="basis-1/4">
          <ShoppingSideBar />
        </div> */}
        <div className="ml-6">{children}</div>
      </div>
    </div>
  );
}

export default ShopLayout;
