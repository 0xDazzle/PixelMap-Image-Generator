export function dimensionToPixels(dimension: number) {
  return dimension * 16;
}

export function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export function rgbToHex(r, g, b) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function websafeColor(color) {
  let quantum = 255 / 5;
  return quantum * Math.floor((color + (quantum / 2)) / quantum );
}

export function rgbToWebsafeHex(r, g, b) {
  r = websafeColor(r);
  g = websafeColor(g);
  b = websafeColor(b);

  let hex = rgbToHex(r, g, b);
  hex = hex.split('');

  let safe = [];

  for(let i = 0; i < hex.length; i++) {
    if( i % 2 !== 0 ) safe.push(hex[i]);
  }
   
  return safe.join('');
}

export function generateWebSafeImage(imageColors, width, height) {
  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  let ctx = canvas.getContext('2d');
  if( !ctx ) return "";

  ctx.fillStyle = "rgba(255,255,255,255)";
  ctx.fillRect(0, 0, width, height);

  let colorIndex = 0;

  for( let y = 0; y < height; y++ ) {
    for( let x = 0; x < width; x++ ) {
      if( colorIndex < imageColors.length ) {
        ctx.fillStyle = `#${imageColors[colorIndex]}`;
        ctx.fillRect(x, y, 1, 1);
      }

      colorIndex++;
    }
  }

  return canvas.toDataURL(`image/PNG`, 1);
}