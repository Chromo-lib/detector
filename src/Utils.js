export default class Utils {

  static rgbToHex (color) {

    const toHex = (int) => {
      let hex = int.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    let arr = [];
    color.replace(/[\d+\.]+/g, (v) => {
      arr.push(parseFloat(v));
    });

    return "#" + arr.slice(0, 3).map(toHex).join('');
  }

  static RemoveElement (elemID) {
    let elem = document.getElementById(elemID);
    if (elem.parentNode) {
      elem.parentNode.removeChild(elem);
    }
  }

  static compareTwoDomElements (firstEl, secondEl) {
    firstEl = JSON.stringify(firstEl, ['tagName', 'textContent', 'innerHTML', 'id', 'className']);
    secondEl = JSON.stringify(secondEl, ['tagName', 'textContent', 'innerHTML', 'id', 'className']);
    return firstEl !== secondEl;
  }

  static removeElement (id) {
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
  }
}
