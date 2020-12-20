import React, { useEffect, useState } from 'react';
import { fabric } from "fabric";
import MenuColors from './components/MenuColors';
import MenuShapes from './components/MenuShapes';
import Draggable from './Draggable';
import exportToIMG from './utils/exportToIMG';

const fabOptions = {
  isDrawingMode: false, width: window.innerWidth, height: window.innerHeight
}

export default function App () {

  const canvasObj = new fabric.Canvas('fab-editor-canvas', fabOptions);
  fabric.Object.prototype.transparentCorners = false;
  let pointerEvents = false;

  useEffect(() => {

  }, []);

  const onInputColor = (e) => {
    let activeObject = canvasObj.getActiveObjects()[0];
    let groupObjects = canvasObj.getActiveObject();

    let name = e.target.name;
    let inputColor = e.target.value;

    if (activeObject) {
      activeObject.set({ [name]: inputColor });
    }

    if (groupObjects) {
      if (groupObjects._objects && groupObjects._objects.length > 0) {
        groupObjects._objects.forEach(g => {
          g.set({ [name]: inputColor });
        });
      }
    }

    if (canvasObj.isDrawingMode) {
      canvasObj.freeDrawingBrush.color = inputColor;
    }

    canvasObj.requestRenderAll();
  }

  const onAction = (actionType) => {
    switch (actionType) {
      case 'drawing':
        canvasObj.isDrawingMode = true;
        canvasObj.freeDrawingBrush.width = 10;
        break;

      case 'move':
        canvasObj.isDrawingMode = false;
        break;

      case 'export':
        exportToIMG(canvasObj);
        break;

      case 'erase': // erase only selected elements
        canvasObj.getActiveObjects().forEach((obj) => {
          canvasObj.remove(obj)
        });
        canvasObj.discardActiveObject().renderAll();
        break;

      case 'erase-all':
        canvasObj.remove(...canvasObj.getObjects());
        break;

      case 'interact-page':
        pointerEvents = !pointerEvents;
        document.querySelector('.canvas-container').style
          .setProperty("pointer-events", (pointerEvents ? 'none' : 'auto'), "important")
        break;

      default:
        break;
    }
  }

  return (
    <Draggable>
      <div className="content d-flex justify-between">
        <ul className="d-flex border-right">
          <li onClick={() => { onAction('drawing') }}><svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828L10.646.646zm-1.8 2.908l-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z" /><path fill-rule="evenodd" d="M2.832 13.228L8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086.086-.026z" /></svg></li>
          <li onClick={() => { onAction('interact-page') }}><svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5 2a.5.5 0 0 1 .5-.5c.862 0 1.573.287 2.06.566.174.099.321.198.44.286.119-.088.266-.187.44-.286A4.165 4.165 0 0 1 10.5 1.5a.5.5 0 0 1 0 1c-.638 0-1.177.213-1.564.434a3.49 3.49 0 0 0-.436.294V7.5H9a.5.5 0 0 1 0 1h-.5v4.272c.1.08.248.187.436.294.387.221.926.434 1.564.434a.5.5 0 0 1 0 1 4.165 4.165 0 0 1-2.06-.566A4.561 4.561 0 0 1 8 13.65a4.561 4.561 0 0 1-.44.285 4.165 4.165 0 0 1-2.06.566.5.5 0 0 1 0-1c.638 0 1.177-.213 1.564-.434.188-.107.335-.214.436-.294V8.5H7a.5.5 0 0 1 0-1h.5V3.228a3.49 3.49 0 0 0-.436-.294A3.166 3.166 0 0 0 5.5 2.5.5.5 0 0 1 5 2zm3.352 1.355zm-.704 9.29z" /></svg></li>
          <li onClick={() => { onAction('move') }}><svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z" /></svg></li>
          <li onClick={() => { onAction('erase') }}><svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 512 512"><path fill="#fff" d="M497.941 273.941c18.745-18.745 18.745-49.137 0-67.882l-160-160c-18.745-18.745-49.136-18.746-67.883 0l-256 256c-18.745 18.745-18.745 49.137 0 67.882l96 96A48.004 48.004 0 0 0 144 480h356c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12H355.883l142.058-142.059zm-302.627-62.627l137.373 137.373L265.373 416H150.628l-80-80 124.686-124.686z" /></svg></li>
          <li onClick={() => { onAction('erase-all') }}><svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z" /></svg></li>
          <li onClick={() => { onAction('export') }}><svg xmlns="http://www.w3.org/2000/svg" width="22" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" /></svg></li>
        </ul>

        <MenuShapes canvasObj={canvasObj} />
        <MenuColors onInputColor={onInputColor} />
      </div>
    </Draggable>
  );
}