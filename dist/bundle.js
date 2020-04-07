/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/GemPuzzle.js":
/*!**************************!*\
  !*** ./src/GemPuzzle.js ***!
  \**************************/
/*! exports provided: GemPuzzle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GemPuzzle", function() { return GemPuzzle; });
class GemPuzzle {
  constructor(size){
    this.started = false
    this.timer = new Date(0)
    
    this.counter = 0
    this.size = +size
    this.container = document.createElement('div')
    this.container.classList.add('puzzle')
    document.body.append(this.container)
    let containerWidth = 300
    this.container.style.width = containerWidth + 'px'
    this.container.style.height = containerWidth + 'px'
    this.cells = new Array(this.size*this.size - 1).fill(0).map((_,index)=>index + 1)
    this.shakeCells = []
    this.shake()
    this.checkSolvable(this.shakeCells)
    this.cellsNode = []
    this.shakeCells.forEach((item, index)=>{
      const cell = document.createElement('div')
      cell.puzzleIndex = index
      cell.classList.add('puzzle__cell')
      cell.innerHTML = '<p>' + item + '</p>'
      cell.trueOrder = +item
      cell.style.fontSize = 52 - this.size*4 + 'px'
      console.log(this.container.style.width)
      cell.style.width = containerWidth / this.size + 'px'
      cell.style.height = containerWidth / this.size + 'px'
      this.cellsNode.push(cell)
      this.container.append(cell)
      if(index === this.shakeCells.length - 1) {
        this.hole = cell
        cell.classList.add('puzzle__cell_empty')
        cell.innerHTML = ''
      }
    })
    //this.emptyCell.style.order = this.size * this.size - 1
    this.move = {
      up: -this.size,
      left: -1,
      down: this.size,
      right: 1
    }
    this.indexOfHole = this.size * this.size - 1
    this.container.addEventListener('click',(event)=>{
      if(!this.started){
        this.setInt = setInterval(()=>{
          this.timer.setSeconds(this.timer.getSeconds() + 1)
          document.querySelector('.timer').innerHTML = `Времени прошло:
          ${this.timer.getMinutes()<10? '0' + this.timer.getMinutes():this.timer.getMinutes()} 
          : ${this.timer.getSeconds()<10? '0' + this.timer.getSeconds():this.timer.getSeconds()}`
        }, 1000)
        this.started = true
      }
      let current = event.target.closest('.puzzle__cell')
      if(!current) return
      console.log(current.puzzleIndex, ' ',  this.hole.puzzleIndex, ' ', this.size)
      if(!(current.puzzleIndex - 1 === this.hole.puzzleIndex ||
        current.puzzleIndex + 1 === this.hole.puzzleIndex ||
        current.puzzleIndex - this.size === this.hole.puzzleIndex ||
        current.puzzleIndex + this.size === this.hole.puzzleIndex)) return
        this.animation(current)
        let that = this
        current.addEventListener('animationend', stopAnimation)
        
        function stopAnimation(){
          current.classList.remove('toLeft', 'toRight', 'toUp', 'toDown')
          that.swap(current)
          that.container.append(...that.cellsNode)
          current.removeEventListener('animationend', stopAnimation)
          that.counter += 1
          document.querySelector('.counter').innerHTML = `Количество ходов: ${that.counter}`
          //console.log(that.isCompleted)
          
          if(that.isCompleted()){
            that.removeInterval()
alert(`Ура! Вы решили головоломку за ${that.timer.getMinutes()<10? '0' + that.timer.getMinutes():that.timer.getMinutes()}:${that.timer.getSeconds()<10? '0' + that.timer.getSeconds():that.timer.getSeconds()} и ${that.counter} ходов`)}
        
}
    })
  }
  removeInterval(){
    clearInterval(this.setInt)
  }
  animation(current){
    let def = this.hole.puzzleIndex - current.puzzleIndex
    let addClass
    switch (def) {
      case 1 : addClass = 'toRight'
      break;
      case -1 : addClass = 'toLeft'
      break;
      case this.size : addClass = 'toDown'
      break;
      case -this.size : addClass = 'toUp'
      break;
      default:;
    }
    current.classList.add(addClass)
  }
  isCompleted(){
    return !this.cellsNode.some(function(item, i) { return item.trueOrder > 0 && item.trueOrder-1 !== i; });
  }
  shake(){
    this.shakeCells = this.cells.sort(function() { return Math.random()-.5; }).concat(0)
  }
  swap(current){
    this.cellsNode[this.hole.puzzleIndex] = current
    this.cellsNode[current.puzzleIndex] = this.hole
    let temp = this.hole.puzzleIndex
    this.hole.puzzleIndex = current.puzzleIndex
    current.puzzleIndex = temp
  }
  solvable(a) {
    for (var kDisorder = 0, i = 1, len = a.length-1; i < len; i++)
      for (var j = i-1; j >= 0; j--) if (a[j] > a[i]) kDisorder++;
    return !(kDisorder % 2);
  }
  checkSolvable(a) {
    if (!this.solvable(a)) {
      let temp = a[0]
      a[0] = a[1]
      a[1] = temp
    }
  }

}






/*
var fifteen = {
  Move: {up: -4, left: -1, down: 4, right: 1},
  order: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(function() { return Math.random()-.5; }).concat(0),
  hole: 15,
  isCompleted: function() { return !this.order.some(function(item, i) { return item > 0 && item-1 !== i; }); },
  go: function(move) {
    var index = this.hole + move;
    if (!this.order[index]) return false;
    if (move == fifteen.Move.left || move == fifteen.Move.right)
      if (Math.floor(this.hole/4) !== Math.floor(index/4)) return false;
    this.swap(index, this.hole);
    this.hole = index;
    return true; },
  swap: function(i1, i2) { var t = this.order[i1]; this.order[i1] = this.order[i2]; this.order[i2] = t; },
  solvable: function(a) {
    for (var kDisorder = 0, i = 1, len = a.length-1; i < len; i++)
      for (var j = i-1; j >= 0; j--) if (a[j] > a[i]) kDisorder++;
    return !(kDisorder % 2); } };

if (!fifteen.solvable(fifteen.order)) fifteen.swap(0, 1);

var box = document.body.appendChild(document.createElement('div'));

for (var i = 0; i < 16; i++) box.appendChild(document.createElement('div'));
window.addEventListener('keydown', function(e) {
  if (fifteen.go(fifteen.Move[{39: 'left', 37: 'right', 40: 'up', 38: 'down'}[e.keyCode]])) {
    draw(); if (fifteen.isCompleted()) {
      box.style.backgroundColor = "gold";
      window.removeEventListener('keydown', arguments.callee); } }});
draw();
function draw() {
  for (var i = 0, tile; tile = box.childNodes[i], i < 16; i++) {
    tile.textContent = fifteen.order[i]; tile.style.visibility = fifteen.order[i]? 'visible' : 'hidden'; } 
  };*/



