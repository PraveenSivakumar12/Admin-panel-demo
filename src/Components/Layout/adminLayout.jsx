import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./sideBar";
import Navbar from "./Navbar";

import "./../../styles/Layout.css";

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  function handleMenuClick() {
    setIsSidebarOpen((previousState) => !previousState);
  }

  return (
    <div
      className={`admin-layout ${
        isSidebarOpen ? "" : "sidebar-collapsed"
      }`}
    >
      <Sidebar />

      <div className="main-layout">
        <Navbar onMenuClick={handleMenuClick} />

        <main className="main-panel">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;