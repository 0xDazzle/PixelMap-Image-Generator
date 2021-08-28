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