export const CONTAINER = document.getElementById('game-container');
export const SCORE_LABEL = document.getElementById('score');
export const GRID_SIZE = { columns: 9, rows: 9 };
export const FINISH_GAME = { score: 500, message: 'Congratulations! Game over! Refresh a page!' };
export const FIGURES = [
    {
        name: 'square',
        points: 10,
        src: 'images/square.png'
    },
    {
        name: 'triangle',
        points: 20,
        src: 'images/triangle.png'
    },
    {
        name: 'circle',
        points: 30,
        src: 'images/circle.png'
    }
];