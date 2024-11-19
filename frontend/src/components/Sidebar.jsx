import React, { useState } from "react";
import { FaHome, FaUsers, FaBolt, FaComments, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [selected, setSelected] = useState("home");

  const menuItems = [
    { name: "Home", icon: <FaHome />, id: "home", route: "/" },
    { name: "Contacts", icon: <FaUsers />, id: "contacts", route: "/contacts" },
    {
      name: "Automation",
      icon: <FaBolt />,
      id: "automation",
      route: "/automations",
    },
    {
      name: "Broadcasts",
      icon: <FaComments />,
      id: "broadcasts",
      route: "/broadcasts",
    },
    { name: "Settings", icon: <FaCog />, id: "settings", route: "/settings" },
  ];

  return (
    <aside className="w-64 bg-gray-100 p-4 shadow-lg h-screen">
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
              selected === item.id
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {item.icon}
            <Link to={item.route}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
