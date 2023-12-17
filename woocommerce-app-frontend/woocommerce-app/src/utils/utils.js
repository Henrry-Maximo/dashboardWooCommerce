export const calculateBackgroundColor = (remainingTime) => {
  return remainingTime <= "01:00:00" ? "red" : remainingTime <= "02:00:00" ? "#e3d230" : "green";
};

