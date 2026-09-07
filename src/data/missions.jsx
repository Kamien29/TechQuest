export const missions = [
  {
    id: 1,
    title: "Pierwszy krok",
    description: "Doprowadź robota do gwiazdki.",
    difficulty: "Łatwy",
    xp: 100,
    board: {
      width: 5,
      height: 5,
      robot: { x: 0, y: 2, direction: "RIGHT" },
      goal: { x: 3, y: 2 },
      obstacles: [],
    },
  },
  {
    id: 2,
    title: "Idziemy do celu",
    description: "Robot musi przejść przez planszę.",
    difficulty: "Łatwy",
    xp: 150,
    board: {
      width: 6,
      height: 5,
      robot: { x: 0, y: 4, direction: "UP" },
      goal: { x: 0, y: 0 },
      obstacles: [],
    },
  },
  {
    id: 3,
    title: "Pierwszy skręt",
    description: "Użyj skrętu, aby dotrzeć do celu.",
    difficulty: "Średni",
    xp: 200,
    board: {
      width: 5,
      height: 5,
      robot: { x: 0, y: 4, direction: "UP" },
      goal: { x: 4, y: 0 },
      obstacles: [],
    },
  },
  {
    id: 4,
    title: "Omijamy przeszkody",
    description: "Uważaj na przeszkody.",
    difficulty: "Średni",
    xp: 250,
    board: {
      width: 6,
      height: 6,
      robot: { x: 0, y: 5, direction: "UP" },
      goal: { x: 5, y: 0 },
      obstacles: [
        { x: 2, y: 3 },
        { x: 3, y: 3 },
        { x: 4, y: 3 },
        { x: 2, y: 1 },
      ],
    },
  },
  {
    id: 5,
    title: "Powtarzanie",
    description: "Wykorzystaj pętlę, aby skrócić program.",
    difficulty: "Trudny",
    xp: 300,
    board: {
      width: 7,
      height: 5,
      robot: { x: 0, y: 2, direction: "RIGHT" },
      goal: { x: 6, y: 2 },
      obstacles: [],
    },
  },
  {
    id: 6,
    title: "Mistrz programowania",
    description: "Rozwiąż bardziej wymagającą misję.",
    difficulty: "Trudny",
    xp: 400,
    board: {
      width: 7,
      height: 7,
      robot: { x: 0, y: 6, direction: "UP" },
      goal: { x: 6, y: 0 },
      obstacles: [
        { x: 1, y: 4 },
        { x: 2, y: 4 },
        { x: 3, y: 4 },
        { x: 3, y: 2 },
        { x: 4, y: 2 },
        { x: 5, y: 2 },
      ],
    },
  },
];

export function getUnlockedMissions() {
  let completed = [];

  try {
    completed = JSON.parse(
      localStorage.getItem("techQuestCompletedMissions") || "[]"
    );
  } catch {
    completed = [];
  }

  return missions.map((mission) => ({
    ...mission,
    unlocked:
      mission.id === 1
        ? true
        : mission.id === 6
          ? completed.length >= 5
          : completed.includes(mission.id - 1),
  }));
}
