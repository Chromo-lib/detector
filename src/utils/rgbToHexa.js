export default function rgbToHex (color) {

  const toHex = (int) => {
    let hex = int.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  let arr = [];
  color.replace(/[\d+\.]+/g, (v) => {
    arr.push(parseFloat(v));
  });

  return "#" + arr.slice(0, 3).map(toHex).join('');
}
