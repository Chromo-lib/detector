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

  static isColorLight (color) {
    const hex = color.replace('#', '');
    const c_r = parseInt(hex.substr(0, 2), 16);
    const c_g = parseInt(hex.substr(2, 2), 16);
    const c_b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
    return brightness > 155;
  }

  static removeDomElement (id) {
    let elem = document.getElementById(id);
    return elem ? elem.parentNode.removeChild(elem) : null;
  }
}