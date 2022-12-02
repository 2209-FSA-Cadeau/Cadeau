import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="flex w-full h-full">
      <div className="basis-1/4">
        <Sidebar />
      </div>
      <div className="basis-3/4 ml-6">{children}</div>
    </div>
  );
}

export default DashboardLayout;
