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

  static preventOpenLink (event) {

    event.preventDefault();
    event.stopPropagation();

    event.target.onsubmit = "javascript:void(0)";
    event.target.href = "javascript:void(0)";
    event.target.click = "javascript:void(0)";

    event.target.removeAttribute('href');
    event.target.removeAttribute('onclick');

    event.target.addEventListener('click', (e) => { e.preventDefault(); return false; });
    event.target.addEventListener('submit', (e) => { e.preventDefault(); return false; });
  }

  static RemoveElement (elemID) {
    let elem = document.getElementById(elemID);
    if (elem.parentNode) {
      elem.parentNode.removeChild(elem);
    }
  }
}
