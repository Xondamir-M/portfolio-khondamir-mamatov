const grid = 30;
const cols = 10;
const rows = 20;
const dropIntervalBase = 1000;

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
ctx.scale(grid, grid);

const colors = [
  null,
  "#ff0d72",
  "#0dc2ff",
  "#0dff72",
  "#f538ff",
  "#ff8e0d",
  "#ffe138",
  "#3877ff",
];

const tetrominos = {
  T: [
    [1, 1, 1],
    [0, 1, 0],
  ],
  S: [
    [0, 2, 2],
    [2, 2, 0],
  ],
  Z: [
    [3, 3, 0],
    [0, 3, 3],
  ],
  O: [
    [4, 4],
    [4, 4],
  ],
  L: [
    [5, 0, 0],
    [5, 5, 5],
  ],
  J: [
    [0, 0, 6],
    [6, 6, 6],
  ],
  I: [
    [0, 0, 0, 0],
    [7, 7, 7, 7],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
};

const createMatrix = (w, h) => Array.from({ length: h }, () => Array(w).fill(0));

const drawMatrix = (matrix, offset) => {
  matrix.forEach((row, y) => {
    row.forEach((val, x) => {
      if (val !== 0) {
        ctx.fillStyle = colors[val];
        ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 0.05;
        ctx.strokeRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
};

const rotate = (matrix, dir) => {
  const result = matrix.map((_, i) => matrix.map(row => row[i]));
  return dir > 0 ? result.map(row => row.reverse()) : result.reverse();
};

const collide = (arena, player) => {
  const [m, o] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
};

const merge = (arena, player) => {
  player.matrix.forEach((row, y) => {
    row.forEach((val, x) => {
      if (val !== 0) arena[y + player.pos.y][x + player.pos.x] = val;
    });
  });
};

const arena = createMatrix(cols, rows);

const player = {
  pos: { x: 0, y: 0 },
  matrix: null,
  score: 0,
  lines: 0,
  level: 0,
};

const arenaSweep = () => {
  let linesCleared = 0;
  outer: for (let y = arena.length - 1; y >= 0; --y) {
    for (let x = 0; x < arena[y].length; ++x) {
      if (arena[y][x] === 0) continue outer;
    }
    const row = arena.splice(y, 1)[0];
}}