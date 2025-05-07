"use client";
import React from "react";

function MainComponent() {
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      category: "Weekly Streaks",
      title: "7-Day Warrior",
      description: "Complete your move goal for 7 consecutive days",
      icon: "medal",
      achieved: true,
      date: "2025-01-15",
      color: "text-yellow-500",
    },
    {
      id: 2,
      category: "Monthly Streaks",
      title: "30-Day Champion",
      description: "Complete your move goal for 30 consecutive days",
      icon: "trophy",
      achieved: false,
      color: "text-purple-500",
    },
    {
      id: 3,
      category: "Move Goals",
      title: "Double Trouble",
      description: "Exceed 200% of your daily move goal",
      icon: "fire",
      achieved: true,
      date: "2025-01-10",
      color: "text-red-500",
    },
    {
      id: 4,
      category: "Distance",
      title: "Century Club",
      description: "Run or walk 100km total",
      icon: "road",
      achieved: true,
      date: "2025-01-05",
      color: "text-blue-500",
    },
    {
      id: 5,
      category: "Distance",
      title: "Road Warrior",
      description: "Run or walk 500km total",
      icon: "route",
      achieved: false,
      color: "text-green-500",
    },
    {
      id: 6,
      category: "Distance",
      title: "Marathon Master",
      description: "Run or walk 1000km total",
      icon: "running",
      achieved: false,
      color: "text-indigo-500",
    },
    {
      id: 7,
      category: "Steps",
      title: "Step Master",
      description: "Reach 10,000 steps in one day",
      icon: "shoe-prints",
      achieved: true,
      date: "2025-01-01",
      color: "text-orange-500",
    },
    {
      id: 8,
      category: "Steps",
      title: "Step Legend",
      description: "Reach 50,000 steps total",
      icon: "boots",
      achieved: true,
      date: "2025-01-08",
      color: "text-pink-500",
    },
    {
      id: 9,
      category: "Workout Streaks",
      title: "Workout Warrior",
      description: "Complete workouts for 3 consecutive days",
      icon: "dumbbell",
      achieved: true,
      date: "2025-01-12",
      color: "text-teal-500",
    },
  ]);

  const categories = [...new Set(achievements.map((a) => a.category))];

  return (
    <div
      className="min-h-screen text-white p-4 relative"
      style={{
        backgroundImage:
          "url('https://ucarecdn.com/f94d010a-bef8-46c1-922e-42afea4b123d/-/format/auto/')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <a
              href="/"
              className="mr-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <i className="fas fa-arrow-left"></i>
            </a>
            <h1 className="text-3xl font-bold">Achievements</h1>
          </div>

          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements
                  .filter((achievement) => achievement.category === category)
                  .map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`bg-gray-800 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 ${
                        achievement.achieved
                          ? "border-l-4 border-" +
                            achievement.color.replace("text-", "")
                          : "opacity-50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className={`text-3xl ${achievement.color}`}>
                          <i
                            className={`fas fa-${
                              achievement.achieved ? achievement.icon : "lock"
                            } animate-bounce`}
                          ></i>
                        </div>
                        {achievement.achieved && (
                          <span className="text-sm text-gray-400">
                            {new Date(achievement.date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold mt-4">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-2">
                        {achievement.description}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <style jsx global>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .animate-bounce {
            animation: bounce 2s infinite;
          }
        `}</style>
      </div>
    </div>
  );
}

export default MainComponent;