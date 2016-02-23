import { GRID_SIZE, FIGURES } from './Settings'

export default class Model {
    constructor() {
        this.defineFields();
        this.initialize();
    }

    defineFields() {
        this.gameState = {
            cells: [],
            offsets: []
        };
        this.clusters = [];
        this.moves = [];
        this.score = 0;
    }

    initialize() {
        this.generateValidGameState();
    }

    generateRandomGameState() {
        for (let i = 0; i < GRID_SIZE.columns; i++) {
            this.gameState.cells[i] = [];
            this.gameState.offsets[i] = [];
            for (let j = 0; j < GRID_SIZE.rows; j++) {
                this.gameState.offsets[i][j] = 0;
                this.gameState.cells[i][j] = Model.getRandomTypeOfCell();
            }
        }
    }

    findClusters() {
        this.clusters = this.straightClusterSearch();
        return this.clusters.length;
    }

    fillOffsets() {
        this.clusters.forEach(cluster => {
           for (let i = 0; i < cluster.length; i++) {
               if (cluster.vertical) this.gameState.cells[cluster.y + i][cluster.x] = -1;
               else this.gameState.cells[cluster.y][cluster.x + i] = -1;
           }
        });

        for (let j = 0; j < GRID_SIZE.columns; j++) {
            let accOffset = 0;
            for (let i = GRID_SIZE.rows - 1; i >= 0; i--) {
                if (this.gameState.cells[i][j] === -1) {
                    this.gameState.offsets[i][j] = 0;
                    accOffset++;
                } else this.gameState.offsets[i][j] = accOffset;
            }
        }
    }

    removeClusters() {
        while (this.findClusters()) {
            this.fillOffsets();
            this.shiftCells();
        }
    }

    shiftCells() {
        for (let j = 0; j < GRID_SIZE.columns; j++) {
            for (let i = GRID_SIZE.rows - 1; i >= 0; i--) {
                if (this.gameState.cells[i][j] === -1) {
                    this.gameState.cells[i][j] = Model.getRandomTypeOfCell();
                } else if (this.gameState.offsets[i][j] !== 0) {
                    this.swapCells(j, i, j, i + this.gameState.offsets[i][j]);
                }
                this.gameState.offsets[i][j] = 0;
            }
        }
    }

    swapCells(x1, y1, x2, y2) {
        [this.gameState.cells[y1][x1], this.gameState.cells[y2][x2]] =
            [this.gameState.cells[y2][x2], this.gameState.cells[y1][x1]]
    }

    straightClusterSearch() {
        let clusters = [];
        let verticalClusterLength = 1;
        let horizontalClusterLength = 1;

        for (let i = 0; i < GRID_SIZE.columns; i++) {
            for (let j = 0; j < GRID_SIZE.rows; j++) {
                if (j !== GRID_SIZE.rows - 1
                    && this.gameState.cells[j][i] === this.gameState.cells[j + 1][i]
                    && this.gameState.cells[j][i] !== -1) verticalClusterLength++;
                else {
                    if (verticalClusterLength >= 3) clusters.push({
                        x: i,
                        y: j - verticalClusterLength + 1,
                        length: verticalClusterLength,
                        vertical: true
                    });
                    verticalClusterLength = 1;
                }

                if (j !== GRID_SIZE.rows - 1
                    && this.gameState.cells[i][j] === this.gameState.cells[i][j+1]
                    && this.gameState.cells[i][j] !== -1) horizontalClusterLength++;
                else {
                    if (horizontalClusterLength >= 3) clusters.push({
                        x: j - horizontalClusterLength + 1,
                        y: i,
                        length: horizontalClusterLength,
                        vertical: false
                    });
                    horizontalClusterLength = 1;
                }
            }
        }
        return clusters;
    }


    generateValidGameState() {
        this.generateRandomGameState();
        this.removeClusters();
    }

    // Static

    static getRandomTypeOfCell() {
        return Math.floor(Math.random() * FIGURES.length);
    }

    // Public

    getGameState() {
        return this.gameState.cells;
    }

    setGameStateMove(x1, y1, x2, y2) {
        this.swapCells(x1, y1, x2, y2);
        this.increaseScore(1);
        this.removeClusters();
    }

    getScore() {
        return this.score;
    }

    increaseScore(count) {
        this.score += count;
    }
}