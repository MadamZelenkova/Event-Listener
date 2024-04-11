import Goblin from "./Goblin.js";

export default class Game {
  constructor() {
    this.scoreHitsEl = document.querySelector(".hits");
    this.scoreFalsesEl = document.querySelector(".falses");
    this.cells = document.querySelectorAll(".cell");
    this.enemy = new Goblin();
    this.falses = 0;
    this.hits = 0;
    this.interval = null;
    this.click = false;

    this.startGame();
  }

  startGame() {
    this.cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        if (cell.contains(this.enemy.element)) {
          this.addPositiveScore();
        } else {
          this.addNegativeScore();
        }
      });
    });
    this.checkMaxScore();
  }

  checkMaxScore() {
    clearInterval(this.interval);
    const moveGoblinMethod = this.enemy.moveGoblin.bind(this.enemy, this.cells);

    if (this.falses >= 5) {
      alert("Вы проиграли!");
      this.cleanScore();
    } else if (this.hits >= 5) {
      alert("Победа!");
      this.cleanScore();
    }
    this.interval = setInterval(() => {
      moveGoblinMethod();
      if (!this.click) {
        this.addNegativeScore();
      }
    }, 1000);
    this.click = false;
  }

  addPositiveScore() {
    this.hits += 1;
    this.scoreHitsEl.textContent = this.hits;
    this.enemy.moveGoblin(this.cells);
    this.checkMaxScore();
  }

  addNegativeScore() {
    this.falses += 1;
    this.scoreFalsesEl.textContent = "-" + this.falses;
    this.checkMaxScore();
  }

  cleanScore() {
    this.falses = 0;
    this.hits = 0;
    this.scoreHitsEl.textContent = 0;
    this.scoreFalsesEl.textContent = 0;
  }
}
