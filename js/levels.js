/*
  level designs
*/

const wormholes = [
  {
    "x0y1": {"origin": [0, 1], "pass": [1, 2], "fail": [2, 1]},
  },
  {
    "x0y1": {"origin": [0, 1], "pass": [0, 3], "fail": [3, 3]},
    "x0y4": {"origin": [0, 4], "pass": [0, 6], "fail": [3, 3]},
    "x1y6": {"origin": [1, 6], "pass": [3, 6], "fail": [3, 3]},
    "x3y4": {"origin": [3, 4], "pass": [3, 6], "fail": [6, 4]},
    "x4y6": {"origin": [4, 6], "pass": [6, 6], "fail": [6, 4]},
  }
];

const goals = [
  [2, 2],
  [6, 5]
];

const starts = [
  [0, 0],
  [0, 0]
];

const mapSizes = [3, 7];
