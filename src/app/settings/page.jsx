"use client";
import React from "react";

function MainComponent() {
  const [settings, setSettings] = useState({
    notifications: {
      pushEnabled: true,
      emailEnabled: false,
      achievementAlerts: true,
      goalReminders: true,
      weeklyReport: true,
    },
    privacy: {
      shareActivity: true,
      showProfile: true,
      allowDataAnalytics: true,
    },
    sync: {
      autoSync: true,
      syncInterval: "hourly",
      backupEnabled: false,
    },
    theme: "dark",
    units: "metric",
    language: "english",
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
  };

  const handleSimpleSetting = (setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <a
            href="/"
            className="mr-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <i className="fas fa-arrow-left"></i>
          </a>
          <h1 className="text-2xl font-bold flex items-center">
            <i className="fas fa-cog mr-2"></i>
            Settings
          </h1>
        </div>

        <div className="space-y-6">
          <section className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">App Preferences</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Theme</span>
                <select
                  value={settings.theme}
                  onChange={(e) => handleSimpleSetting("theme", e.target.value)}
                  className="bg-gray-700 rounded px-3 py-1"
                >
                  <option value="dark">Dark Mode</option>
                  <option value="light">Light Mode</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <span>Units</span>
                <select
                  value={settings.units}
                  onChange={(e) => handleSimpleSetting("units", e.target.value)}
                  className="bg-gray-700 rounded px-3 py-1"
                >
                  <option value="metric">Metric</option>
                  <option value="imperial">Imperial</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <span>Language</span>
                <select
                  value={settings.language}
                  onChange={(e) =>
                    handleSimpleSetting("language", e.target.value)
                  }
                  className="bg-gray-700 rounded px-3 py-1"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <div className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <button
                    onClick={() =>
                      handleSettingChange("notifications", key, !value)
                    }
                    className={`w-12 h-6 rounded-full transition-colors ${
                      value ? "bg-blue-600" : "bg-gray-600"
                    } relative`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        value ? "right-1" : "left-1"
                      }`}
                    ></div>
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Privacy</h2>
            <div className="space-y-4">
              {Object.entries(settings.privacy).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <button
                    onClick={() => handleSettingChange("privacy", key, !value)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      value ? "bg-blue-600" : "bg-gray-600"
                    } relative`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        value ? "right-1" : "left-1"
                      }`}
                    ></div>
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Data Sync</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Auto Sync</span>
                <button
                  onClick={() =>
                    handleSettingChange(
                      "sync",
                      "autoSync",
                      !settings.sync.autoSync
                    )
                  }
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.sync.autoSync ? "bg-blue-600" : "bg-gray-600"
                  } relative`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                      settings.sync.autoSync ? "right-1" : "left-1"
                    }`}
                  ></div>
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span>Sync Interval</span>
                <select
                  value={settings.sync.syncInterval}
                  onChange={(e) =>
                    handleSettingChange("sync", "syncInterval", e.target.value)
                  }
                  className="bg-gray-700 rounded px-3 py-1"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">App Information</h2>
            <div className="space-y-2 text-gray-400">
              <p>Version: 1.0.0</p>
              <p>© 2025 Fitness Tracker</p>
              <div className="flex space-x-4 mt-4">
                <button className="text-blue-400 hover:text-blue-300">
                  Privacy Policy
                </button>
                <button className="text-blue-400 hover:text-blue-300">
                  Terms of Service
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;