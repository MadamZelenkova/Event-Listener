import image from "../img/goblin.png";

export default class Goblin {
  constructor() {
    this.element = document.createElement("img");
    this.element.className = "goblin";
    this.element.src = image;
  }

  moveGoblin(cells) {
    let currentCell = null;
    const index = Math.floor(Math.random() * cells.length);
    const newCell = cells[index];
    if (newCell !== currentCell) {
      currentCell = newCell;
      currentCell.appendChild(this.element);
    }
  }
}
