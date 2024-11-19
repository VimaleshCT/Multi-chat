import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For handling redirection

// Dummy data for users
const initialUsers = [
  { id: 1, name: "Vimal", role: "Admin" },
  { id: 2, name: "Logi", role: "User" },
];

const Settings = () => {
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ id: null, name: "", role: "" });
  const [formError, setFormError] = useState(""); // For handling errors
  const [profile, setProfile] = useState({
    phoneNumber: "+14798024855",
    description: "Multichat Trial Sandbox",
    businessWebsite1: "https://wati.io",
  });

  const navigate = useNavigate(); // Use `useNavigate` for redirection

  const handleAddUser = () => {
    if (!newUser.name || !newUser.role) {
      setFormError("Please enter both name and role.");
      return;
    }

    // Adding user logic
    if (newUser.id) {
      // If editing an existing user
      setUsers(users.map((user) => (user.id === newUser.id ? newUser : user)));
    } else {
      // If adding a new user
      setUsers([
        ...users,
        { id: users.length + 1, name: newUser.name, role: newUser.role },
      ]);
    }

    // Reset form and clear error
    setNewUser({ id: null, name: "", role: "" });
    setFormError("");
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditUser = (user) => {
    // Set the user details in the form for editing
    setNewUser(user);
  };

  const handleDeleteUser = (id) => {
    // Remove user by id
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleProfileChangeForSettings = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTemplateRedirect = () => {
    // Redirect to Template Selection Page
    navigate("/template-selection"); // This is the route for selecting templates
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>

        {/* User Management Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            User Management
          </h2>

          {/* Add/Edit User Form */}
          <div className="mb-4">
            <h3 className="text-lg">
              {newUser.id ? "Edit User" : "Add New User"}
            </h3>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={newUser.name}
              onChange={handleProfileChange}
              className="p-2 border rounded mb-2"
            />
            <input
              type="text"
              placeholder="Role"
              name="role"
              value={newUser.role}
              onChange={handleProfileChange}
              className="p-2 border rounded mb-2"
            />
            {formError && (
              <p className="text-red-500 text-sm mt-2">{formError}</p>
            )}
            <button
              onClick={handleAddUser}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {newUser.id ? "Save Changes" : "Add User"}
            </button>
          </div>

          {/* Display Users */}
          <h3 className="text-lg">Users</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="border-b py-2 flex justify-between">
                <div>
                  <span>{user.name}</span> - <span>{user.role}</span>
                </div>
                <div>
                  <button
                    onClick={() => handleEditUser(user)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Account Personalization Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Account Personalization
          </h2>
          <div className="mb-4">
            <label className="block mb-2">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleProfileChangeForSettings}
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={profile.description}
              onChange={handleProfileChangeForSettings}
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Business Website</label>
            <input
              type="text"
              name="businessWebsite1"
              value={profile.businessWebsite1}
              onChange={handleProfileChangeForSettings}
              className="p-2 border rounded w-full"
            />
          </div>

          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Save Changes
          </button>
        </div>

        {/* Template Section */}
        <div className="mt-8">
          <button
            onClick={handleTemplateRedirect}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Create Account Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
