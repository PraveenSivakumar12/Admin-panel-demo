import "./../../styles/Layout.css";

function Navbar({ onMenuClick }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          type="button"
          className="menu-button"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>

        <div className="navbar-search">
          <span>⌕</span>
          <input
            type="search"
            placeholder="Search anything..."
            aria-label="Search"
          />
          <kbd>Ctrl K</kbd>
        </div>
      </div>

      <div className="navbar-right">
        <button
          type="button"
          className="notification-button"
          aria-label="Notifications"
        >
          ♧
          <span className="notification-dot" />
        </button>

        <div className="navbar-divider" />

        <button type="button" className="navbar-profile">
          <div className="profile-avatar">P</div>

          <div className="profile-details">
            <strong>Praveen</strong>
            <span>Administrator</span>
          </div>

          <span className="profile-chevron">⌄</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;