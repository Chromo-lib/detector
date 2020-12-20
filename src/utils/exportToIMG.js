export default function exportToIMG (canvas, filename = 'untitled.jpeg', type = "image/jpeg") {
  let dataURL = canvas.toDataURL(type, 1.0);
  let a = document.createElement('a');
  a.href = dataURL;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}