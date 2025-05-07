"use client";
import React from "react";

function MainComponent() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGoal, setSelectedGoal] = useState("all");

  const goals = [
    { id: "all", name: "All Goals", icon: "flag" },
    { id: "strength", name: "Strength", icon: "dumbbell" },
    { id: "muscle", name: "Muscle Gain", icon: "muscle" },
    { id: "fat", name: "Fat Loss", icon: "fire" },
    { id: "endurance", name: "Endurance", icon: "running" },
    { id: "flexibility", name: "Flexibility", icon: "child" },
    { id: "cardio", name: "Cardio", icon: "heartbeat" },
  ];

  const categories = [
    { id: "all", name: "All Exercises", icon: "user" },
    { id: "cardio", name: "Cardio", icon: "running" },
    { id: "chest", name: "Chest", icon: "user" },
    { id: "back", name: "Back", icon: "user" },
    { id: "legs", name: "Legs", icon: "shoe-prints" },
    { id: "arms", name: "Arms", icon: "user" },
    { id: "shoulders", name: "Shoulders", icon: "user" },
    { id: "core", name: "Core", icon: "user" },
    { id: "bodyweight", name: "Bodyweight", icon: "child" },
    { id: "hiit", name: "HIIT", icon: "bolt" },
  ];

  const workoutPlans = [
    {
      id: 1,
      name: "Bench Press",
      category: "chest",
      goals: ["strength", "muscle"],
      description: "Lie on bench, grip barbell, lower to chest, push up",
      sets: "4 sets of 8-12 reps",
      image:
        "https://ucarecdn.com/9740f10a-c1d2-4a50-8aa2-d19efab6e2f4/-/format/auto/",
    },
    {
      id: 2,
      name: "Deadlift",
      category: "back",
      goals: ["strength", "muscle"],
      description:
        "Stand with feet shoulder-width, bend to grip bar, lift with straight back",
      sets: "4 sets of 6-8 reps",
      image:
        "https://ucarecdn.com/9637dd7c-7492-4875-b17a-faa9cb4922d7/-/format/auto/",
    },
    {
      id: 3,
      name: "Squats",
      category: "legs",
      goals: ["strength", "muscle", "fat"],
      description:
        "Stand with barbell on shoulders, bend knees, return to standing",
      sets: "4 sets of 8-12 reps",
      image:
        "https://ucarecdn.com/5b1ac860-b857-4e06-9b87-3a1b4a8d7613/-/format/auto/",
    },
    {
      id: 4,
      name: "Bicep Curls",
      category: "arms",
      goals: ["muscle"],
      description: "Stand with dumbbells, curl weights up, lower slowly",
      sets: "3 sets of 12-15 reps",
      image:
        "https://ucarecdn.com/498675d9-8086-4ea2-91b2-82c91f0fc173/-/format/auto/",
    },
    {
      id: 5,
      name: "Shoulder Press",
      category: "shoulders",
      goals: ["strength", "muscle"],
      description: "Sit with dumbbells at shoulders, press up, lower slowly",
      sets: "4 sets of 8-12 reps",
      image:
        "https://ucarecdn.com/ec6c1daa-ded4-4853-af36-352f584165eb/-/format/auto/",
    },
    {
      id: 6,
      name: "Plank",
      category: "core",
      goals: ["endurance", "fat"],
      description: "Hold push-up position on forearms, keep body straight",
      sets: "3 sets of 30-60 seconds",
      image:
        "https://ucarecdn.com/34e78b02-0d6a-4ff4-9efb-4b6c9d65d030/-/format/auto/",
    },
    {
      id: 7,
      name: "Running",
      category: "cardio",
      goals: ["endurance", "fat", "cardio"],
      description: "Steady-state running at moderate pace",
      sets: "30-45 minutes",
      image:
        "https://ucarecdn.com/2e814847-b6bb-405c-b3f1-510a14807164/-/format/auto/",
    },
    {
      id: 8,
      name: "Sprints",
      category: "hiit",
      goals: ["fat", "cardio"],
      description: "Alternate between 30 seconds sprint and 30 seconds walk",
      sets: "10-15 rounds",
      image:
        "https://ucarecdn.com/c834e02f-c215-4016-8742-f6d7f94c6d97/-/format/auto/",
    },
    {
      id: 9,
      name: "Push-ups",
      category: "bodyweight",
      goals: ["strength", "muscle"],
      description:
        "Start in plank position, lower chest to ground, push back up",
      sets: "3 sets of 10-20 reps",
      image:
        "https://ucarecdn.com/1f51efee-4e4a-4d2d-ae37-513a90af14d6/-/format/auto/",
    },
    {
      id: 10,
      name: "Pull-ups",
      category: "bodyweight",
      goals: ["strength", "muscle"],
      description: "Hang from bar, pull yourself up until chin over bar",
      sets: "3 sets of 5-10 reps",
      image:
        "https://ucarecdn.com/618629e8-1b2a-41be-ae1a-aafec7e9fe2e/-/format/auto/",
    },
    {
      id: 11,
      name: "Sit-ups",
      category: "core",
      goals: ["strength", "fat"],
      description: "Lie on back, hands behind head, lift torso to knees",
      sets: "3 sets of 15-20 reps",
      image:
        "https://ucarecdn.com/9eee30d4-d4a3-41af-a387-ee11734b70c7/-/format/auto/",
    },
    {
      id: 12,
      name: "Crunches",
      category: "core",
      goals: ["strength", "fat"],
      description: "Lie on back, hands behind head, lift shoulders off ground",
      sets: "3 sets of 20-25 reps",
      image:
        "https://ucarecdn.com/796f5a42-4edd-49df-9488-6aa8c508062b/-/format/auto/",
    },
    {
      id: 13,
      name: "Leg Raises",
      category: "core",
      goals: ["strength", "fat"],
      description:
        "Lie on back, keep legs straight, lift them up to 90 degrees",
      sets: "3 sets of 12-15 reps",
      image:
        "https://ucarecdn.com/6d80acb8-6546-4f5c-9625-e906840bdcd7/-/format/auto/",
    },
    {
      id: 14,
      name: "Mountain Climbers",
      category: "hiit",
      goals: ["fat", "cardio", "core"],
      description: "Start in plank, alternate bringing knees to chest quickly",
      sets: "3 sets of 30 seconds",
      image:
        "https://ucarecdn.com/698fb3e6-da39-4e91-a91d-629141033e20/-/format/auto/",
    },
    {
      id: 15,
      name: "Burpees",
      category: "hiit",
      goals: ["fat", "cardio", "strength"],
      description:
        "Drop to ground, do push-up, jump back up, jump with hands up",
      sets: "3 sets of 10-15 reps",
      image:
        "https://ucarecdn.com/66b6e7e5-a7b9-4765-b0d5-053fbf915d73/-/format/auto/",
    },
    {
      id: 16,
      name: "Jump Rope",
      category: "cardio",
      goals: ["cardio", "fat", "endurance"],
      description: "Basic jump rope, maintain steady rhythm",
      sets: "3 sets of 2 minutes",
      image:
        "https://ucarecdn.com/ba7f59c4-845d-42c8-9086-edcba9a15c33/-/format/auto/",
    },
    {
      id: 17,
      name: "Lunges",
      category: "legs",
      goals: ["strength", "muscle"],
      description: "Step forward, lower back knee to ground, alternate legs",
      sets: "3 sets of 12 reps per leg",
      image:
        "https://ucarecdn.com/61b3317a-bb25-4b8a-8ede-bec70af3fa9b/-/format/auto/",
    },
    {
      id: 18,
      name: "Dips",
      category: "bodyweight",
      goals: ["strength", "muscle"],
      description: "Support on parallel bars, lower body, push back up",
      sets: "3 sets of 8-12 reps",
      image:
        "https://ucarecdn.com/b355ea14-e25e-499b-b8f3-837436af538e/-/format/auto/",
    },
    {
      id: 19,
      name: "Russian Twists",
      category: "core",
      goals: ["strength", "fat"],
      description:
        "Sit with knees bent, feet off ground, rotate torso side to side",
      sets: "3 sets of 20 reps",
      image:
        "https://ucarecdn.com/3a25750f-b622-4c21-8702-46b507ac0c58/-/format/auto/",
    },
    {
      id: 20,
      name: "Jumping Jacks",
      category: "cardio",
      goals: ["cardio", "fat"],
      description:
        "Jump while spreading legs and raising arms, return to start",
      sets: "3 sets of 50 reps",
      image:
        "https://ucarecdn.com/31998fda-ff45-48ba-bc45-86299d1fd0b3/-/format/auto/",
    },
  ];

  const filteredWorkouts = workoutPlans.filter((workout) => {
    const matchesCategory =
      selectedCategory === "all" || workout.category === selectedCategory;
    const matchesGoal =
      selectedGoal === "all" || workout.goals.includes(selectedGoal);
    return matchesCategory && matchesGoal;
  });

  return (
    <div
      className="min-h-screen text-white p-4 relative"
      style={{
        backgroundImage:
          "url('https://ucarecdn.com/eed69db8-dbde-450e-b979-2c81c8cdf977/-/format/auto/')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <a
            href="/"
            className="mr-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <i className="fas fa-arrow-left"></i>
          </a>
          <h1 className="text-3xl font-bold">Workout Plans</h1>
        </div>

        <div className="mb-8">
          <h2 className="text-xl mb-4">Select Your Goal</h2>
          <div className="flex flex-wrap gap-4">
            {goals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                  selectedGoal === goal.id
                    ? "bg-blue-600"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                <i className={`fas fa-${goal.icon}`}></i>
                {goal.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl mb-4">Target Muscle Group</h2>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                  selectedCategory === category.id
                    ? "bg-blue-600"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                <i className={`fas fa-${category.icon}`}></i>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="h-48 bg-gray-700 relative">
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{workout.name}</h3>
                <p className="text-gray-400 mb-4">{workout.description}</p>
                <div className="text-sm text-gray-400 mb-2">
                  <i className="fas fa-layer-group mr-2"></i>
                  {workout.sets}
                </div>
                <div className="flex flex-wrap gap-2">
                  {workout.goals.map((goal) => (
                    <span
                      key={goal}
                      className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                    >
                      {goals.find((g) => g.id === goal)?.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .scale-in {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;