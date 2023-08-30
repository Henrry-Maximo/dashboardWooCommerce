import moment from "moment";

export function calculateElapsedTime(openingDate) {
  const now = moment();
  const elapsed = now.diff(openingDate);
  return moment.duration(elapsed);
}

export function determineBackgroundColor(hours, minutes) {
  // red: faltando 59m && yellow: faltando 1h:59m && white: restante do tempo - 4h:59 às 2h:59m
  if (hours === 0 && minutes < 59) {
    return "red";
  } else if (hours === 1 && minutes < 59) {
    return "yellow";
  }
  return "white";
}