/***/ }),

/***/ "./src/gem-puzzle.js":
/*!***************************!*\
  !*** ./src/gem-puzzle.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GemPuzzle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GemPuzzle */ "./src/GemPuzzle.js");

let h1 = document.createElement('h1')
h1.innerHTML = 'RSS Игра в пятнашки'
document.body.append(h1)
let fieldSize = document.createElement('label')
document.body.append(fieldSize)
fieldSize.innerHTML = 'Размер игрового поля (min 3х3, max 8х8):'
let setSize = document.createElement('input')
setSize.type = 'number'
setSize.min = 3
setSize.max = 8
setSize.value = 4
fieldSize.after(setSize)
let generateField = document.createElement('button')
generateField.innerHTML = 'Новая игра'
document.body.append(generateField)

let counter = document.createElement('div')
counter.classList.add('counter')
counter.innerHTML = 'Вперёд!'
document.body.append(counter)

let timer = document.createElement('div')
timer.classList.add('timer')
timer.innerHTML = 'Начните игру'
document.body.append(timer)


let mygame = new _GemPuzzle__WEBPACK_IMPORTED_MODULE_0__["GemPuzzle"](setSize.value)



setSize.addEventListener('change',()=>{
  if(setSize.value >8 || setSize.value < 3) return
  timer.innerHTML = 'Начните игру'
  counter.innerHTML = 'Вперёд!'
  mygame.container.remove()
  mygame.removeInterval()
  mygame = new _GemPuzzle__WEBPACK_IMPORTED_MODULE_0__["GemPuzzle"](setSize.value)
})

generateField.addEventListener('click',()=>{
  timer.innerHTML = 'Начните игру'
  counter.innerHTML = 'Вперёд!'
  mygame.container.remove()
  mygame.removeInterval()
  mygame = new _GemPuzzle__WEBPACK_IMPORTED_MODULE_0__["GemPuzzle"](setSize.value)
})



//20 8
//40 3







