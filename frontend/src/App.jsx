import React from "react";
import "./tailwind.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Automations from "./pages/Automations";
import FlowBuilder from "./components/FlowBuilder";
import Template from "./components/Template"; // Changed from TemplateSelection to Template
import PhonePreview from "./components/Phonepreview";
import Broadcasts from "./pages/Broadcasts";
import Contacts from "./pages/Contacts";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import TemplateName from "./components/TemplateName";
import TemplateCreated from "./components/TemplateCreated";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar /> {/* Render Sidebar globally */}
        <div className="flex-1 p-6">
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Home />} /> {/* Home route */}
            <Route path="/automations" element={<Automations />} />
            <Route
              path="/automations/flow-builder/:templateName"
              element={<FlowBuilder />}
            />
            <Route
              path="/automations/flow-builder/preview"
              element={
                <PhonePreview message="This is the automated message preview" />
              }
            />
            <Route path="/broadcasts" element={<Broadcasts />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/settings" element={<Settings />} />
            {/* Template Creation Routes */}
            <Route path="/template-selection" element={<Template />} />{" "}
            {/* Renamed to Template */}
            <Route path="/template-name" element={<TemplateName />} />
            <Route path="/template-created" element={<TemplateCreated />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
