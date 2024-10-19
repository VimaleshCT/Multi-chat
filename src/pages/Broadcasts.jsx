import React, { useState } from 'react';
import Newbroadcast from '../components/Newbroadcast'; // Import the new component

const Broadcasts = () => {
  const [isNewBroadcast, setIsNewBroadcast] = useState(false);

  // Sample data for drafts
  const [drafts] = useState([
    { type: 'Content', name: 'Content', lastEdit: '6 Sep 2024, 11:40 (UTC +05:30)' },
    { type: 'Content', name: 'Content', lastEdit: '6 Sep 2024, 11:37 (UTC +05:30)' },
    { type: 'Content', name: 'Content', lastEdit: '3 Sep 2024, 22:14 (UTC +05:30)' },
    { type: 'Content', name: 'Content', lastEdit: '30 Aug 2024, 16:28 (UTC +05:30)' },
  ]);

  // Placeholder for history section
  const [history] = useState([]);

  // Handle New Broadcast
  const handleNewBroadcastClick = () => {
    setIsNewBroadcast(true); // Show the new broadcast UI when button is clicked
  };

  return (
    <div className="p-8">
      {!isNewBroadcast ? (
        // Drafts Page
        <>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Broadcasts</h1>
            <div className="flex space-x-2">
              <button className="bg-white text-gray-600 border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:bg-gray-100">
                Broadcast From Automation
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-sm"
                onClick={handleNewBroadcastClick}
              >
                New Broadcast
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4">Drafts</h2>
            <div className="overflow-auto">
              <table className="min-w-full bg-white border border-gray-200 shadow-sm">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Type</th>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Name</th>
                    <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Last Edit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {drafts.map((draft, index) => (
                    <tr key={index}>
                      <td className="py-4 px-6 text-sm text-gray-700">{draft.type}</td>
                      <td className="py-4 px-6 text-sm text-gray-700">{draft.name}</td>
                      <td className="py-4 px-6 text-sm text-gray-700">{draft.lastEdit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4">History</h2>
            {history.length === 0 ? (
              <div className="py-4 text-center text-gray-500">Nothing is here</div>
            ) : (
              <div> {/* History table content goes here */} </div>
            )}
          </div>
        </>
      ) : (
        // Render the new component when creating a new broadcast
        <Newbroadcast />
      )}
    </div>
  );
};

export default Broadcasts;
