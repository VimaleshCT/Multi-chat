import { FaWhatsapp } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-10">
      <h1 className="text-3xl font-bold">Send your first message to check out team inbox</h1>
      <p className="text-gray-600 text-center">
        You must send the WhatsApp Message starting with <span className="font-bold text-indigo-600"></span>
      </p>

      <div className="flex justify-between items-center w-3/4 space-x-8">
        {/* Left Section: Send a message */}
        <div className="w-1/2 bg-white shadow-lg p-6 rounded-lg flex flex-col items-center space-y-4">
          <h2 className="text-xl font-bold">Send a message</h2>
       

          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white flex items-center px-4 py-2 rounded-lg">
              <FaWhatsapp className="mr-2" /> WhatsApp Web
            </button>
            <button className="bg-blue-500 text-white flex items-center px-4 py-2 rounded-lg">
              <FaWhatsapp className="mr-2" /> WhatsApp Desktop App
            </button>
          </div>
        </div>

        {/* Right Section: QR code */}
        <div className="w-1/2 bg-white shadow-lg p-6 rounded-lg flex flex-col items-center space-y-4">
          <h2 className="text-xl font-bold">Scan the QR code</h2>
          <p className="text-gray-600 text-center">
            Use your phone camera to scan the below code. 
          </p>

          {/* Replace the source with your own QR code image */}
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://wa.me/14798024855" alt="QR Code" className="w-40 h-40" />
        </div>
      </div>
    </div>
  );
};

export default Home;
