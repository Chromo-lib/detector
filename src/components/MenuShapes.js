import React from 'react';

export default function MenuShapes ({ canvasObj }) {

  const addShape = (type) => {
    switch (type) {
      case 'text':
        canvasObj.add(new fabric.Textbox('MyText', {
          fontSize: 26,
          left: 20,
          top: 20,
          textAlign: 'center'
        }));
        canvasObj.requestRenderAll();
        break;

      case 'line':
        canvasObj.add(new fabric.Line([50, 10, 200, 150], {
          stroke: 'black',
          strokeWidth: 1,
          hasControls: true,
          hasRotatingPoint: true,
          left: 80,
          top: 80
        }));
        canvasObj.requestRenderAll();
        break;

      case 'arrow':
        let triangle = new fabric.Triangle({
          width: 10,
          height: 15,
          fill: 'black',
          left: 235,
          top: 65,
          angle: 90
        });

        let line = new fabric.Line([50, 100, 200, 100], {
          left: 75,
          top: 70,
          stroke: 'black'
        });

        let objs = [line, triangle];

        let alltogetherObj = new fabric.Group(objs);
        canvasObj.add(alltogetherObj);
        canvasObj.requestRenderAll();
        break;

      case 'triangle':
        canvasObj.add(new fabric.Triangle({
          stroke: '#000', width: 100, height: 100, top: 100, left: 100, fill: 'rgba(0,0,200,0.5)'
        }));
        canvasObj.requestRenderAll();
        break;

      case 'circle':
        canvasObj.add(new fabric.Circle({
          stroke: '#000', radius: 50, fill: '', top: 100, left: 100, fill: 'rgba(0,0,200,0.5)'
        }));
        canvasObj.requestRenderAll();
        break;

      case 'rectangle':
        canvasObj.add(new fabric.Rect({
          width: 50, height: 100, top: 100, left: 100, angle: 90,
          stroke: '#000',
          strokeWidth: 1,
          fill: 'rgba(0,0,200,0.5)'
        }));
        canvasObj.requestRenderAll();
        break;

      case 'octagon':
        let size = 150;
        let side = Math.round((size * Math.sqrt(2)) / (2 + Math.sqrt(2)));
        let octagon = new fabric.Polygon([
          { x: -side / 2, y: size / 2 },
          { x: side / 2, y: size / 2 },
          { x: size / 2, y: side / 2 },
          { x: size / 2, y: -side / 2 },
          { x: side / 2, y: -size / 2 },
          { x: -side / 2, y: -size / 2 },
          { x: -size / 2, y: -side / 2 },
          { x: -size / 2, y: side / 2 }], {
          stroke: 'black',
          left: 10,
          top: 10,
          strokeWidth: 1,
          strokeLineJoin: 'bevil',
          fill: 'rgba(0,0,200,0.5)'
        }, false);
        canvasObj.add(octagon);
        canvasObj.requestRenderAll();
        break;

      case 'emerald':
        let emerald = new fabric.Polygon([{ x: 850, y: 75 }, { x: 958, y: 137.5 }, { x: 958, y: 262.5 }, { x: 850, y: 325 }, { x: 742, y: 262.5 }, { x: 742, y: 137.5 }], {
          stroke: 'black',
          left: 10,
          top: 10,
          strokeWidth: 1,
          fill: 'rgba(0,0,200,0.5)'
        }, false);
        canvasObj.add(emerald);
        canvasObj.requestRenderAll();
        break;

      case 'star':
        let star = new fabric.Polygon([{ x: 350, y: 75 }, { x: 380, y: 160 }, { x: 470, y: 160 }, { x: 400, y: 215 }, { x: 423, y: 301 }, { x: 350, y: 250 }, { x: 277, y: 301 }, { x: 303, y: 215 }, { x: 231, y: 161 }, { x: 321, y: 161 }], {
          stroke: 'black',
          left: 10,
          top: 10,
          strokeWidth: 1,
          fill: 'rgba(0,0,200,0.5)'
        }, false);
        canvasObj.add(star);
        canvasObj.requestRenderAll();
        break;

      default:
        break;
    }
  }

  return (<ul className="d-flex border-right">
    <li title="text" onClick={() => { addShape('text') }}><svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 448 512"><path fill="#fff" d="M432 416h-23.41L277.88 53.69A32 32 0 0 0 247.58 32h-47.16a32 32 0 0 0-30.3 21.69L39.41 416H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-19.58l23.3-64h152.56l23.3 64H304a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM176.85 272L224 142.51 271.15 272z" /></svg></li>
    <li title="line" onClick={() => { addShape('line') }}><svg viewBox="0 0 6 6" width="20"><line x1="0" y1="3" x2="6" y2="3" stroke="#fff" strokeLinecap="round"></line></svg></li>
    <li title="arrow" onClick={() => { addShape('arrow') }}><svg viewBox="0 0 448 512" width="20"><path fill="#fff" d="M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z"></path></svg></li>
    <li title="circle" onClick={() => { addShape('circle') }}><svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 512 512"><path fill="#fff" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z" /></svg></li>

    <li title="triangle" onClick={() => { addShape('triangle') }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.938 2.016a.146.146 0 0 0-.054.057L1.027 13.74a.176.176 0 0 0-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 0 0 .066-.017.163.163 0 0 0 .055-.06.176.176 0 0 0-.003-.183L8.12 2.073a.146.146 0 0 0-.054-.057A.13.13 0 0 0 8.002 2a.13.13 0 0 0-.064.016zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" /></svg></li>

    <li title="rectangle" onClick={() => { addShape('rectangle') }}><svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 448 512"><path fill="#fff" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h340c3.3 0 6 2.7 6 6v340c0 3.3-2.7 6-6 6z" /></svg></li>

    <li title="octagon" onClick={() => { addShape('octagon') }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1L1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" /></svg></li>

    <li title="emerald" onClick={() => { addShape('emerald') }}><svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 64 64" fill="none" strokeWidth="4px" stroke="#fff"><path d="M8 20v24l24 12 24-12V20L32 8 8 20z"></path><path d="M56 20L32 32 8 20M32 32v24"></path></svg></li>
    <li title="star" onClick={() => { addShape('star') }}><svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 576 512"><path fill="#fff" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z" /></svg></li>
  </ul>);
}