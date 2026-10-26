import "./../../styles/Layout.css";

function MainPanel({ children }) {
  return (
    <main className="main-panel">
      {children}
    </main>
  );
}

export default MainPanel;