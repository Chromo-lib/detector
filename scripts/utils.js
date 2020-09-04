class Utils {

  static rgbToHex (color) {
    let arr = [];
    color.replace(/[\d+\.]+/g, (v) => {
      arr.push(parseFloat(v));
    });

    return "#" + arr.slice(0, 3).map(this.toHex).join('');
  }

  static toHex (int) {
    let hex = int.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
}