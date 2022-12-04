import SearchBar from "./SearchBar";
import ShoppingNav from "./ShoppingNav";
import ShoppingSideBar from "./ShoppingSideBar";

function ShopLayout({ children }) {
  return (
    <div className="flex flex-col text-center">
      <SearchBar />
      <ShoppingNav />
      <div className="flex">
        <div className="basis-1/4">
          <ShoppingSideBar />
        </div>
        <div className="basis-3/4 ml-6">{children}</div>
      </div>
    </div>
  );
}

export default ShopLayout;
