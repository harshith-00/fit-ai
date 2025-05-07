"use client";
import React from "react";

function MainComponent() {
  const [timeRange, setTimeRange] = useState("week");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const today = new Date();
        const data = {
          calories: {
            daily: Array.from({ length: 7 }, (_, i) => ({
              date: new Date(today - i * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0],
              value: Math.floor(Math.random() * 500 + 1500),
            })).reverse(),
            weekly: Array.from({ length: 4 }, () =>
              Math.floor(Math.random() * 3500 + 10500)
            ),
            monthly: Array.from({ length: 12 }, () =>
              Math.floor(Math.random() * 15000 + 42000)
            ),
          },
          steps: {
            daily: Array.from({ length: 7 }, (_, i) => ({
              date: new Date(today - i * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0],
              value: Math.floor(Math.random() * 4000 + 6000),
            })).reverse(),
            weekly: Array.from({ length: 4 }, () =>
              Math.floor(Math.random() * 28000 + 42000)
            ),
            monthly: Array.from({ length: 12 }, () =>
              Math.floor(Math.random() * 120000 + 180000)
            ),
          },
          distance: {
            daily: Array.from({ length: 7 }, (_, i) => ({
              date: new Date(today - i * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0],
              value: parseFloat((Math.random() * 3 + 4).toFixed(2)),
            })).reverse(),
            weekly: Array.from({ length: 4 }, () =>
              parseFloat((Math.random() * 21 + 28).toFixed(2))
            ),
            monthly: Array.from({ length: 12 }, () =>
              parseFloat((Math.random() * 90 + 120).toFixed(2))
            ),
          },
          workouts: {
            daily: Array.from({ length: 7 }, (_, i) => ({
              date: new Date(today - i * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0],
              value: Math.floor(Math.random() * 2 + 1),
            })).reverse(),
            weekly: Array.from({ length: 4 }, () =>
              Math.floor(Math.random() * 14 + 7)
            ),
            monthly: Array.from({ length: 12 }, () =>
              Math.floor(Math.random() * 60 + 30)
            ),
          },
        };
        setStats(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const renderChart = (data, color, type = "line") => {
    if (!data || data.length === 0) return null;

    const maxValue = Math.max(
      ...data.map((d) => (typeof d === "object" ? d.value : d))
    );
    const points = data.map((point, index) => {
      const value = typeof point === "object" ? point.value : point;
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (value / maxValue) * 90;
      return { x, y, value };
    });

    if (type === "line") {
      return (
        <svg className="w-full h-48" preserveAspectRatio="none">
          <defs>
            <linearGradient
              id={`gradient-${color}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={color} stopOpacity="0.2" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`
              M ${points[0].x} 100
              ${points.map((p) => `L ${p.x} ${p.y}`).join(" ")}
              L ${points[points.length - 1].x} 100
              Z
            `}
            fill={`url(#gradient-${color})`}
          />
          <path
            d={points
              .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
              .join(" ")}
            stroke={color}
            strokeWidth="2"
            fill="none"
          />
          {points.map((p, i) => (
            <circle key={i} cx={p.x + "%"} cy={p.y + "%"} r="4" fill={color} />
          ))}
        </svg>
      );
    }

    return null;
  };

  const StatCard = ({ title, value, icon, change }) => (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-gray-400">{title}</div>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${icon.bg}`}
        >
          <i className={`fas fa-${icon.name} text-lg`}></i>
        </div>
      </div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <div
        className={`text-sm ${change >= 0 ? "text-green-500" : "text-red-500"}`}
      >
        <i className={`fas fa-arrow-${change >= 0 ? "up" : "down"} mr-1`}></i>
        {Math.abs(change)}% from last {timeRange}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <a
            href="/"
            className="mr-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <i className="fas fa-arrow-left"></i>
          </a>
          <h1 className="text-2xl font-bold">Fitness Statistics</h1>
          <div className="ml-auto flex space-x-2">
            <button
              onClick={() => setTimeRange("week")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeRange === "week"
                  ? "bg-blue-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange("month")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeRange === "month"
                  ? "bg-blue-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeRange("year")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeRange === "year"
                  ? "bg-blue-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              Year
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <i className="fas fa-spinner fa-spin text-3xl"></i>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Calories Burned"
                value={stats?.calories.daily[6].value.toLocaleString()}
                icon={{ name: "fire", bg: "bg-red-500/20" }}
                change={12}
              />
              <StatCard
                title="Steps"
                value={stats?.steps.daily[6].value.toLocaleString()}
                icon={{ name: "shoe-prints", bg: "bg-blue-500/20" }}
                change={8}
              />
              <StatCard
                title="Distance"
                value={`${stats?.distance.daily[6].value} km`}
                icon={{ name: "route", bg: "bg-green-500/20" }}
                change={15}
              />
              <StatCard
                title="Workouts"
                value={stats?.workouts.daily[6].value}
                icon={{ name: "dumbbell", bg: "bg-purple-500/20" }}
                change={-5}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Calories Burned</h3>
                {renderChart(
                  timeRange === "week"
                    ? stats?.calories.daily
                    : timeRange === "month"
                    ? stats?.calories.weekly
                    : stats?.calories.monthly,
                  "#ef4444"
                )}
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Steps</h3>
                {renderChart(
                  timeRange === "week"
                    ? stats?.steps.daily
                    : timeRange === "month"
                    ? stats?.steps.weekly
                    : stats?.steps.monthly,
                  "#3b82f6"
                )}
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Distance (km)</h3>
                {renderChart(
                  timeRange === "week"
                    ? stats?.distance.daily
                    : timeRange === "month"
                    ? stats?.distance.weekly
                    : stats?.distance.monthly,
                  "#22c55e"
                )}
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Workouts</h3>
                {renderChart(
                  timeRange === "week"
                    ? stats?.workouts.daily
                    : timeRange === "month"
                    ? stats?.workouts.weekly
                    : stats?.workouts.monthly,
                  "#a855f7"
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .bg-gray-800 {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;