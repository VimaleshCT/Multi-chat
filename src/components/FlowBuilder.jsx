import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
  applyEdgeChanges,
  applyNodeChanges,
  Handle,
} from 'react-flow-renderer';
import Modal from 'react-modal';

// Custom Node Component for Input Nodes
const CustomNode = ({ data }) => {
  return (
    <div className="custom-node">
      <div className="node-content">
        <p className="text-xl font-semibold">{data.label}</p>
        <p>{data.message || "No message set"}</p>
        {data.options && (
          <ul>
            {data.options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        )}
      </div>
      <Handle type="source" position="right" />
    </div>
  );
};

// Initial Nodes and Edges
const initialNodes = [];
const initialEdges = [];

// Main Flow Builder Component
const FlowBuilder = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState({ message: '', options: [], acceptMedia: false, variable: '' });
  const [currentNodeType, setCurrentNodeType] = useState('');

  // Handle changes for nodes
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // Handle changes for edges
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // Handle new connections between nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // Open modal and set node type
  const openModal = (type) => {
    setCurrentNodeType(type);
    setModalData({ message: '', options: [], acceptMedia: false, variable: '' }); // Reset modal data for a new node
    setModalIsOpen(true);
  };

  // Handle modal form submission
  const handleModalSubmit = () => {
    const id = (nodes.length + 1).toString();
    const newNode = {
      id,
      type: 'customNode', // This defines it as a custom node
      data: {
        label: currentNodeType,
        message: modalData.message || '',
        options: modalData.options || [],
        acceptMedia: modalData.acceptMedia,
        variable: modalData.variable || '',
      },
      position: { x: Math.random() * 400, y: Math.random() * 400 }, // Random position
    };
    setNodes((nds) => [...nds, newNode]);
    setModalIsOpen(false); // Close modal after submit
  };

  // Handle input changes for the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  };

  // Handle media toggle
  const handleMediaToggle = () => {
    setModalData({ ...modalData, acceptMedia: !modalData.acceptMedia });
  };

  return (
    <ReactFlowProvider>
      <div style={{ height: '90vh', width: '100%' }}>
        {/* Controls to add WhatsApp Trigger, Action, and Condition */}
        <div className="flex space-x-4 p-4">
          <button className="bg-gray-200 p-3 rounded-md" onClick={() => openModal('Send a Message')}>
            Send a message
          </button>
          <button className="bg-gray-200 p-3 rounded-md" onClick={() => openModal('Ask a Question')}>
            Ask a question
          </button>
          <button className="bg-gray-200 p-3 rounded-md" onClick={() => openModal('Set a Condition')}>
            Set a condition
          </button>
        </div>

        {/* React Flow Component */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={{ customNode: CustomNode }}
          fitView
          style={{ width: '100%', height: '80vh' }}
        >
          <MiniMap />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>

        {/* Modal for adding node content */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Node Content"
          style={{
            overlay: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            },
            content: {
              width: '400px',
              padding: '20px',
              borderRadius: '8px',
              inset: 'auto',
            },
          }}
        >
          <h2 className="text-xl font-bold mb-4">{currentNodeType}</h2>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Question Text</label>
            <textarea
              name="message"
              className="border p-2 w-full rounded"
              value={modalData.message}
              onChange={handleInputChange} 
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Add Answer Variant</label>
            <input
              name="options"
              className="border p-2 w-full rounded"
              type="text"
              placeholder="Add Answer Variant"
              value={modalData.options[0] || ''}
              onChange={(e) => setModalData({ ...modalData, options: [e.target.value] })}
            />
            <button className="mt-2 bg-green-500 text-white rounded px-4 py-1">
              Create
            </button>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Accept Media Response</label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={modalData.acceptMedia}
                onChange={handleMediaToggle}
              />
              <span className="ml-2">Accept a media response</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Save Answers in a variable</label>
            <input
              name="variable"
              className="border p-2 w-full rounded"
              type="text"
              placeholder="@variable"
              value={modalData.variable}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              className="bg-gray-300 text-black rounded px-4 py-2"
              onClick={() => setModalIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white rounded px-4 py-2"
              onClick={handleModalSubmit}
            >
              Save
            </button>
          </div>
        </Modal>
      </div>
    </ReactFlowProvider>
  );
};

export default FlowBuilder;
