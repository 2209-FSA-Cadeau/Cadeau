import ShoppingSideBar from "./ShoppingSideBar";

function CategoryLayout({ children }) {
  return (
    <section className="flex flex-row w-full h-full">
      <div className="basis-1/2">
        <ShoppingSideBar/>
      </div>
      <div className="basis 1/2">
        {children}
      </div>
    </section>
  );
}

export default CategoryLayout;