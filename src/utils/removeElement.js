export default function removeElement (elemID) {
  let elem = document.getElementById(elemID);
  if (elem.parentNode) {
    elem.parentNode.removeChild(elem);
  }
}