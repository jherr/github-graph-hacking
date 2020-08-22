const ON = "#216e39";
const OFF = "#ebedf0";

const columns = Array.from(
  document.querySelectorAll(".js-calendar-graph > svg > g > g")
).map((col) => Array.from(col.querySelectorAll("rect")));

const updateRaindrop = (drops) => {
  Array.from(columns).forEach((cols, cx) => {
    Array.from(cols).forEach((_, cy) => {
      if (columns[cx] && columns[cx][cy]) {
        columns[cx][cy].style.fill = OFF;
      }
    });
  });

  drops.forEach(({ position: [x, y], radius }) => {
    Array.from(columns).forEach((cols, cx) => {
      Array.from(cols).forEach((_, cy) => {
        if (columns[cx] && columns[cx][cy]) {
          const dx = (x - cx) * (x - cx);
          const dy = (y - cy) * (y - cy);
          const dist = Math.sqrt(dx + dy);
          let on = OFF;
          if (radius < 1) {
            on = dist < radius ? ON : OFF;
          } else {
            on = dist < radius && dist >= radius - 1 ? ON : OFF;
          }
          if (on === ON) {
            columns[cx][cy].style.fill = on;
          }
        }
      });
    });
  });
};

const newDrop = () => ({
  position: [
    Math.floor(Math.random() * columns.length),
    Math.floor(Math.random() * columns[0].length),
  ],
  radius: 1,
  speed: Math.random() + 0.3,
});
let drops = new Array(7)
  .fill(0)
  .map(newDrop)
  .map((drop, radius) => ({
    ...drop,
    radius,
  }));

window.setInterval(() => {
  drops = drops
    .map((drop) => ({
      ...drop,
      radius: drop.radius + drop.speed,
    }))
    .filter((drop) => drop.radius < 30);
  while (drops.length < 7) {
    drops.push(newDrop());
  }
  if (Math.random() < 0.1) {
    drops.push(newDrop());
  }
  updateRaindrop(drops);
}, 100);
