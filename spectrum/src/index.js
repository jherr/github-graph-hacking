import color from "color";
import interpolateRGB from "interpolate-rgb";

const ON = color("#216e39").rgb().color;
const OFF = color("#ebedf0").rgb().color;
const interpolator = interpolateRGB(OFF, ON);

const columns = Array.from(
  document.querySelectorAll(".js-calendar-graph > svg > g > g")
).map((col) => Array.from(col.querySelectorAll("rect")));

Array.from(columns).forEach((cols, cx) => {
  Array.from(cols).forEach((_, cy) => {
    if (columns[cx] && columns[cx][cy]) {
      columns[cx][cy].style.fill = color
        .rgb(interpolator((cx + cy) / 60))
        .hex();
    }
  });
});
