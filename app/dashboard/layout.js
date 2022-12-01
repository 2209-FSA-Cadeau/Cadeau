import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  return (
    <section>
        <Sidebar />
        {children}
    </section>
  );
}

export default DashboardLayout;
