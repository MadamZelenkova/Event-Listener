//import Goblin from "./Goblin.js";

//export default

import image from "../img/goblin.png";

class Goblin {
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

class Game {
  constructor() {
    this.enemy = new Goblin();
    this.cells = document.querySelectorAll(".cell");
    this.falses = 0;
    this.hits = 0;
    this.interval = null;
    this.scoreHitsEl = document.querySelector(".hits");
    this.scoreFalsesEl = document.querySelector(".falses");

    this.startGame();
  }

  startGame() {
    this.cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        //cell.style.cursor = "url(../img/SovietCursor.cur), auto";
        if (cell.contains(this.enemy.element)) {
          this.hits += 1;
          this.scoreHitsEl.textContent = this.hits;
          this.checkMaxScore();
        } else {
          this.falses += 1;
          this.scoreFalsesEl.textContent = "-" + this.falses;
          this.checkMaxScore();
        }
      });
    });
    this.checkMaxScore();
  }

  checkMaxScore() {
    clearInterval(this.interval);
    const moveGoblinMethod = this.enemy.moveGoblin.bind(this.enemy, this.cells);

    if (this.falses >= 5) {
      alert("Вы проиграли!" + this.falses);
      this.cleanScore();
    } else if (this.hits >= 5) {
      alert("Победа!" + this.hits);
      this.cleanScore();
    } else {
      this.interval = setInterval(moveGoblinMethod, 1000);
    }
  }

  cleanScore() {
    this.falses = 0;
    this.hits = 0;
    this.scoreHitsEl.textContent = 0;
    this.scoreFalsesEl.textContent = 0;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
});
