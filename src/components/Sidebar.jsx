import { useState } from "react";
import { FaHome, FaUsers, FaBolt, FaComments, FaCog } from "react-icons/fa";
import Contacts from "../pages/Contacts"; 
import Broadcasts from "../pages/Broadcasts";
import Automations from "../pages/Automations";
import Home from "../pages/Home";


const Sidebar = () => {
  const [selected, setSelected] = useState("home");

  // Define the menu items for the sidebar
  const menuItems = [
    { name: "Home", icon: <FaHome className="h-6 w-6" />, id: "home" },
    { name: "Contacts", icon: <FaUsers className="h-6 w-6" />, id: "contacts" },
    { name: "Automation", icon: <FaBolt className="h-6 w-6" />, id: "automation" },
    { name: "Broadcasts", icon: <FaComments className="h-6 w-6" />, id: "broadcasts" },
    { name: "Settings", icon: <FaCog className="h-6 w-6" />, id: "settings" },
  ];

  // Content for each page
  const renderContent = () => {
    switch (selected) {
      case "home":
        return <Home/>
      case "contacts":
        return <Contacts />; // Render Contacts component
      case "automation":
        return <Automations/>;
      case "broadcasts":
        return <Broadcasts/>;
      case "settings":
        return (
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p>Adjust your account settings here.</p>
          </div>
        );
      default:
        return <p>Select an option from the sidebar</p>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 shadow-lg">
        <div className="flex items-center space-x-2 mb-6">
          <img src="src/assets/logo.jpg" alt="Logo" className="w-8 h-8" />
          <span className="font-bold text-lg">Multichat</span>
        </div>

        <ul>
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer ${
                selected === item.id ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>

        <div className="absolute bottom-0 w-full p-4">
          <div className="flex items-center space-x-2">
            <img
              src="https://randomuser.me/api/portraits/women/79.jpg"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-semibold">My Profile</span>
          </div>
        </div>
      </aside>

      {/* The content section */}
      <div className="flex-1 bg-white p-6">
        {/* Render the content based on the selected menu item */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Sidebar;
