import React, { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, onSave, editingContact }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
    consent: false,
  });

  // Update form data when editingContact changes
  useEffect(() => {
    if (editingContact) {
      setFormData({
        firstName: editingContact.firstName,
        lastName: editingContact.lastName,
        phone: editingContact.phone,
        email: editingContact.email,
        gender: editingContact.gender,
        consent: editingContact.consent,
      });
    }
  }, [editingContact]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose(); // Close modal after saving
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {editingContact ? "Edit Contact" : "Create New Contact"}
        </h2>
        <form>
          <div className="mb-3">
            <label className="block text-sm">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
            >
              <option value="">Select a gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm">
              I confirm consent to send messages in compliance with applicable
              laws.
            </label>
          </div>
        </form>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingContact ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
