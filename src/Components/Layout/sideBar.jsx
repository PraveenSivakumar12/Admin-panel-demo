import { NavLink } from "react-router-dom";

import "./../../styles/Layout.css";

const navigationItems = [
  { label: "Dashboard", icon: "▦", path: "/" },
  { label: "Users", icon: "♙", path: "/users" },
  { label: "Roles & Permissions", icon: "◈", path: "/roles" },
  { label: "Reports", icon: "▤", path: "/reports" },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">TA</div>
        <span>Tech Admin</span>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-heading">MAIN MENU</p>

        <nav className="sidebar-navigation">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <p className="sidebar-heading">PREFERENCES</p>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">⚙</span>
          <span>Settings</span>
        </NavLink>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-avatar">P</div>

        <div className="sidebar-user-info">
          <strong>Admin User</strong>
          <span>Administrator</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;