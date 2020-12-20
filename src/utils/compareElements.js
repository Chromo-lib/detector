export default function compareElements (firstEl, secondEl) {
  firstEl = JSON.stringify(firstEl, ['tagName', 'textContent', 'innerHTML', 'id', 'className']);
  secondEl = JSON.stringify(secondEl, ['tagName', 'textContent', 'innerHTML', 'id', 'className']);
  return firstEl !== secondEl;
}