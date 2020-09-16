class ChildNode {
  static createElement (nodeType = 'div', attributes = {}) {
    let newElement = document.createElement(nodeType);
    Object.assign(newElement, attributes);
    return newElement;
  }
}

export default class DOM {

  constructor () {
    this.element = null;
    this.children = null;
  }

  get () {
    return this.element;
  }

  set(value = null) {
    this.element = value;
  }

  createElement (nodeType = 'div', attributes = {}) {
    this.element = document.createElement(nodeType);
    Object.assign(this.element, attributes);
    return this;
  }

  /**
   * child object {nodeType : 'div', attributes : {}};
   * @param {Array<Object>} children 
   */
  createChilds (children = []) {
    this.children = children.map(child => {
      let newEl = ChildNode.createElement(child.nodeType, child.attributes);
      return newEl;
    });
    return this;
  }

  appendChilds (children = []) {
    (this.children || children).forEach(child => {
      this.element.appendChild(child);
    });
    return this;
  }

  appendTo (parentNode = null) {
    if (this.element && parentNode) { parentNode.appendChild(this.element); }
    return this;
  }
}