export const avatarColors = [
  "#2563EB",
  "#7C3AED",
  "#DC2626",
  "#F59E0B",
  "#10B981",
  "#6B7280",
  "#EA580C",
  "#84CC16",
  "#0F766E",
  "#4F46E5",
  "#9333EA",
  "#1D4ED8",
] as const;

export function getRandomAvatarColor() {
  return avatarColors[Math.floor(Math.random() * avatarColors.length)];
}
