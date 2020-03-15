export const slideUpDown = (col, dir) => {
  let arr = col.filter(val => val !== 0);
  let difference = 4 - arr.length;
  for (let i = 0; i < difference; i++) {
    if (dir === "up") {
      arr.push(0);
    } else if (dir === "down") {
      arr.unshift(0);
    }
  }
  return arr;
};

export const combineUpDown = (col, dir) => {
  if (dir === "down") {
    for (let i = 3; i > 0; i--) {
      if (col[i] === col[i - 1]) {
        col[i] = col[i] + col[i - 1];
        col[i - 1] = 0;
        console.log(col);
        break;
      }
    }
  } else if (dir === "up") {
    for (let i = 0; i < 3; i++) {
      if (col[i] === col[i + 1]) {
        col[i] = col[i] + col[i + 1];
        col[i + 1] = 0;
        console.log(col);
        break;
      }
    }
  }
};

export const rotate = matrix => {
  const N = matrix.length - 1;
  const result = matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]));
  matrix.length = 0;
  matrix.push(...result);
  return matrix;
};
export const checkGame = matrix => {
  for (let i = 0; i < 4; i++) {
    if (matrix[i].includes(2048)) {
      alert("You win");
    }
  }
};
export const checkMoves = data => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (i !== 3 && data[i][j] === data[i + 1][j]) {
        return false;
      } else if (j !== 3 && data[i][j] === data[i][j + 1]) {
        return false;
      }
    }
  }
  return true;
};
