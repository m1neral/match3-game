import { CONTAINER, SCORE_LABEL, FINISH_GAME, FIGURES } from './Settings';

export default class GridView {
    constructor(gameState) {
        this.gameState = gameState;
        this.defineFields();
        this.createGrid();
    }

    defineFields() {
        this.grid = null;
        this.cellSelected = false;
        this.initCell = { x: -1, y: -1, el: null };
        this.destinCell = { x: -1, y: -1, el: null };
    }

    createGrid() {
        this.grid = document.createElement('table');
        let gameMatrix = this.gameState.getGameState();

        gameMatrix.forEach((elem, i) => {
            let tr = document.createElement('tr');
            tr.setAttribute('y', '' + i);
            gameMatrix[i].forEach((elem, j) => {
                let td = document.createElement('td');
                td.setAttribute('x', '' + j);
                td.addEventListener('click', this.onCellClick.bind(this));
                td.appendChild(this.createFigurePicture(elem));
                tr.appendChild(td);
            });
            this.grid.appendChild(tr);
        });

        CONTAINER.appendChild(this.grid);
    }

    updateGrid() {
        let gameMatrix = this.gameState.getGameState();
        gameMatrix.forEach((elem, i) => {
            gameMatrix[i].forEach((elem, j) => {
                this.grid.childNodes[i].childNodes[j].childNodes[0].src = this.setFigurePicture(elem);
            });
        });

    }

    createFigurePicture(figureNumber) {
        let pict = document.createElement('img');
        pict.setAttribute('class', FIGURES[figureNumber].name);
        pict.setAttribute('src', FIGURES[figureNumber].src);
        return pict;
    }

    setFigurePicture(figureNumber) {
        return FIGURES[figureNumber].src;
    }

    onCellClick(e) {
        this.handleCellClick(e, parseInt(e.currentTarget.getAttribute('x').split('')[0]),
            parseInt(e.currentTarget.parentNode.getAttribute('y').split('')[0]));
    }

    handleCellClick(e, x, y) {
        if (!this.cellSelected) {
            this.initCell = { x: x, y: y, el: e.currentTarget };
            this.initCell.el.style.backgroundColor = 'green';
            this.cellSelected = true;
        } else {
            this.destinCell = { x: x, y: y, el: e.currentTarget };
            this.initCell.el.style.backgroundColor = 'transparent';
            this.cellSelected = false;
            if (this.validateMove()) {
                this.gameState.setGameStateMove(this.initCell.x, this.initCell.y, this.destinCell.x, this.destinCell.y);
                this.updateGrid();
                this.updateScoreLabel();
            }
        }
    }

    validateMove() {
        return ((Math.abs(this.initCell.x - this.destinCell.x) === 1 && this.initCell.y === this.destinCell.y)
            || (Math.abs(this.initCell.y - this.destinCell.y) === 1 && this.initCell.x === this.destinCell.x));
    }

    updateScoreLabel() {
        if (this.gameState.getScore() < FINISH_GAME.score) {
            SCORE_LABEL.innerHTML = this.gameState.getScore();
        } else {
            SCORE_LABEL.innerHTML = FINISH_GAME.message;
            CONTAINER.style.opacity = 0.2;
        }
    }
}