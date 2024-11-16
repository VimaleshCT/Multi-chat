import React, { useState, useEffect } from "react";
import Modal from "../components/modal"; // Import the modal component
import axios from "axios"; // Import axios
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify

const Contacts = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null); // For editing an existing contact
  const [file, setFile] = useState(null); // To store the uploaded file
  const [uploading, setUploading] = useState(false); // To indicate file upload in progress

  // Fetch contacts from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contacts")
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, []);

  // Function to handle saving a new contact or updating an existing contact
  const handleSaveContact = (newContact) => {
    if (editingContact) {
      // Update existing contact
      axios
        .put(
          `http://localhost:5000/api/contacts/${editingContact._id}`,
          newContact
        )
        .then((response) => {
          setContacts(
            contacts.map((contact) =>
              contact._id === editingContact._id ? response.data : contact
            )
          );
          setEditingContact(null); // Clear editing state
        })
        .catch((error) => {
          console.error("Error updating contact:", error);
        });
    } else {
      // Create new contact
      axios
        .post("http://localhost:5000/api/contacts", newContact)
        .then((response) => {
          setContacts([...contacts, response.data]); // Add new contact to the list
        })
        .catch((error) => {
          console.error("Error saving contact:", error);
        });
    }

    setModalOpen(false); // Close the modal after saving
  };

  // Function to handle deleting a contact
  const handleDeleteContact = (id) => {
    axios
      .delete(`http://localhost:5000/api/contacts/${id}`)
      .then(() => {
        setContacts(contacts.filter((contact) => contact._id !== id)); // Remove from UI
        toast.success("Contact deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting contact:", error);
        toast.error("Failed to delete contact");
      });
  };

  // Function to handle editing a contact
  const handleEditContact = (contact) => {
    setEditingContact(contact); // Set the contact being edited
    setModalOpen(true); // Open the modal for editing
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle CSV upload
  const handleUploadCsv = () => {
    if (!file) {
      toast.error("Please select a file before uploading.");
      return;
    }

    setUploading(true); // Set uploading state
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:5000/api/upload/csv", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure correct Content-Type
        },
      })
      .then((response) => {
        toast.success("CSV uploaded successfully");
        setFile(null); // Clear the file input after upload
        setUploading(false); // Reset uploading state
      })
      .catch((error) => {
        console.error("Error uploading CSV:", error); // Log error details
        const errorMessage =
          error.response?.data?.error ||
          "Unknown error occurred while uploading CSV";
        toast.error(`Error uploading CSV: ${errorMessage}`);
        setUploading(false); // Reset uploading state
      });
  };

  // Handle Excel upload
  const handleUploadExcel = () => {
    if (!file) return;
    setUploading(true); // Set uploading state
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:5000/api/upload/excel", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure correct Content-Type
        },
      })
      .then((response) => {
        toast.success("Excel uploaded successfully");
        setFile(null); // Clear the file input after upload
        setUploading(false); // Reset uploading state
      })
      .catch((error) => {
        console.error("Error uploading Excel:", error);
        toast.error(
          "Error uploading Excel: " +
            (error.response?.data?.error || "Unknown error")
        );
        setUploading(false); // Reset uploading state
      });
  };

  return (
    <div className="p-8">
      <ToastContainer /> {/* Add Toastr container */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <div>
          <button
            className="bg-white text-gray-600 border border-gray-300 px-4 py-2 mr-2 rounded-md shadow-sm hover:bg-gray-100"
            onClick={() => {
              setEditingContact(null); // Clear any editing state
              setModalOpen(true);
            }}
          >
            Create New Contact
          </button>

          {/* File Input for CSV/Excel */}
          <input type="file" onChange={handleFileChange} />

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-sm ml-2"
            onClick={handleUploadCsv}
            disabled={!file || uploading} // Disable button if no file is selected or uploading
          >
            {uploading ? "Uploading..." : "Upload CSV"}
          </button>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-sm ml-2"
            onClick={handleUploadExcel}
            disabled={!file || uploading} // Disable button if no file is selected or uploading
          >
            {uploading ? "Uploading..." : "Upload Excel"}
          </button>
        </div>
      </div>
      {/* Modal for creating/editing a contact */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingContact(null); // Clear editing state on close
        }}
        onSave={handleSaveContact} // Save new or updated contact
        editingContact={editingContact} // Pass the editing contact data
      />
      {/* Contact List */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Contact List</h2>
        <div className="overflow-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                  First Name
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                  Last Name
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                  Phone
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                  Gender
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contacts.map((contact, index) => (
                <tr key={index}>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {contact.firstName}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {contact.lastName}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {contact.phone}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {contact.email}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {contact.gender}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                      onClick={() => handleEditContact(contact)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDeleteContact(contact._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="py-4 px-6 text-center text-gray-500"
                  >
                    No contacts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
