const columns = Array.from(
  document.querySelectorAll(".js-calendar-graph > svg > g > g")
).map((col) => Array.from(col.querySelectorAll("rect")));

const img = new Image();
img.src = "/image/bulbasaur.png";
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
img.onload = function () {
  ctx.drawImage(img, 0, 0);

  let offset = 0;
  window.setInterval(() => {
    Array.from(columns).forEach((cols, cx) => {
      Array.from(cols).forEach((_, cy) => {
        if (columns[cx] && columns[cx][cy]) {
          const pixel = ctx.getImageData(cx, offset + cy, 1, 1);
          const data = pixel.data;
          const rgb = `rgb(${data.join(",")})`;

          columns[cx][cy].style.fill = rgb;
        }
      });
    });
    offset += 1;
    if (offset + 7 > img.height) {
      offset = 0;
    }
  }, 100);
};
