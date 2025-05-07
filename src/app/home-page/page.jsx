"use client";
import React from "react";

function MainComponent() {
  const [moveGoal, setMoveGoal] = useState(500);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [stats, setStats] = useState({
    steps: 0,
    calories: 0,
    stairs: 0,
    distance: 0,
    walkingPace: 0,
    runningPace: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        steps: prev.steps + Math.floor(Math.random() * 10),
        calories: prev.calories + Math.floor(Math.random() * 5),
        stairs: prev.stairs + (Math.random() > 0.9 ? 1 : 0),
        distance: parseFloat((prev.distance + Math.random() * 0.01).toFixed(2)),
        walkingPace: parseFloat((4 + Math.random()).toFixed(1)),
        runningPace: parseFloat((8 + Math.random()).toFixed(1)),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Fitness Tracker</h1>
        <button className="p-2 rounded-full bg-gray-800">
          <i className="fas fa-user text-xl"></i>
        </button>
      </div>

      <div className="p-4 grid grid-cols-2 gap-4">
        <div className="bg-blue-500 rounded-xl p-4 transform hover:scale-105 transition-transform">
          <div className="flex justify-between items-center">
            <i className="fas fa-shoe-prints text-2xl"></i>
            <span className="text-sm">Steps</span>
          </div>
          <div className="text-2xl font-bold mt-2">
            {stats.steps.toLocaleString()}
          </div>
        </div>

        <div className="bg-red-500 rounded-xl p-4 transform hover:scale-105 transition-transform">
          <div className="flex justify-between items-center">
            <i className="fas fa-fire text-2xl"></i>
            <span className="text-sm">Calories</span>
          </div>
          <div className="text-2xl font-bold mt-2">
            {stats.calories} / {moveGoal}
          </div>
          {isEditingGoal ? (
            <input
              type="number"
              value={moveGoal}
              onChange={(e) => setMoveGoal(Number(e.target.value))}
              onBlur={() => setIsEditingGoal(false)}
              className="mt-2 w-20 bg-red-600 rounded px-2 py-1"
            />
          ) : (
            <button
              onClick={() => setIsEditingGoal(true)}
              className="text-xs mt-2"
            >
              Edit Goal
            </button>
          )}
        </div>

        <div className="bg-purple-500 rounded-xl p-4 transform hover:scale-105 transition-transform">
          <div className="flex justify-between items-center">
            <i className="fas fa-stairs text-2xl"></i>
            <span className="text-sm">Stairs</span>
          </div>
          <div className="text-2xl font-bold mt-2">{stats.stairs}</div>
        </div>

        <div className="bg-green-500 rounded-xl p-4 transform hover:scale-105 transition-transform">
          <div className="flex justify-between items-center">
            <i className="fas fa-route text-2xl"></i>
            <span className="text-sm">Distance</span>
          </div>
          <div className="text-2xl font-bold mt-2">{stats.distance} km</div>
        </div>

        <div className="bg-yellow-500 rounded-xl p-4 transform hover:scale-105 transition-transform">
          <div className="flex justify-between items-center">
            <i className="fas fa-walking text-2xl"></i>
            <span className="text-sm">Walking Pace</span>
          </div>
          <div className="text-2xl font-bold mt-2">
            {stats.walkingPace} km/h
          </div>
        </div>

        <div className="bg-orange-500 rounded-xl p-4 transform hover:scale-105 transition-transform">
          <div className="flex justify-between items-center">
            <i className="fas fa-running text-2xl"></i>
            <span className="text-sm">Running Pace</span>
          </div>
          <div className="text-2xl font-bold mt-2">
            {stats.runningPace} km/h
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
        <div className="flex justify-around items-center">
          <button className="p-2">
            <i className="fas fa-chart-bar text-xl"></i>
          </button>
          <button className="p-2">
            <i className="fas fa-medal text-xl"></i>
          </button>
          <button className="p-2">
            <i className="fas fa-utensils text-xl"></i>
          </button>
          <button className="p-2">
            <i className="fas fa-camera text-xl"></i>
          </button>
          <button className="p-2">
            <i className="fas fa-cog text-xl"></i>
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;