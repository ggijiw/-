'use strict';

{
  class Panel {
    constructor(game) {
      this.game = game;
      this.el = document.createElement('li');
      this.el.classList.add('pressed');
      this.el.addEventListener('click', () => {
        this.check();
      })
    }

    getEl() {
      return this.el;
    }

    activate(num) {
      this.el.classList.remove('pressed');
      this.el.textContent = num;
    }

    check() {
      // if (currentNum === parseInt(this.el.textContent, 10)) {
      if (this.game.getCurrentNum() === parseInt(this.el.textContent, 10)) {
        this.el.classList.add('pressed');
        // currentNum++;
        this.game.addCurrentNum();

        // if (currentNum === 4) {
        if (this.game.getCurrentNum() === this.gema.getLevel() ** 2) {
          // clearTimeout(timeoutId);
          clearTimeout(this.game.getTimeoutId);
        }
      }
    }
  }
  class Board {
    constructor(game) {
      this.game = game;
      this.panels = [];
      // for (let i = 0; i < 4; i++) {
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
        this.panels.push(new Panel(this.game));
      }
      this.setup();
    }

    setup() {
      const board = document.getElementById('board');
      this.panels.forEach(panel => {
        // board .appendChild(panel.el);
        board.appendChild(panel.getEl());
      });
    }

    activate() {
      // const nums = [0, 1, 2, 3];
      const nums = [];
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
        nums.push(i);
      }
      this.panels.forEach(panel => {
        const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
        panel.activate(num);
      });
    }
  }

  class Game {
    // constructor() {
    constructor(level) {
      this.level = level;
      // const board = new Board();
      this.board = new Board(this);
    
      // let currentNum = 0;
      this.currentNum = undefined;
      this.startTime = undefined;
      this.timeoutId = undefined;
    
      const btn = document.getElementById('btn');
      btn.addEventListener('click', () => {
        this.start();
      });
      this.setup();
    }

    setup() {
      const container = document.getElementById('container');
      const PANEL_WIDTH = 50;
      const BOARD_PADDING = 10;
      container.style.width =  PANEL_WIDTH * this.level + BOARD_PADDING * 2 + 'px';
    }

    start () {
      if (typeof this.timeoutId !== 'undefined') {
        clearTimeout(this.timeoutId);
      }
  
      this.currentNum = 0;
      this.board.activate();
  
      this.startTime = Date.now();
      this.runTimer();
    }

    runTimer() {
      const timer = document.getElementById('timer');
      timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);
  
      this.timeoutId = setTimeout(() => {
        this.runTimer();
      }, 10);
    }

    addCurrentNum() {
      this.currentNum++;
    }

    getCurrentNum() {
      return this.currentNum;
    }

    getTimeoutId() {
      return this.timeoutId;
    }

    getLevel() {
      return this.level;
    }
  }

  new Game(5);
}