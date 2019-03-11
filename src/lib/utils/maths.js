export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function roundRobin(total, current) {
  if (current < total - 1) {
    let newCurrent = current;
    newCurrent += 1;
    return newCurrent;
  }
  return 0;
}
