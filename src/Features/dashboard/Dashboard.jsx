import "./../../styles/Dashboard.css";

const stats = [
  {
    title: "Total Users",
    value: "2,450",
    change: "+12.5%",
    description: "from last month",
    icon: "👥",
  },
  {
    title: "Active Users",
    value: "1,892",
    change: "+8.2%",
    description: "from last month",
    icon: "🟢",
  },
  {
    title: "Pending Invitations",
    value: "48",
    change: "-3.1%",
    description: "from last month",
    icon: "✉️",
  },
  {
    title: "Total Roles",
    value: "12",
    change: "+2",
    description: "new roles added",
    icon: "🛡️",
  },
];

const activities = [
  {
    id: 1,
    user: "Arun Kumar",
    action: "Created a new account",
    date: "Oct 26, 2026",
    status: "Completed",
  },
  {
    id: 2,
    user: "Priya Sharma",
    action: "Updated user permissions",
    date: "Oct 26, 2026",
    status: "Completed",
  },
  {
    id: 3,
    user: "Rahul Verma",
    action: "Invited a new team member",
    date: "Oct 25, 2026",
    status: "Pending",
  },
  {
    id: 4,
    user: "Sneha Patel",
    action: "Updated account settings",
    date: "Oct 25, 2026",
    status: "Completed",
  },
];

function Dashboard() {
  return (
    <div className="dashboard">
      <section className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening with your workspace.</p>
        </div>

        <button className="dashboard-date-button">
          📅 Last 30 days
        </button>
      </section>

      <section className="stats-grid">
        {stats.map((stat) => (
          <article className="stat-card" key={stat.title}>
            <div className="stat-card-top">
              <span className="stat-title">{stat.title}</span>
              <span className="stat-icon">{stat.icon}</span>
            </div>

            <h2>{stat.value}</h2>

            <p className="stat-description">
              <span className="stat-change">{stat.change}</span>{" "}
              {stat.description}
            </p>
          </article>
        ))}
      </section>

      <section className="dashboard-section activity-section">
        <div className="section-header">
          <div>
            <h2>Recent Activity</h2>
            <p>Recent actions performed in your workspace.</p>
          </div>

          <button className="text-button">View all</button>
        </div>

        <div className="table-container">
          <table className="activity-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Activity</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.user}</td>
                  <td>{activity.action}</td>
                  <td>{activity.date}</td>
                  <td>
                    <span
                      className={`status-badge ${activity.status.toLowerCase()}`}
                    >
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;