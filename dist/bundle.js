/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Main = __webpack_require__(1);

	var _Main2 = _interopRequireDefault(_Main);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.onload = function () {
	  return new _Main2.default();
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _GridView = __webpack_require__(2);

	var _GridView2 = _interopRequireDefault(_GridView);

	var _Model = __webpack_require__(4);

	var _Model2 = _interopRequireDefault(_Model);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Main = function Main() {
	    _classCallCheck(this, Main);

	    new _GridView2.default(new _Model2.default());
	};

	exports.default = Main;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Settings = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GridView = function () {
	    function GridView(gameState) {
	        _classCallCheck(this, GridView);

	        this.gameState = gameState;
	        this.defineFields();
	        this.createGrid();
	    }

	    _createClass(GridView, [{
	        key: 'defineFields',
	        value: function defineFields() {
	            this.grid = null;
	            this.cellSelected = false;
	            this.initCell = { x: -1, y: -1, el: null };
	            this.destinCell = { x: -1, y: -1, el: null };
	        }
	    }, {
	        key: 'createGrid',
	        value: function createGrid() {
	            var _this = this;

	            this.grid = document.createElement('table');
	            var gameMatrix = this.gameState.getGameState();

	            gameMatrix.forEach(function (elem, i) {
	                var tr = document.createElement('tr');
	                tr.setAttribute('y', '' + i);
	                gameMatrix[i].forEach(function (elem, j) {
	                    var td = document.createElement('td');
	                    td.setAttribute('x', '' + j);
	                    td.addEventListener('click', _this.onCellClick.bind(_this));
	                    td.appendChild(_this.createFigurePicture(elem));
	                    tr.appendChild(td);
	                });
	                _this.grid.appendChild(tr);
	            });

	            _Settings.CONTAINER.appendChild(this.grid);
	        }
	    }, {
	        key: 'updateGrid',
	        value: function updateGrid() {
	            var _this2 = this;

	            var gameMatrix = this.gameState.getGameState();
	            gameMatrix.forEach(function (elem, i) {
	                gameMatrix[i].forEach(function (elem, j) {
	                    _this2.grid.childNodes[i].childNodes[j].childNodes[0].src = _this2.setFigurePicture(elem);
	                });
	            });
	        }
	    }, {
	        key: 'createFigurePicture',
	        value: function createFigurePicture(figureNumber) {
	            var pict = document.createElement('img');
	            pict.setAttribute('class', _Settings.FIGURES[figureNumber].name);
	            pict.setAttribute('src', _Settings.FIGURES[figureNumber].src);
	            return pict;
	        }
	    }, {
	        key: 'setFigurePicture',
	        value: function setFigurePicture(figureNumber) {
	            return _Settings.FIGURES[figureNumber].src;
	        }
	    }, {
	        key: 'onCellClick',
	        value: function onCellClick(e) {
	            this.handleCellClick(e, parseInt(e.currentTarget.getAttribute('x').split('')[0]), parseInt(e.currentTarget.parentNode.getAttribute('y').split('')[0]));
	        }
	    }, {
	        key: 'handleCellClick',
	        value: function handleCellClick(e, x, y) {
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
	    }, {
	        key: 'validateMove',
	        value: function validateMove() {
	            return Math.abs(this.initCell.x - this.destinCell.x) === 1 && this.initCell.y === this.destinCell.y || Math.abs(this.initCell.y - this.destinCell.y) === 1 && this.initCell.x === this.destinCell.x;
	        }
	    }, {
	        key: 'updateScoreLabel',
	        value: function updateScoreLabel() {
	            if (this.gameState.getScore() < _Settings.FINISH_GAME.score) {
	                _Settings.SCORE_LABEL.innerHTML = this.gameState.getScore();
	            } else {
	                _Settings.SCORE_LABEL.innerHTML = _Settings.FINISH_GAME.message;
	                _Settings.CONTAINER.style.opacity = 0.2;
	            }
	        }
	    }]);

	    return GridView;
	}();

	exports.default = GridView;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var CONTAINER = exports.CONTAINER = document.getElementById('game-container');
	var SCORE_LABEL = exports.SCORE_LABEL = document.getElementById('score');
	var GRID_SIZE = exports.GRID_SIZE = { columns: 9, rows: 9 };
	var FINISH_GAME = exports.FINISH_GAME = { score: 500, message: 'Congratulations! Game over! Refresh a page!' };
	var FIGURES = exports.FIGURES = [{
	    name: 'square',
	    points: 10,
	    src: 'images/square.png'
	}, {
	    name: 'triangle',
	    points: 20,
	    src: 'images/triangle.png'
	}, {
	    name: 'circle',
	    points: 30,
	    src: 'images/circle.png'
	}];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Settings = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Model = function () {
	    function Model() {
	        _classCallCheck(this, Model);

	        this.defineFields();
	        this.initialize();
	    }

	    _createClass(Model, [{
	        key: 'defineFields',
	        value: function defineFields() {
	            this.gameState = {
	                cells: [],
	                offsets: []
	            };
	            this.clusters = [];
	            this.score = 0;
	        }
	    }, {
	        key: 'initialize',
	        value: function initialize() {
	            this.generateValidGameState();
	        }
	    }, {
	        key: 'generateRandomGameState',
	        value: function generateRandomGameState() {
	            for (var i = 0; i < _Settings.GRID_SIZE.columns; i++) {
	                this.gameState.cells[i] = [];
	                this.gameState.offsets[i] = [];
	                for (var j = 0; j < _Settings.GRID_SIZE.rows; j++) {
	                    this.gameState.offsets[i][j] = 0;
	                    this.gameState.cells[i][j] = Model.getRandomTypeOfCell();
	                }
	            }
	        }
	    }, {
	        key: 'findClusters',
	        value: function findClusters() {
	            this.clusters = this.straightClusterSearch();
	            return this.clusters.length;
	        }
	    }, {
	        key: 'fillOffsets',
	        value: function fillOffsets() {
	            var _this = this;

	            this.clusters.forEach(function (cluster) {
	                for (var i = 0; i < cluster.length; i++) {
	                    if (cluster.vertical) _this.gameState.cells[cluster.y + i][cluster.x] = -1;else _this.gameState.cells[cluster.y][cluster.x + i] = -1;
	                }
	            });

	            for (var j = 0; j < _Settings.GRID_SIZE.columns; j++) {
	                var accOffset = 0;
	                for (var i = _Settings.GRID_SIZE.rows - 1; i >= 0; i--) {
	                    if (this.gameState.cells[i][j] === -1) {
	                        this.gameState.offsets[i][j] = 0;
	                        accOffset++;
	                    } else this.gameState.offsets[i][j] = accOffset;
	                }
	            }
	        }
	    }, {
	        key: 'removeClusters',
	        value: function removeClusters() {
	            while (this.findClusters()) {
	                this.fillOffsets();
	                this.shiftCells();
	            }
	        }
	    }, {
	        key: 'shiftCells',
	        value: function shiftCells() {
	            for (var j = 0; j < _Settings.GRID_SIZE.columns; j++) {
	                for (var i = _Settings.GRID_SIZE.rows - 1; i >= 0; i--) {
	                    if (this.gameState.cells[i][j] === -1) {
	                        this.gameState.cells[i][j] = Model.getRandomTypeOfCell();
	                    } else if (this.gameState.offsets[i][j] !== 0) {
	                        this.swapCells(j, i, j, i + this.gameState.offsets[i][j]);
	                    }
	                    this.gameState.offsets[i][j] = 0;
	                }
	            }
	        }
	    }, {
	        key: 'swapCells',
	        value: function swapCells(x1, y1, x2, y2) {
	            var _ref = [this.gameState.cells[y2][x2], this.gameState.cells[y1][x1]];
	            this.gameState.cells[y1][x1] = _ref[0];
	            this.gameState.cells[y2][x2] = _ref[1];
	        }
	    }, {
	        key: 'straightClusterSearch',
	        value: function straightClusterSearch() {
	            var clusters = [];
	            var verticalClusterLength = 1;
	            var horizontalClusterLength = 1;

	            for (var i = 0; i < _Settings.GRID_SIZE.columns; i++) {
	                for (var j = 0; j < _Settings.GRID_SIZE.rows; j++) {
	                    if (j !== _Settings.GRID_SIZE.rows - 1 && this.gameState.cells[j][i] === this.gameState.cells[j + 1][i] && this.gameState.cells[j][i] !== -1) verticalClusterLength++;else {
	                        if (verticalClusterLength >= 3) clusters.push({
	                            x: i,
	                            y: j - verticalClusterLength + 1,
	                            length: verticalClusterLength,
	                            vertical: true,
	                            type: this.gameState.cells[j - verticalClusterLength + 1][i]
	                        });
	                        verticalClusterLength = 1;
	                    }

	                    if (j !== _Settings.GRID_SIZE.rows - 1 && this.gameState.cells[i][j] === this.gameState.cells[i][j + 1] && this.gameState.cells[i][j] !== -1) horizontalClusterLength++;else {
	                        if (horizontalClusterLength >= 3) clusters.push({
	                            x: j - horizontalClusterLength + 1,
	                            y: i,
	                            length: horizontalClusterLength,
	                            vertical: false,
	                            type: this.gameState.cells[i][j - horizontalClusterLength + 1]
	                        });
	                        horizontalClusterLength = 1;
	                    }
	                }
	            }
	            return clusters;
	        }
	    }, {
	        key: 'generateValidGameState',
	        value: function generateValidGameState() {
	            this.generateRandomGameState();
	            this.removeClusters();
	        }
	    }, {
	        key: 'handleMove',
	        value: function handleMove(x1, y1, x2, y2) {
	            this.swapCells(x1, y1, x2, y2);
	            if (this.findClusters()) {
	                this.increaseScore(this.getScoreOfMove(this.clusters));
	                this.removeClusters();
	            } else this.swapCells(x1, y1, x2, y2);
	        }
	    }, {
	        key: 'getScoreOfMove',
	        value: function getScoreOfMove(clusters) {
	            var score = 0;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = clusters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var cluster = _step.value;
	                    score += _Settings.FIGURES[cluster.type].points * cluster.length;
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            return score;
	        }
	    }, {
	        key: 'increaseScore',
	        value: function increaseScore(count) {
	            this.score += count;
	        }

	        // Static

	    }, {
	        key: 'getGameState',


	        // Public

	        value: function getGameState() {
	            return this.gameState.cells;
	        }
	    }, {
	        key: 'setGameStateMove',
	        value: function setGameStateMove(x1, y1, x2, y2) {
	            this.handleMove(x1, y1, x2, y2);
	        }
	    }, {
	        key: 'getScore',
	        value: function getScore() {
	            return this.score;
	        }
	    }], [{
	        key: 'getRandomTypeOfCell',
	        value: function getRandomTypeOfCell() {
	            return Math.floor(Math.random() * _Settings.FIGURES.length);
	        }
	    }]);

	    return Model;
	}();

	exports.default = Model;

/***/ }
/******/ ]);