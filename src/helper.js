export const rows = [
  [2, 8, 7, 1, 9, 6, 5, 4, 3],
  [3, 9, 4, 2, 5, 7, 1, 8, 6],
  [6, 5, 1, 3, 4, 8, 9, 2, 7],
  [7, 4, 9, 6, 1, 2, 8, 3, 5],
  [1, 6, 3, 4, 8, 5, 7, 9, 2],
  [5, 2, 8, 9, 7, 3, 6, 1, 4],
  [4, 1, 6, 5, 2, 9, 3, 7, 8],
  [9, 7, 5, 8, 3, 4, 2, 6, 1],
  [8, 3, 2, 7, 6, 1, 4, 5, 9]
];

function flatten(arr) {
  return arr.reduce(function(flat, toFlatten) {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : parseInt(toFlatten)
    );
  }, []);
}

export const comparePuzzle = (arr1, arr2) => {
  return JSON.stringify(flatten(arr1)) === JSON.stringify(flatten(arr2));
};

export const secondsToHms = seconds => {
  seconds = Number(seconds);
  let h = Math.floor(seconds / 3600);
  let m = Math.floor((seconds % 3600) / 60);
  let s = Math.floor((seconds % 3600) % 60);

  let hDisplay = h > 0 ? `${h}h` : "";
  let mDisplay = m > 0 ? `${m}m` : "";
  let sDisplay = s > 0 ? `${s}s` : "";
  return `${hDisplay} ${mDisplay} ${sDisplay}`;
};

export const getCustomClass = (index, innerIndex) => {
  if ((index + 1) % 3 === 0 && (innerIndex + 1) % 3 === 0)
    return "borderBottom borderRight";
  if (innerIndex === 0 && (index + 1) % 3 === 0)
    return "borderLeft borderBottom";
  if (index === 0 && innerIndex === 0) return "borderLeft borderTop";
  if (index === 0 && (innerIndex + 1) % 3 === 0) return "borderTop borderRight";
  if ((index + 1) % 3 === 0) return "borderBottom";
  if ((innerIndex + 1) % 3 === 0) return "borderRight";
  if (innerIndex === 0) return "borderLeft";
  if (index === 0) return "borderTop";
};

export const checkCorrectClass = (value, index, innerIndex) => {
  if (typeof value === "string" && parseInt(value) === rows[index][innerIndex])
    return "correctVal";
  return "";
};