/*
var fifteen = {
  Move: {up: -4, left: -1, down: 4, right: 1},
  order: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(function() { return Math.random()-.5; }).concat(0),
  hole: 15,
  isCompleted: function() { return !this.order.some(function(item, i) { return item > 0 && item-1 !== i; }); },
  go: function(move) {
    var index = this.hole + move;
    if (!this.order[index]) return false;
    if (move == fifteen.Move.left || move == fifteen.Move.right)
      if (Math.floor(this.hole/4) !== Math.floor(index/4)) return false;
    this.swap(index, this.hole);
    this.hole = index;
    return true; },
  swap: function(i1, i2) { var t = this.order[i1]; this.order[i1] = this.order[i2]; this.order[i2] = t; },
  solvable: function(a) {
    for (var kDisorder = 0, i = 1, len = a.length-1; i < len; i++)
      for (var j = i-1; j >= 0; j--) if (a[j] > a[i]) kDisorder++;
    return !(kDisorder % 2); } };

if (!fifteen.solvable(fifteen.order)) fifteen.swap(0, 1);

var box = document.body.appendChild(document.createElement('div'));

for (var i = 0; i < 16; i++) box.appendChild(document.createElement('div'));
window.addEventListener('keydown', function(e) {
  if (fifteen.go(fifteen.Move[{39: 'left', 37: 'right', 40: 'up', 38: 'down'}[e.keyCode]])) {
    draw(); if (fifteen.isCompleted()) {
      box.style.backgroundColor = "gold";
      window.removeEventListener('keydown', arguments.callee); } }});
draw();
function draw() {
  for (var i = 0, tile; tile = box.childNodes[i], i < 16; i++) {
    tile.textContent = fifteen.order[i]; tile.style.visibility = fifteen.order[i]? 'visible' : 'hidden'; } 
  };*/

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.scss */ "./src/styles/main.scss");
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_main_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gem_puzzle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gem-puzzle */ "./src/gem-puzzle.js");



