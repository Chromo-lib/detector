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
  
  static removeDomElement (id) {
    let elem = document.getElementById(id);
    return elem ? elem.parentNode.removeChild(elem) : null;
  }

  static createBox(txt, desc) {
    return `<div class="w-100 d-flex mb-10">
    <span class="mr-10 txt-muted">${txt}</span>
    <span>${desc}</span>
  </div>`;
  }
}