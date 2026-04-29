export class Section {
  constructor({ items, renderer }, cardSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(cardSelector);
  }

  clear() {
    this._container.innerHTML = "";
  }

  renderer() {
    this.clear();

    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
