let c = document.getElementById("ctxx");
document.getElementById("e").innerHTML="";
let ctx = c.getContext("2d");
const FPS = 60;
c.height = 320;

var isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
if (isMobile){

  document.getElementById("e").innerHTML="You are on phone. this site is not mobile-friendly. :/ sorry";
}else{
    setInterval(update, 1000 / FPS);
}

//set things up for update
let wc = c.width / 2;
let hc = c.height / 2;
let t = 0


function update(){
  t+=0.01
    c.width = innerWidth - 47;
   wc = c.width / 2;
 hc = c.height / 2;
    let gradient = ctx.createLinearGradient(wc, 0, wc, c.height);
  gradient.addColorStop(0, "white");
  gradient.addColorStop(0.15, "#005");
  gradient.addColorStop(0.85, "#005");
  gradient.addColorStop(1, "white");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, c.width, c.height);
  //bars
  ctx.fillRect(0, Math.sin(t*4)*220+hc-30, c.width, 60);
    let gradient3 = ctx.createLinearGradient(wc, Math.sin(t*5)*70+hc-20, wc, Math.sin(t*5)*70+hc+20);
  gradient3.addColorStop(0, "#00000000");
  gradient3.addColorStop(0.5, "#07f");
  gradient3.addColorStop(1, "#00000000");

  ctx.fillStyle = gradient3;
  ctx.fillRect(0, Math.sin(t*5)*70+hc-20, c.width, 40);
    let gradient4 = ctx.createLinearGradient(wc, Math.sin(t*3)*70+hc-20, wc, Math.sin(t*3)*70+hc+20);
  gradient4.addColorStop(0, "#00000000");
  gradient4.addColorStop(0.5, "#07f");
  gradient4.addColorStop(1, "#00000000");
  ctx.fillStyle = gradient4;
  ctx.fillRect(0, Math.sin(t*3)*70+hc-20, c.width, 40);
   writeint(wc, 25, "about me", "32px Consolas", 21, 0, 2, 7, 0.07, t, "n", [20, 90, 100], "#000");
  writeint(wc+Math.sin(t/2+120)*30, hc-75, "Hi everyone!", "48px Consolas", 26, 12, 6, 7, 0.07, t, "h", [0, 50, 75], "#000");
  writeint(wc+Math.sin(t/3)*15, hc-25, "im dtpls. im also known as:","32px Consolas", 21, 6, 4, 7, 0.07, t, "s", [Math.sin(t*15)*15+240, 60, 0], null);
    writeint(wc+Math.sin(t)*25, hc+30, "d, dtplays or dateplays.","32px Consolas", 21, 6, 4, 7, 0.07, t, "h", [0, 60, 75], null);
    writeint(wc+Math.sin(t/1.3+135)*25, hc+90, "Below this, there are informations about me :)","32px Consolas", 21, 6, 4, 7, 0.1, t, "s", [t*100%360, 60, 75], null);
}
function textwsh(x, y, color, text, styler, shadowoffset) {
  ctx.font = styler;
  // shadow
  ctx.fillStyle = "#555";
  ctx.fillText(text, x + shadowoffset, y + shadowoffset);
  //actual text render
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function writeint(x, y, text, style, spacing, so, sinmulti, speed, obt, time, colorstyle, color1, ncolor) {           // colors should be written as h,s,b except for ncolor
  let splittext = text.split('');
  let tempx = 0;
  let tempy = 0;
  let tempcolor = 0;
  let color1rgb = HSBToRGB(color1[0], color1[1], color1[2]);
  if (colorstyle == "n") {
    tempcolor = ncolor;
  } else if (colorstyle == "h") {
    tempcolor = hslToHex(time*100%360,color1[1], color1[2]);
  } else if (colorstyle == "s") {
    tempcolor = hslToHex(color1[0],color1[1],Math.sin(time * speed) * 12+82)
  } else {
    tempcolor = ncolor;
    console.warn("bad colorstyle: \"" + colorstyle + "\" !");
  }
  for (let i = 0; i < text.length; i++) {
    tempx = (i * spacing + x) - (spacing - 2) * text.length / 2 - spacing - 2;
    tempy = ((Math.sin((time + obt * i) * speed) * sinmulti) + y);
    textwsh(tempx, tempy, tempcolor, splittext[i], style, so);
  }
}

const RGBToHSB = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const v = Math.max(r, g, b),
    n = v - Math.min(r, g, b);
  const h =
    n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
  return [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100];
};

const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}