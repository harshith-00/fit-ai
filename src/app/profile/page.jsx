"use client";
import React from "react";

function MainComponent() {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    age: 30,
    gender: "Male",
    phone: "+1 234 567 8900",
    email: "john@example.com",
    height: 175,
    weight: 70,
    medicalHistory: "No major conditions",
    avatar: "/default-avatar.jpg",
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadLoading(true);
    try {
      setProfileData((prev) => ({
        ...prev,
        avatar: URL.createObjectURL(file),
      }));
    } catch (err) {
      setError("Failed to upload image");
      console.error(err);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <a
            href="/"
            className="mr-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <i className="fas fa-arrow-left"></i>
          </a>
          <h1 className="text-2xl font-bold">Profile Settings</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-32 h-32">
              <img
                src={profileData.avatar}
                alt="Profile picture"
                className="w-32 h-32 rounded-full object-cover"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
                  <i className="fas fa-camera"></i>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
            {uploadLoading && (
              <p className="text-sm text-blue-400">Uploading...</p>
            )}
            {error && <p className="text-sm text-red-400">{error}</p>}
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-gray-400">Name</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, name: e.target.value }))
                }
                disabled={!isEditing}
                className="w-full bg-gray-700 rounded-lg p-2 disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-400">Age</label>
              <input
                type="number"
                name="age"
                value={profileData.age}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, age: e.target.value }))
                }
                disabled={!isEditing}
                className="w-full bg-gray-700 rounded-lg p-2 disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-400">Gender</label>
              <select
                name="gender"
                value={profileData.gender}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    gender: e.target.value,
                  }))
                }
                disabled={!isEditing}
                className="w-full bg-gray-700 rounded-lg p-2 disabled:opacity-50"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-gray-400">Phone</label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, phone: e.target.value }))
                }
                disabled={!isEditing}
                className="w-full bg-gray-700 rounded-lg p-2 disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, email: e.target.value }))
                }
                disabled={!isEditing}
                className="w-full bg-gray-700 rounded-lg p-2 disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-400">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={profileData.height}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    height: e.target.value,
                  }))
                }
                disabled={!isEditing}
                className="w-full bg-gray-700 rounded-lg p-2 disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-400">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={profileData.weight}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    weight: e.target.value,
                  }))
                }
                disabled={!isEditing}
                className="w-full bg-gray-700 rounded-lg p-2 disabled:opacity-50"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-gray-400">Medical History</label>
              <textarea
                name="medicalHistory"
                value={profileData.medicalHistory}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    medicalHistory: e.target.value,
                  }))
                }
                disabled={!isEditing}
                rows="4"
                className="w-full bg-gray-700 rounded-lg p-2 disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-6 py-2 rounded-lg transition-colors ${
              isEditing
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;