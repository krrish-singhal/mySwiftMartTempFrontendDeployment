import { useLocation, useNavigate } from "react-router-dom";

function getPrizeGradient(boxType) {
  switch (boxType) {
    case "Basic":
      return "from-red-500 via-red-600 to-red-700";
    case "Premium":
      return "from-yellow-400 via-yellow-500 to-yellow-600";
    case "Ultimate":
      return "from-green-500 via-green-600 to-green-700";
    default:
      return "from-blue-500 via-blue-600 to-blue-700";
  }
}

export default function Prize() {
  const location = useLocation();
  const navigate = useNavigate();
  const { prize, boxType } = location.state || {};

  if (!prize) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold mb-4 text-red-600">No Prize Found</h2>
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full" onClick={() => navigate("/")}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div
        className={`bg-gradient-to-br ${getPrizeGradient(boxType)} rounded-lg p-8 shadow-2xl text-white dark:text-white flex flex-col items-center`}
        style={{
          minWidth: 340,
          maxWidth: 400,
        }}
      >
        <img src={prize.image} alt={prize.name} className="w-32 h-32 rounded-lg shadow-lg mb-4" />
        <div className="text-2xl font-bold mb-2">{prize.name}</div>
        <div className="text-lg font-semibold mb-2">{prize.description}</div>
        <div className="text-3xl font-extrabold mb-4">₹{prize.worth}</div>
        <button
          className="mt-4 px-6 py-2 bg-white text-gray-800 rounded-full font-bold shadow-md hover:bg-gray-100 transition"
          onClick={() => navigate("/")}
        >
          Close
        </button>
      </div>
    </div>
  );
}
