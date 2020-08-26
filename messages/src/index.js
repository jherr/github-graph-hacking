import ALPHABET from "./bitmaps";

const ON = "#216e39";
const OFF = "#ebedf0";

const columns = Array.from(
  document.querySelectorAll(".js-calendar-graph > svg > g > g")
).map((col) => Array.from(col.querySelectorAll("rect")));

const writeMessage = (msg, iteration) => {
  const display = new Array(53).fill(0).map(() => new Array(7).fill(0));

  const blit = (bmap, startCol) => {
    bmap.forEach((rowData, row) => {
      rowData.forEach((colData, col) => {
        if (startCol + col >= 0 && startCol + col < columns.length) {
          display[startCol + col][row] = colData;
        }
      });
    });
  };

  const offset = -iteration;

  msg
    .toUpperCase()
    .split("")
    .forEach((letter, index) => {
      const startOffset = offset + index * 6;
      if (startOffset >= -6 && startOffset < display.length) {
        if (letter !== " ") {
          blit(ALPHABET[letter], startOffset);
        }
      }
    });

  Array.from(display).forEach((cols, week) => {
    Array.from(cols).forEach((v, col) => {
      if (columns[week] && columns[week][col]) {
        columns[week][col].style.fill = v ? ON : OFF;
      }
    });
  });
};

const message = "No Zombies Here";

let offset = 0;
window.setInterval(() => {
  writeMessage(message, offset);
  offset += 1;
  if (offset > message.length * 6) {
    offset = 0;
  }
}, 80);
