import { useMemo, useState } from "react";
import "./users.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const initialUsers = [
  {
    id: 1,
    name: "Arun Kumar",
    email: "arun@example.com",
    role: "Admin",
    status: "Active",
    joined: "2026-09-12",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@example.com",
    role: "Editor",
    status: "Active",
    joined: "2026-09-18",
  },
  {
    id: 3,
    name: "Rahul Verma",
    email: "rahul@example.com",
    role: "Viewer",
    status: "Inactive",
    joined: "2026-09-22",
  },
  {
    id: 4,
    name: "Sneha Patel",
    email: "sneha@example.com",
    role: "Editor",
    status: "Active",
    joined: "2026-09-25",
  },
  {
    id: 5,
    name: "Karthik Raj",
    email: "karthik@example.com",
    role: "Viewer",
    status: "Active",
    joined: "2026-09-28",
  },
  {
    id: 6,
    name: "Divya Mohan",
    email: "divya@example.com",
    role: "Admin",
    status: "Inactive",
    joined: "2026-10-01",
  },
  {
    id: 7,
    name: "Vikram Singh",
    email: "vikram@example.com",
    role: "Editor",
    status: "Active",
    joined: "2026-10-05",
  },
  {
    id: 8,
    name: "Meera Nair",
    email: "meera@example.com",
    role: "Viewer",
    status: "Active",
    joined: "2026-10-10",
  },
  {
    id: 9,
    name: "Sanjay Kumar",
    email: "sanjay@example.com",
    role: "Editor",
    status: "Inactive",
    joined: "2026-10-14",
  },
  {
    id: 10,
    name: "Ananya Rao",
    email: "ananya@example.com",
    role: "Viewer",
    status: "Active",
    joined: "2026-10-20",
  },
  {
    id: 11,
    name: "Naveen Kumar",
    email: "naveen@example.com",
    role: "Editor",
    status: "Active",
    joined: "2026-10-21",
  },
  {
    id: 12,
    name: "Ishita Das",
    email: "ishita@example.com",
    role: "Viewer",
    status: "Inactive",
    joined: "2026-10-22",
  },
];

const emptyForm = {
  name: "",
  email: "",
  role: "Viewer",
  status: "Active",
};

const userValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .required("Full name is required"),

  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email address is required"),

  role: Yup.string()
    .oneOf(["Admin", "Editor", "Viewer"], "Select a valid role")
    .required("Role is required"),

  status: Yup.string()
    .oneOf(["Active", "Inactive"], "Select a valid status")
    .required("Status is required"),
});

function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  const pageSize = 5;

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * pageSize;

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + pageSize
  );

  const openAddForm = () => {
    setEditingUserId(null);
    setForm(emptyForm);
    setFormError("");
    setIsFormOpen(true);
  };

  const openEditForm = (user) => {
    setEditingUserId(user.id);

    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });

    setFormError("");
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingUserId(null);
    setForm(emptyForm);
    setFormError("");
  };

 

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    const name = values.name.trim();
    const email = values.email.trim().toLowerCase();

    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() === email &&
        user.id !== editingUserId
    );

    if (emailExists) {
      setStatus("A user with this email already exists.");
      setSubmitting(false);
      return;
    }

    if (editingUserId !== null) {
      setUsers((previousUsers) =>
        previousUsers.map((user) =>
          user.id === editingUserId
            ? { ...user, ...values, name, email }
            : user
        )
      );
    } else {
      const newUser = {
        id: Math.max(0, ...users.map((user) => user.id)) + 1,
        name,
        email,
        role: values.role,
        status: values.status,
        joined: new Date().toISOString().slice(0, 10),
      };

      setUsers((previousUsers) => [newUser, ...previousUsers]);
      setCurrentPage(1);
    }

    closeForm();
    setSubmitting(false);
  };

  const handleDelete = (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );

    if (!confirmed) return;

    setUsers((previousUsers) =>
      previousUsers.filter((item) => item.id !== user.id)
    );

    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="users-page">
      <header className="users-header">
        <div>
          <h1>Users</h1>
          <p>Manage your team members and their access.</p>
        </div>

        <button className="primary-button" onClick={openAddForm}>
          + Add User
        </button>
      </header>

      <section className="users-card">
        <div className="users-toolbar">
          <input
            type="search"
            className="users-search"
            placeholder="Search by name or email..."
            value={search}
            onChange={handleSearchChange}
            aria-label="Search users"
          />

          <select
            className="users-filter"
            value={statusFilter}
            onChange={handleStatusChange}
            aria-label="Filter users by status"
          >
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Date Joined</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-identity">
                      <div className="user-avatar">
                        {user.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>{user.role}</td>

                  <td>
                    <span
                      className={`user-status ${user.status.toLowerCase()}`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td>
                    {new Date(`${user.joined}T00:00:00`).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>

                  <td>
                    <div className="user-actions">
                      <button
                        className="action-button"
                        onClick={() => openEditForm(user)}
                        aria-label={`Edit ${user.name}`}
                      >
                        Edit
                      </button>

                      <button
                        className="action-button delete-action"
                        onClick={() => handleDelete(user)}
                        aria-label={`Delete ${user.name}`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {paginatedUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No users found. Try changing your search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="users-pagination">
          <span>
            Showing{" "}
            {filteredUsers.length === 0 ? 0 : startIndex + 1}–
            {Math.min(startIndex + pageSize, filteredUsers.length)} of{" "}
            {filteredUsers.length} users
          </span>

          <div className="pagination-buttons">
            <button
              className="pagination-button"
              disabled={safeCurrentPage === 1}
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
            >
              Previous
            </button>

            <span>
              Page {safeCurrentPage} of {totalPages}
            </span>

            <button
              className="pagination-button"
              disabled={safeCurrentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
            >
              Next
            </button>
          </div>
        </footer>
      </section>

      {isFormOpen && (
        <div className="modal-overlay">
          <section
            className="user-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-modal-title"
          >
            <header className="modal-header">
              <div>
                <h2 id="user-modal-title">
                  {editingUserId !== null ? "Edit User" : "Add User"}
                </h2>

                <p>
                  {editingUserId !== null
                    ? "Update the user's information."
                    : "Enter the details for the new team member."}
                </p>
              </div>

              <button
                className="modal-close"
                onClick={closeForm}
                aria-label="Close form"
              >
                ×
              </button>
            </header>


            <Formik
              initialValues={form}
              validationSchema={userValidationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting, status }) => (
                <Form>
                  <div className="form-field">
                    <label htmlFor="user-name">Full Name</label>
                    <Field
                      id="user-name"
                      name="name"
                      placeholder="Enter full name"
                      autoComplete="name"
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="form-error"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="user-email">Email Address</label>
                    <Field
                      id="user-email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      autoComplete="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="form-error"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="user-role">Role</label>
                    <Field id="user-role" name="role" as="select">
                      <option value="Admin">Admin</option>
                      <option value="Editor">Editor</option>
                      <option value="Viewer">Viewer</option>
                    </Field>
                    <ErrorMessage
                      name="role"
                      component="p"
                      className="form-error"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="user-status">Status</label>
                    <Field id="user-status" name="status" as="select">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="p"
                      className="form-error"
                    />
                  </div>

                  {status && (
                    <p className="form-error" role="alert">
                      {status}
                    </p>
                  )}

                  <footer className="modal-actions">
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={closeForm}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="primary-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Saving..."
                        : editingUserId !== null
                          ? "Save Changes"
                          : "Create User"}
                    </button>
                  </footer>
                </Form>
              )}
            </Formik>

          </section>
        </div>
      )}
    </div>
  );
}

export default Users;