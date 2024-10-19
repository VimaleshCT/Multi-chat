import React, { useState } from 'react';
import Modal from '../components/modal'; // Import the modal component

const Contacts = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [contacts, setContacts] = useState([]);

  // Function to handle saving a new contact
  const handleSaveContact = (newContact) => {
    setContacts([...contacts, newContact]); // Add new contact to the list
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <div>
          <button
            className="bg-white text-gray-600 border border-gray-300 px-4 py-2 mr-2 rounded-md shadow-sm hover:bg-gray-100"
            onClick={() => setModalOpen(true)} // Open modal on button click
          >
            Create New Contact
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-sm">
            Import
          </button>
        </div>
      </div>

      {/* Modal for creating new contact */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)} // Close modal
        onSave={handleSaveContact} // Save new contact
      />

      {/* Contact List */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Contact List</h2>
        <div className="overflow-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">First Name</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Last Name</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Phone</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Gender</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contacts.map((contact, index) => (
                <tr key={index}>
                  <td className="py-4 px-6 text-sm text-gray-700">{contact.firstName}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{contact.lastName}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{contact.phone}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{contact.email}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{contact.gender}</td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-4 px-6 text-center text-gray-500">
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