/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dlbVB1enpsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2VtLXB1enpsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9tYWluLnNjc3M/MmZmNCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7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dC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiZXhwb3J0IGNsYXNzIEdlbVB1enpsZSB7XHJcbiAgY29uc3RydWN0b3Ioc2l6ZSl7XHJcbiAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZVxyXG4gICAgdGhpcy50aW1lciA9IG5ldyBEYXRlKDApXHJcbiAgICBcclxuICAgIHRoaXMuY291bnRlciA9IDBcclxuICAgIHRoaXMuc2l6ZSA9ICtzaXplXHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdwdXp6bGUnKVxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmQodGhpcy5jb250YWluZXIpXHJcbiAgICBsZXQgY29udGFpbmVyV2lkdGggPSAzMDBcclxuICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLndpZHRoID0gY29udGFpbmVyV2lkdGggKyAncHgnXHJcbiAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBjb250YWluZXJXaWR0aCArICdweCdcclxuICAgIHRoaXMuY2VsbHMgPSBuZXcgQXJyYXkodGhpcy5zaXplKnRoaXMuc2l6ZSAtIDEpLmZpbGwoMCkubWFwKChfLGluZGV4KT0+aW5kZXggKyAxKVxyXG4gICAgdGhpcy5zaGFrZUNlbGxzID0gW11cclxuICAgIHRoaXMuc2hha2UoKVxyXG4gICAgdGhpcy5jaGVja1NvbHZhYmxlKHRoaXMuc2hha2VDZWxscylcclxuICAgIHRoaXMuY2VsbHNOb2RlID0gW11cclxuICAgIHRoaXMuc2hha2VDZWxscy5mb3JFYWNoKChpdGVtLCBpbmRleCk9PntcclxuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgIGNlbGwucHV6emxlSW5kZXggPSBpbmRleFxyXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3B1enpsZV9fY2VsbCcpXHJcbiAgICAgIGNlbGwuaW5uZXJIVE1MID0gJzxwPicgKyBpdGVtICsgJzwvcD4nXHJcbiAgICAgIGNlbGwudHJ1ZU9yZGVyID0gK2l0ZW1cclxuICAgICAgY2VsbC5zdHlsZS5mb250U2l6ZSA9IDUyIC0gdGhpcy5zaXplKjQgKyAncHgnXHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29udGFpbmVyLnN0eWxlLndpZHRoKVxyXG4gICAgICBjZWxsLnN0eWxlLndpZHRoID0gY29udGFpbmVyV2lkdGggLyB0aGlzLnNpemUgKyAncHgnXHJcbiAgICAgIGNlbGwuc3R5bGUuaGVpZ2h0ID0gY29udGFpbmVyV2lkdGggLyB0aGlzLnNpemUgKyAncHgnXHJcbiAgICAgIHRoaXMuY2VsbHNOb2RlLnB1c2goY2VsbClcclxuICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kKGNlbGwpXHJcbiAgICAgIGlmKGluZGV4ID09PSB0aGlzLnNoYWtlQ2VsbHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgIHRoaXMuaG9sZSA9IGNlbGxcclxuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3B1enpsZV9fY2VsbF9lbXB0eScpXHJcbiAgICAgICAgY2VsbC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgLy90aGlzLmVtcHR5Q2VsbC5zdHlsZS5vcmRlciA9IHRoaXMuc2l6ZSAqIHRoaXMuc2l6ZSAtIDFcclxuICAgIHRoaXMubW92ZSA9IHtcclxuICAgICAgdXA6IC10aGlzLnNpemUsXHJcbiAgICAgIGxlZnQ6IC0xLFxyXG4gICAgICBkb3duOiB0aGlzLnNpemUsXHJcbiAgICAgIHJpZ2h0OiAxXHJcbiAgICB9XHJcbiAgICB0aGlzLmluZGV4T2ZIb2xlID0gdGhpcy5zaXplICogdGhpcy5zaXplIC0gMVxyXG4gICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLChldmVudCk9PntcclxuICAgICAgaWYoIXRoaXMuc3RhcnRlZCl7XHJcbiAgICAgICAgdGhpcy5zZXRJbnQgPSBzZXRJbnRlcnZhbCgoKT0+e1xyXG4gICAgICAgICAgdGhpcy50aW1lci5zZXRTZWNvbmRzKHRoaXMudGltZXIuZ2V0U2Vjb25kcygpICsgMSlcclxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aW1lcicpLmlubmVySFRNTCA9IGDQktGA0LXQvNC10L3QuCDQv9GA0L7RiNC70L46XHJcbiAgICAgICAgICAke3RoaXMudGltZXIuZ2V0TWludXRlcygpPDEwPyAnMCcgKyB0aGlzLnRpbWVyLmdldE1pbnV0ZXMoKTp0aGlzLnRpbWVyLmdldE1pbnV0ZXMoKX0gXHJcbiAgICAgICAgICA6ICR7dGhpcy50aW1lci5nZXRTZWNvbmRzKCk8MTA/ICcwJyArIHRoaXMudGltZXIuZ2V0U2Vjb25kcygpOnRoaXMudGltZXIuZ2V0U2Vjb25kcygpfWBcclxuICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWVcclxuICAgICAgfVxyXG4gICAgICBsZXQgY3VycmVudCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcucHV6emxlX19jZWxsJylcclxuICAgICAgaWYoIWN1cnJlbnQpIHJldHVyblxyXG4gICAgICBjb25zb2xlLmxvZyhjdXJyZW50LnB1enpsZUluZGV4LCAnICcsICB0aGlzLmhvbGUucHV6emxlSW5kZXgsICcgJywgdGhpcy5zaXplKVxyXG4gICAgICBpZighKGN1cnJlbnQucHV6emxlSW5kZXggLSAxID09PSB0aGlzLmhvbGUucHV6emxlSW5kZXggfHxcclxuICAgICAgICBjdXJyZW50LnB1enpsZUluZGV4ICsgMSA9PT0gdGhpcy5ob2xlLnB1enpsZUluZGV4IHx8XHJcbiAgICAgICAgY3VycmVudC5wdXp6bGVJbmRleCAtIHRoaXMuc2l6ZSA9PT0gdGhpcy5ob2xlLnB1enpsZUluZGV4IHx8XHJcbiAgICAgICAgY3VycmVudC5wdXp6bGVJbmRleCArIHRoaXMuc2l6ZSA9PT0gdGhpcy5ob2xlLnB1enpsZUluZGV4KSkgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5hbmltYXRpb24oY3VycmVudClcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXNcclxuICAgICAgICBjdXJyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIHN0b3BBbmltYXRpb24pXHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gc3RvcEFuaW1hdGlvbigpe1xyXG4gICAgICAgICAgY3VycmVudC5jbGFzc0xpc3QucmVtb3ZlKCd0b0xlZnQnLCAndG9SaWdodCcsICd0b1VwJywgJ3RvRG93bicpXHJcbiAgICAgICAgICB0aGF0LnN3YXAoY3VycmVudClcclxuICAgICAgICAgIHRoYXQuY29udGFpbmVyLmFwcGVuZCguLi50aGF0LmNlbGxzTm9kZSlcclxuICAgICAgICAgIGN1cnJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgc3RvcEFuaW1hdGlvbilcclxuICAgICAgICAgIHRoYXQuY291bnRlciArPSAxXHJcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY291bnRlcicpLmlubmVySFRNTCA9IGDQmtC+0LvQuNGH0LXRgdGC0LLQviDRhdC+0LTQvtCyOiAke3RoYXQuY291bnRlcn1gXHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoYXQuaXNDb21wbGV0ZWQpXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGlmKHRoYXQuaXNDb21wbGV0ZWQoKSl7XHJcbiAgICAgICAgICAgIHRoYXQucmVtb3ZlSW50ZXJ2YWwoKVxyXG5hbGVydChg0KPRgNCwISDQktGLINGA0LXRiNC40LvQuCDQs9C+0LvQvtCy0L7Qu9C+0LzQutGDINC30LAgJHt0aGF0LnRpbWVyLmdldE1pbnV0ZXMoKTwxMD8gJzAnICsgdGhhdC50aW1lci5nZXRNaW51dGVzKCk6dGhhdC50aW1lci5nZXRNaW51dGVzKCl9OiR7dGhhdC50aW1lci5nZXRTZWNvbmRzKCk8MTA/ICcwJyArIHRoYXQudGltZXIuZ2V0U2Vjb25kcygpOnRoYXQudGltZXIuZ2V0U2Vjb25kcygpfSDQuCAke3RoYXQuY291bnRlcn0g0YXQvtC00L7QsmApfVxyXG4gICAgICAgIFxyXG59XHJcbiAgICB9KVxyXG4gIH1cclxuICByZW1vdmVJbnRlcnZhbCgpe1xyXG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnNldEludClcclxuICB9XHJcbiAgYW5pbWF0aW9uKGN1cnJlbnQpe1xyXG4gICAgbGV0IGRlZiA9IHRoaXMuaG9sZS5wdXp6bGVJbmRleCAtIGN1cnJlbnQucHV6emxlSW5kZXhcclxuICAgIGxldCBhZGRDbGFzc1xyXG4gICAgc3dpdGNoIChkZWYpIHtcclxuICAgICAgY2FzZSAxIDogYWRkQ2xhc3MgPSAndG9SaWdodCdcclxuICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgLTEgOiBhZGRDbGFzcyA9ICd0b0xlZnQnXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIHRoaXMuc2l6ZSA6IGFkZENsYXNzID0gJ3RvRG93bidcclxuICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgLXRoaXMuc2l6ZSA6IGFkZENsYXNzID0gJ3RvVXAnXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OjtcclxuICAgIH1cclxuICAgIGN1cnJlbnQuY2xhc3NMaXN0LmFkZChhZGRDbGFzcylcclxuICB9XHJcbiAgaXNDb21wbGV0ZWQoKXtcclxuICAgIHJldHVybiAhdGhpcy5jZWxsc05vZGUuc29tZShmdW5jdGlvbihpdGVtLCBpKSB7IHJldHVybiBpdGVtLnRydWVPcmRlciA+IDAgJiYgaXRlbS50cnVlT3JkZXItMSAhPT0gaTsgfSk7XHJcbiAgfVxyXG4gIHNoYWtlKCl7XHJcbiAgICB0aGlzLnNoYWtlQ2VsbHMgPSB0aGlzLmNlbGxzLnNvcnQoZnVuY3Rpb24oKSB7IHJldHVybiBNYXRoLnJhbmRvbSgpLS41OyB9KS5jb25jYXQoMClcclxuICB9XHJcbiAgc3dhcChjdXJyZW50KXtcclxuICAgIHRoaXMuY2VsbHNOb2RlW3RoaXMuaG9sZS5wdXp6bGVJbmRleF0gPSBjdXJyZW50XHJcbiAgICB0aGlzLmNlbGxzTm9kZVtjdXJyZW50LnB1enpsZUluZGV4XSA9IHRoaXMuaG9sZVxyXG4gICAgbGV0IHRlbXAgPSB0aGlzLmhvbGUucHV6emxlSW5kZXhcclxuICAgIHRoaXMuaG9sZS5wdXp6bGVJbmRleCA9IGN1cnJlbnQucHV6emxlSW5kZXhcclxuICAgIGN1cnJlbnQucHV6emxlSW5kZXggPSB0ZW1wXHJcbiAgfVxyXG4gIHNvbHZhYmxlKGEpIHtcclxuICAgIGZvciAodmFyIGtEaXNvcmRlciA9IDAsIGkgPSAxLCBsZW4gPSBhLmxlbmd0aC0xOyBpIDwgbGVuOyBpKyspXHJcbiAgICAgIGZvciAodmFyIGogPSBpLTE7IGogPj0gMDsgai0tKSBpZiAoYVtqXSA+IGFbaV0pIGtEaXNvcmRlcisrO1xyXG4gICAgcmV0dXJuICEoa0Rpc29yZGVyICUgMik7XHJcbiAgfVxyXG4gIGNoZWNrU29sdmFibGUoYSkge1xyXG4gICAgaWYgKCF0aGlzLnNvbHZhYmxlKGEpKSB7XHJcbiAgICAgIGxldCB0ZW1wID0gYVswXVxyXG4gICAgICBhWzBdID0gYVsxXVxyXG4gICAgICBhWzFdID0gdGVtcFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLypcclxudmFyIGZpZnRlZW4gPSB7XHJcbiAgTW92ZToge3VwOiAtNCwgbGVmdDogLTEsIGRvd246IDQsIHJpZ2h0OiAxfSxcclxuICBvcmRlcjogWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTVdLnNvcnQoZnVuY3Rpb24oKSB7IHJldHVybiBNYXRoLnJhbmRvbSgpLS41OyB9KS5jb25jYXQoMCksXHJcbiAgaG9sZTogMTUsXHJcbiAgaXNDb21wbGV0ZWQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gIXRoaXMub3JkZXIuc29tZShmdW5jdGlvbihpdGVtLCBpKSB7IHJldHVybiBpdGVtID4gMCAmJiBpdGVtLTEgIT09IGk7IH0pOyB9LFxyXG4gIGdvOiBmdW5jdGlvbihtb3ZlKSB7XHJcbiAgICB2YXIgaW5kZXggPSB0aGlzLmhvbGUgKyBtb3ZlO1xyXG4gICAgaWYgKCF0aGlzLm9yZGVyW2luZGV4XSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKG1vdmUgPT0gZmlmdGVlbi5Nb3ZlLmxlZnQgfHwgbW92ZSA9PSBmaWZ0ZWVuLk1vdmUucmlnaHQpXHJcbiAgICAgIGlmIChNYXRoLmZsb29yKHRoaXMuaG9sZS80KSAhPT0gTWF0aC5mbG9vcihpbmRleC80KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgdGhpcy5zd2FwKGluZGV4LCB0aGlzLmhvbGUpO1xyXG4gICAgdGhpcy5ob2xlID0gaW5kZXg7XHJcbiAgICByZXR1cm4gdHJ1ZTsgfSxcclxuICBzd2FwOiBmdW5jdGlvbihpMSwgaTIpIHsgdmFyIHQgPSB0aGlzLm9yZGVyW2kxXTsgdGhpcy5vcmRlcltpMV0gPSB0aGlzLm9yZGVyW2kyXTsgdGhpcy5vcmRlcltpMl0gPSB0OyB9LFxyXG4gIHNvbHZhYmxlOiBmdW5jdGlvbihhKSB7XHJcbiAgICBmb3IgKHZhciBrRGlzb3JkZXIgPSAwLCBpID0gMSwgbGVuID0gYS5sZW5ndGgtMTsgaSA8IGxlbjsgaSsrKVxyXG4gICAgICBmb3IgKHZhciBqID0gaS0xOyBqID49IDA7IGotLSkgaWYgKGFbal0gPiBhW2ldKSBrRGlzb3JkZXIrKztcclxuICAgIHJldHVybiAhKGtEaXNvcmRlciAlIDIpOyB9IH07XHJcblxyXG5pZiAoIWZpZnRlZW4uc29sdmFibGUoZmlmdGVlbi5vcmRlcikpIGZpZnRlZW4uc3dhcCgwLCAxKTtcclxuXHJcbnZhciBib3ggPSBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcclxuXHJcbmZvciAodmFyIGkgPSAwOyBpIDwgMTY7IGkrKykgYm94LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XHJcbiAgaWYgKGZpZnRlZW4uZ28oZmlmdGVlbi5Nb3ZlW3szOTogJ2xlZnQnLCAzNzogJ3JpZ2h0JywgNDA6ICd1cCcsIDM4OiAnZG93bid9W2Uua2V5Q29kZV1dKSkge1xyXG4gICAgZHJhdygpOyBpZiAoZmlmdGVlbi5pc0NvbXBsZXRlZCgpKSB7XHJcbiAgICAgIGJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdvbGRcIjtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBhcmd1bWVudHMuY2FsbGVlKTsgfSB9fSk7XHJcbmRyYXcoKTtcclxuZnVuY3Rpb24gZHJhdygpIHtcclxuICBmb3IgKHZhciBpID0gMCwgdGlsZTsgdGlsZSA9IGJveC5jaGlsZE5vZGVzW2ldLCBpIDwgMTY7IGkrKykge1xyXG4gICAgdGlsZS50ZXh0Q29udGVudCA9IGZpZnRlZW4ub3JkZXJbaV07IHRpbGUuc3R5bGUudmlzaWJpbGl0eSA9IGZpZnRlZW4ub3JkZXJbaV0/ICd2aXNpYmxlJyA6ICdoaWRkZW4nOyB9IFxyXG4gIH07Ki9cclxuXHJcbiIsImltcG9ydCB7R2VtUHV6emxlfSBmcm9tICcuL0dlbVB1enpsZSdcclxubGV0IGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKVxyXG5oMS5pbm5lckhUTUwgPSAnUlNTINCY0LPRgNCwINCyINC/0Y/RgtC90LDRiNC60LgnXHJcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGgxKVxyXG5sZXQgZmllbGRTaXplID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKVxyXG5kb2N1bWVudC5ib2R5LmFwcGVuZChmaWVsZFNpemUpXHJcbmZpZWxkU2l6ZS5pbm5lckhUTUwgPSAn0KDQsNC30LzQtdGAINC40LPRgNC+0LLQvtCz0L4g0L/QvtC70Y8gKG1pbiAz0YUzLCBtYXggONGFOCk6J1xyXG5sZXQgc2V0U2l6ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jylcclxuc2V0U2l6ZS50eXBlID0gJ251bWJlcidcclxuc2V0U2l6ZS5taW4gPSAzXHJcbnNldFNpemUubWF4ID0gOFxyXG5zZXRTaXplLnZhbHVlID0gNFxyXG5maWVsZFNpemUuYWZ0ZXIoc2V0U2l6ZSlcclxubGV0IGdlbmVyYXRlRmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxyXG5nZW5lcmF0ZUZpZWxkLmlubmVySFRNTCA9ICfQndC+0LLQsNGPINC40LPRgNCwJ1xyXG5kb2N1bWVudC5ib2R5LmFwcGVuZChnZW5lcmF0ZUZpZWxkKVxyXG5cclxubGV0IGNvdW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG5jb3VudGVyLmNsYXNzTGlzdC5hZGQoJ2NvdW50ZXInKVxyXG5jb3VudGVyLmlubmVySFRNTCA9ICfQktC/0LXRgNGR0LQhJ1xyXG5kb2N1bWVudC5ib2R5LmFwcGVuZChjb3VudGVyKVxyXG5cclxubGV0IHRpbWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxudGltZXIuY2xhc3NMaXN0LmFkZCgndGltZXInKVxyXG50aW1lci5pbm5lckhUTUwgPSAn0J3QsNGH0L3QuNGC0LUg0LjQs9GA0YMnXHJcbmRvY3VtZW50LmJvZHkuYXBwZW5kKHRpbWVyKVxyXG5cclxuXHJcbmxldCBteWdhbWUgPSBuZXcgR2VtUHV6emxlKHNldFNpemUudmFsdWUpXHJcblxyXG5cclxuXHJcbnNldFNpemUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywoKT0+e1xyXG4gIGlmKHNldFNpemUudmFsdWUgPjggfHwgc2V0U2l6ZS52YWx1ZSA8IDMpIHJldHVyblxyXG4gIHRpbWVyLmlubmVySFRNTCA9ICfQndCw0YfQvdC40YLQtSDQuNCz0YDRgydcclxuICBjb3VudGVyLmlubmVySFRNTCA9ICfQktC/0LXRgNGR0LQhJ1xyXG4gIG15Z2FtZS5jb250YWluZXIucmVtb3ZlKClcclxuICBteWdhbWUucmVtb3ZlSW50ZXJ2YWwoKVxyXG4gIG15Z2FtZSA9IG5ldyBHZW1QdXp6bGUoc2V0U2l6ZS52YWx1ZSlcclxufSlcclxuXHJcbmdlbmVyYXRlRmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XHJcbiAgdGltZXIuaW5uZXJIVE1MID0gJ9Cd0LDRh9C90LjRgtC1INC40LPRgNGDJ1xyXG4gIGNvdW50ZXIuaW5uZXJIVE1MID0gJ9CS0L/QtdGA0ZHQtCEnXHJcbiAgbXlnYW1lLmNvbnRhaW5lci5yZW1vdmUoKVxyXG4gIG15Z2FtZS5yZW1vdmVJbnRlcnZhbCgpXHJcbiAgbXlnYW1lID0gbmV3IEdlbVB1enpsZShzZXRTaXplLnZhbHVlKVxyXG59KVxyXG5cclxuXHJcblxyXG4vLzIwIDhcclxuLy80MCAzXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vKlxyXG52YXIgZmlmdGVlbiA9IHtcclxuICBNb3ZlOiB7dXA6IC00LCBsZWZ0OiAtMSwgZG93bjogNCwgcmlnaHQ6IDF9LFxyXG4gIG9yZGVyOiBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNV0uc29ydChmdW5jdGlvbigpIHsgcmV0dXJuIE1hdGgucmFuZG9tKCktLjU7IH0pLmNvbmNhdCgwKSxcclxuICBob2xlOiAxNSxcclxuICBpc0NvbXBsZXRlZDogZnVuY3Rpb24oKSB7IHJldHVybiAhdGhpcy5vcmRlci5zb21lKGZ1bmN0aW9uKGl0ZW0sIGkpIHsgcmV0dXJuIGl0ZW0gPiAwICYmIGl0ZW0tMSAhPT0gaTsgfSk7IH0sXHJcbiAgZ286IGZ1bmN0aW9uKG1vdmUpIHtcclxuICAgIHZhciBpbmRleCA9IHRoaXMuaG9sZSArIG1vdmU7XHJcbiAgICBpZiAoIXRoaXMub3JkZXJbaW5kZXhdKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAobW92ZSA9PSBmaWZ0ZWVuLk1vdmUubGVmdCB8fCBtb3ZlID09IGZpZnRlZW4uTW92ZS5yaWdodClcclxuICAgICAgaWYgKE1hdGguZmxvb3IodGhpcy5ob2xlLzQpICE9PSBNYXRoLmZsb29yKGluZGV4LzQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICB0aGlzLnN3YXAoaW5kZXgsIHRoaXMuaG9sZSk7XHJcbiAgICB0aGlzLmhvbGUgPSBpbmRleDtcclxuICAgIHJldHVybiB0cnVlOyB9LFxyXG4gIHN3YXA6IGZ1bmN0aW9uKGkxLCBpMikgeyB2YXIgdCA9IHRoaXMub3JkZXJbaTFdOyB0aGlzLm9yZGVyW2kxXSA9IHRoaXMub3JkZXJbaTJdOyB0aGlzLm9yZGVyW2kyXSA9IHQ7IH0sXHJcbiAgc29sdmFibGU6IGZ1bmN0aW9uKGEpIHtcclxuICAgIGZvciAodmFyIGtEaXNvcmRlciA9IDAsIGkgPSAxLCBsZW4gPSBhLmxlbmd0aC0xOyBpIDwgbGVuOyBpKyspXHJcbiAgICAgIGZvciAodmFyIGogPSBpLTE7IGogPj0gMDsgai0tKSBpZiAoYVtqXSA+IGFbaV0pIGtEaXNvcmRlcisrO1xyXG4gICAgcmV0dXJuICEoa0Rpc29yZGVyICUgMik7IH0gfTtcclxuXHJcbmlmICghZmlmdGVlbi5zb2x2YWJsZShmaWZ0ZWVuLm9yZGVyKSkgZmlmdGVlbi5zd2FwKDAsIDEpO1xyXG5cclxudmFyIGJveCA9IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpO1xyXG5cclxuZm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgaSsrKSBib3guYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICBpZiAoZmlmdGVlbi5nbyhmaWZ0ZWVuLk1vdmVbezM5OiAnbGVmdCcsIDM3OiAncmlnaHQnLCA0MDogJ3VwJywgMzg6ICdkb3duJ31bZS5rZXlDb2RlXV0pKSB7XHJcbiAgICBkcmF3KCk7IGlmIChmaWZ0ZWVuLmlzQ29tcGxldGVkKCkpIHtcclxuICAgICAgYm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ29sZFwiO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGFyZ3VtZW50cy5jYWxsZWUpOyB9IH19KTtcclxuZHJhdygpO1xyXG5mdW5jdGlvbiBkcmF3KCkge1xyXG4gIGZvciAodmFyIGkgPSAwLCB0aWxlOyB0aWxlID0gYm94LmNoaWxkTm9kZXNbaV0sIGkgPCAxNjsgaSsrKSB7XHJcbiAgICB0aWxlLnRleHRDb250ZW50ID0gZmlmdGVlbi5vcmRlcltpXTsgdGlsZS5zdHlsZS52aXNpYmlsaXR5ID0gZmlmdGVlbi5vcmRlcltpXT8gJ3Zpc2libGUnIDogJ2hpZGRlbic7IH0gXHJcbiAgfTsqLyIsImltcG9ydCAnLi9zdHlsZXMvbWFpbi5zY3NzJztcclxuaW1wb3J0ICcuL2dlbS1wdXp6bGUnOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=