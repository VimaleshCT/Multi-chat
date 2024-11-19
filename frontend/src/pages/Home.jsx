import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const [analytics, setAnalytics] = useState({
    monthlyMessages: 7,
    totalMessages: 7,
    broadcasts: { sent: 2, failed: 5 },
    automations: { sent: 1, failed: 4 },
  });

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/analytics")
      .then((response) => {
        if (response.data) {
          setAnalytics(response.data);

          // Dynamically setup chart data with current and next month data
          setChartData({
            labels: ["This Month", "Next Month"], // Only two months
            datasets: [
              {
                label: "Messages Sent",
                data: [
                  response.data.monthlyMessages ?? 7, // Current month data
                  response.data.monthlyMessages + 10, // Next month (example incremental data)
                ],
                backgroundColor: "rgba(75, 192, 192, 0.8)", // Bar color
              },
              {
                label: "Automations Sent",
                data: [
                  response.data.automations?.sent ?? 1, // Current month data
                  response.data.automations?.sent + 5, // Next month (example incremental data)
                ],
                backgroundColor: "rgba(255, 159, 64, 0.8)", // Bar color
              },
              {
                label: "Bulk Messages Sent",
                data: [
                  response.data.broadcasts?.sent ?? 2, // Current month data
                  response.data.broadcasts?.sent + 5, // Next month (example incremental data)
                ],
                backgroundColor: "rgba(153, 102, 255, 0.8)", // Bar color
              },
            ],
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching analytics data:", error);
      });
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          WhatsApp Report
        </h1>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Message by Month</h2>
            <p>All messages sent this month</p>
            <p className="text-4xl font-bold mt-4">
              {analytics?.monthlyMessages ?? 7} / ∞
            </p>
          </div>

          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Total Messages Sent</h2>
            <p>The complete messages that have been successfully sent</p>
            <p className="text-4xl font-bold mt-4">
              {analytics?.totalMessages ?? 7}
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Bulk Messaging</h2>
            <div className="flex justify-between text-gray-600 mt-4">
              <div>
                <p>Total</p>
                <p className="text-2xl font-bold">
                  {analytics?.broadcasts?.sent ?? 2}
                </p>
              </div>
              <div>
                <p>Failed</p>
                <p className="text-2xl font-bold text-red-500">
                  {analytics?.broadcasts?.failed ?? 5}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Automation</h2>
            <p className="text-2xl font-bold text-gray-800">
              {analytics?.automations?.sent ?? 2}
            </p>
          </div>
        </div>

        {/* Bar Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-lg font-bold mb-4">Messages Sent Over Time</h2>
          <Bar data={chartData} options={{ responsive: true }} />
        </div>
      </main>
    </div>
  );
};

export default Home;
