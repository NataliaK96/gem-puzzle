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
/* harmony import */ var _gem_puzzle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gem-puzzle */ "./src/gem-puzzle.js");

class GemPuzzle {
  constructor(size, saveGame){
    //console.log(saveGame)
    this.counter = saveGame? saveGame.counter : 0
    let saveTimeSec = saveGame? saveGame.timeSec : 0
    let saveTimeMin = saveGame? saveGame.timeMin : 0
    this.timer = new Date(0)
    this.timer.setSeconds(saveTimeSec)
    this.timer.setMinutes(saveTimeMin)
    
    this.started = false
    this.size = +size || 4
    let cells = new Array(this.size*this.size - 1).fill(0).map((_,index)=>index + 1)
    this.shakeCells = saveGame? saveGame.shakeCells : this.shake(cells)
    //console.log(this.shakeCells)
    this.checkSolvable(this.shakeCells)
    this.cellsNode = []
    this.buildFild()
    this.indexOfHole = this.size * this.size - 1
    this.container.addEventListener('click',(event)=>{
      if(!this.started){
        this.setInt = setInterval(()=>{
          this.timer.setSeconds(this.timer.getSeconds() + 1)
          this.myTimeStr = `${this.timer.getMinutes()<10? '0' + this.timer.getMinutes():this.timer.getMinutes()}:${this.timer.getSeconds()<10? '0' + this.timer.getSeconds():this.timer.getSeconds()}`
          document.querySelector('.timer').innerHTML = `Времени прошло: ${this.myTimeStr}`
        }, 1000)
        this.started = true
      }
      let current = event.target.closest('.puzzle__cell')
      if(!current) return false
      //console.log(current.puzzleIndex, ' ',  this.hole.puzzleIndex, ' ', this.size)
      if(!(current.puzzleIndex - 1 === this.hole.puzzleIndex ||
        current.puzzleIndex + 1 === this.hole.puzzleIndex ||
        current.puzzleIndex - this.size === this.hole.puzzleIndex ||
        current.puzzleIndex + this.size === this.hole.puzzleIndex
        ) 
        ) return false
        let rowCell = Math.floor(current.puzzleIndex / this.size) + 1
        let rowHole = Math.floor(this.hole.puzzleIndex / this.size) + 1
      if(current.puzzleIndex - 1 === this.hole.puzzleIndex && rowCell - 1 === rowHole ||
        current.puzzleIndex + 1 === this.hole.puzzleIndex && rowCell + 1 === rowHole
        ) return false
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
            that.congratulation()
          }        
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
  shake(arr){
    return arr.sort(function() { return Math.random()-.5; }).concat(-1)
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
  congratulation(){
    this.saveWinner()
    alert(`Ура! Вы решили головоломку за ${this.timer.getMinutes()<10? '0' + this.timer.getMinutes():this.timer.getMinutes()}:${this.timer.getSeconds()<10? '0' + this.timer.getSeconds():this.timer.getSeconds()} и ${this.counter} ходов`)

  }
  delete(){
    this.container.remove()
  }
  saveWinner(){
    let res = {}
    res.count = this.counter;
    res.time = this.myTimeStr || '00:00';
    res.size = `${this.size}x${this.size}`
    
    let records = localStorage.getItem('bestResults')?
    JSON.parse(localStorage.getItem('bestResults')):
    new Array(10).fill(0);
    records.unshift(res)
    records.sort((a,b)=>{
      if(a === b){return 0}
      if(!a){return 1}
      if(!b){return -1}
      if(a.count > b.count){
        return 1
      }
      if(a.count < b.count) {
        return -1
      }
      return 0
    })
    records.pop()
    localStorage.setItem('bestResults', JSON.stringify(records))
    document.querySelector('.table-of-best').remove()
    Object(_gem_puzzle__WEBPACK_IMPORTED_MODULE_0__["tableRend"])()
  }
  buildFild(){
      this.container = document.createElement('div')
      this.container.classList.add('puzzle')
      document.querySelector('.wrapper').append(this.container)
      let containerWidth = 300
      this.container.style.width = containerWidth + 'px'
      this.container.style.height = containerWidth + 'px'
      this.shakeCells.forEach((item, index)=>{
      const cell = document.createElement('div')
      cell.puzzleIndex = index
      cell.classList.add('puzzle__cell')
      cell.innerHTML = '<p>' + item + '</p>'
      cell.trueOrder = +item
      cell.style.fontSize = 52 - this.size*4 + 'px'
      
      cell.style.width = containerWidth / this.size + 'px'
      cell.style.height = containerWidth / this.size + 'px'
      this.cellsNode.push(cell)
      this.container.append(cell)
      if(item === - 1) {
      this.hole = cell
      cell.classList.add('puzzle__cell_empty')
      cell.innerHTML = ''
      }
    })
  }
  getCurrentState(){
    return this.cellsNode.map(item=>item.trueOrder)
  }
}


/***/ }),

/***/ "./src/gem-puzzle.js":
/*!***************************!*\
  !*** ./src/gem-puzzle.js ***!
  \***************************/
/*! exports provided: tableRend */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tableRend", function() { return tableRend; });
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
generateField.classList.add('button-def')
document.body.append(generateField)

let saveButton = document.createElement('button')
saveButton.innerHTML = 'Сохранить'
saveButton.classList.add('button-def')
document.body.append(saveButton)
saveButton.addEventListener('click',()=>{
  let save = {
   counter: mygame.counter,
   timeSec: mygame.timer.getMinutes(),
   timeMin: mygame.timer.getSeconds(),
   shakeCells: mygame.getCurrentState(),
   size: mygame.size
  }
  localStorage.setItem('save', JSON.stringify(save))
})

let contButton = document.createElement('button')
contButton.innerHTML = 'Продолжить'
contButton.classList.add('button-def')
document.body.append(contButton)
contButton.addEventListener('click',()=>{
  let save = localStorage.getItem('save')?
  JSON.parse(localStorage.getItem('save')):
  0;
  if(!save){
    alert('У вас нет сохраненных игр')
  }
  else {
    timer.innerHTML = 'Количество ходов: '+save.counter
    counter.innerHTML = 'Времени прошло: '+`${save.timeMin<10? '0' + save.timeMin:save.timeMin}:${save.timeSec<10? '0' + save.timeSec:save.timeSec}`
    mygame.delete()
    mygame.removeInterval()
    mygame = new _GemPuzzle__WEBPACK_IMPORTED_MODULE_0__["GemPuzzle"](save.size, save)
  }
})

let counter = document.createElement('div')
counter.classList.add('counter')
counter.innerHTML = 'Вперёд!'
document.body.append(counter)

let timer = document.createElement('div')
timer.classList.add('timer')
timer.innerHTML = 'Начните игру'
document.body.append(timer)

let wrapper = document.createElement('div')
wrapper.classList.add('wrapper')
document.body.append(wrapper)

let bestResults = document.createElement('div')
bestResults.classList.add('best-results')
bestResults.innerHTML = 'Лучшие результаты:'
document.body.append(bestResults)

tableRend()
function tableRend(){
  let bestResultsArr = localStorage.getItem('bestResults')?
  JSON.parse(localStorage.getItem('bestResults')):
  new Array(10).fill(0);
  let tableOfBest = document.createElement('table')
  tableOfBest.classList.add('table-of-best')
  bestResults.after(tableOfBest)
  const tHead = document.createElement('tr')
  tHead.innerHTML = '<th>Место</th><th>Ходов</th><th>Время</th><th>Поле</th>'
  tableOfBest.append(tHead)
  bestResultsArr.forEach((el,i)=>{
  const tr = document.createElement('tr')
  const tdNum = document.createElement('td')
  tdNum.innerHTML = i + 1
  const tdTime = document.createElement('td')
  const tdCount = document.createElement('td')
  const tdSize = document.createElement('td')
  tableOfBest.append(tr)
  tr.append(tdNum, tdTime, tdCount, tdSize)
  if(el){
    tdTime.innerHTML = el.count
    tdCount.innerHTML = el.time
    tdSize.innerHTML = el.size
  }
  else {
    tdTime.innerHTML = '-'
    tdCount.innerHTML = '-'
  }
})
}

let mygame = new _GemPuzzle__WEBPACK_IMPORTED_MODULE_0__["GemPuzzle"](setSize.value)



setSize.addEventListener('change',()=>{
  if(setSize.value >8 || setSize.value < 3) return
  timer.innerHTML = 'Начните игру'
  counter.innerHTML = 'Вперёд!'
  mygame.delete()
  mygame.removeInterval()
  mygame = new _GemPuzzle__WEBPACK_IMPORTED_MODULE_0__["GemPuzzle"](setSize.value)
})

generateField.addEventListener('click',()=>{
  timer.innerHTML = 'Начните игру'
  counter.innerHTML = 'Вперёд!'
  mygame.delete()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dlbVB1enpsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2VtLXB1enpsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9tYWluLnNjc3M/MmZmNCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUF1QztBQUNoQztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsa0ZBQWtGLEdBQUcsa0ZBQWtGO0FBQ3JNLDBFQUEwRSxlQUFlO0FBQ3pGLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4RUFBOEUsYUFBYTtBQUMzRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELHFEQUFxRCxFQUFFO0FBQzFHO0FBQ0E7QUFDQSxnQ0FBZ0MseUJBQXlCLEVBQUU7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELFNBQVM7QUFDN0QsdUJBQXVCLFFBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxrRkFBa0YsR0FBRyxrRkFBa0YsS0FBSyxhQUFhOztBQUVwTztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFVBQVUsR0FBRyxVQUFVOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLGFBQWE7QUFDYixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsSUFBSSw2REFBUztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzNLQTtBQUFBO0FBQUE7QUFBcUM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxpREFBaUQsR0FBRyxpREFBaUQ7QUFDbko7QUFDQTtBQUNBLGlCQUFpQixvREFBUztBQUMxQjtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUEsaUJBQWlCLG9EQUFTOzs7O0FBSTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsb0RBQVM7QUFDeEIsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxvREFBUztBQUN4QixDQUFDOzs7QUFHRDtBQUNBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQSxTQUFTLG9DQUFvQztBQUM3Qyw4RUFBOEUseUJBQXlCLEVBQUU7QUFDekc7QUFDQSwyQkFBMkIsNENBQTRDLGlDQUFpQyxFQUFFLEVBQUUsRUFBRTtBQUM5RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixFQUFFO0FBQ2xCLDBCQUEwQix3QkFBd0IsaUNBQWlDLG9CQUFvQixFQUFFO0FBQ3pHO0FBQ0Esb0RBQW9ELFNBQVM7QUFDN0QsdUJBQXVCLFFBQVE7QUFDL0IsNEJBQTRCLEVBQUU7O0FBRTlCOztBQUVBOztBQUVBLGVBQWUsUUFBUTtBQUN2QjtBQUNBLCtCQUErQiw4Q0FBOEM7QUFDN0UsV0FBVztBQUNYO0FBQ0EsOERBQThELEVBQUUsR0FBRztBQUNuRTtBQUNBO0FBQ0EsdUJBQXVCLGtDQUFrQztBQUN6RCx3Q0FBd0MsZ0VBQWdFLEU7QUFDeEcsSUFBSSxFOzs7Ozs7Ozs7Ozs7QUMxS0o7QUFBQTtBQUFBO0FBQUE7QUFBNEI7Ozs7Ozs7Ozs7OztBQ0E1Qix1QyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCB7dGFibGVSZW5kfSBmcm9tICAnLi9nZW0tcHV6emxlJ1xyXG5leHBvcnQgY2xhc3MgR2VtUHV6emxlIHtcclxuICBjb25zdHJ1Y3RvcihzaXplLCBzYXZlR2FtZSl7XHJcbiAgICAvL2NvbnNvbGUubG9nKHNhdmVHYW1lKVxyXG4gICAgdGhpcy5jb3VudGVyID0gc2F2ZUdhbWU/IHNhdmVHYW1lLmNvdW50ZXIgOiAwXHJcbiAgICBsZXQgc2F2ZVRpbWVTZWMgPSBzYXZlR2FtZT8gc2F2ZUdhbWUudGltZVNlYyA6IDBcclxuICAgIGxldCBzYXZlVGltZU1pbiA9IHNhdmVHYW1lPyBzYXZlR2FtZS50aW1lTWluIDogMFxyXG4gICAgdGhpcy50aW1lciA9IG5ldyBEYXRlKDApXHJcbiAgICB0aGlzLnRpbWVyLnNldFNlY29uZHMoc2F2ZVRpbWVTZWMpXHJcbiAgICB0aGlzLnRpbWVyLnNldE1pbnV0ZXMoc2F2ZVRpbWVNaW4pXHJcbiAgICBcclxuICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlXHJcbiAgICB0aGlzLnNpemUgPSArc2l6ZSB8fCA0XHJcbiAgICBsZXQgY2VsbHMgPSBuZXcgQXJyYXkodGhpcy5zaXplKnRoaXMuc2l6ZSAtIDEpLmZpbGwoMCkubWFwKChfLGluZGV4KT0+aW5kZXggKyAxKVxyXG4gICAgdGhpcy5zaGFrZUNlbGxzID0gc2F2ZUdhbWU/IHNhdmVHYW1lLnNoYWtlQ2VsbHMgOiB0aGlzLnNoYWtlKGNlbGxzKVxyXG4gICAgLy9jb25zb2xlLmxvZyh0aGlzLnNoYWtlQ2VsbHMpXHJcbiAgICB0aGlzLmNoZWNrU29sdmFibGUodGhpcy5zaGFrZUNlbGxzKVxyXG4gICAgdGhpcy5jZWxsc05vZGUgPSBbXVxyXG4gICAgdGhpcy5idWlsZEZpbGQoKVxyXG4gICAgdGhpcy5pbmRleE9mSG9sZSA9IHRoaXMuc2l6ZSAqIHRoaXMuc2l6ZSAtIDFcclxuICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoZXZlbnQpPT57XHJcbiAgICAgIGlmKCF0aGlzLnN0YXJ0ZWQpe1xyXG4gICAgICAgIHRoaXMuc2V0SW50ID0gc2V0SW50ZXJ2YWwoKCk9PntcclxuICAgICAgICAgIHRoaXMudGltZXIuc2V0U2Vjb25kcyh0aGlzLnRpbWVyLmdldFNlY29uZHMoKSArIDEpXHJcbiAgICAgICAgICB0aGlzLm15VGltZVN0ciA9IGAke3RoaXMudGltZXIuZ2V0TWludXRlcygpPDEwPyAnMCcgKyB0aGlzLnRpbWVyLmdldE1pbnV0ZXMoKTp0aGlzLnRpbWVyLmdldE1pbnV0ZXMoKX06JHt0aGlzLnRpbWVyLmdldFNlY29uZHMoKTwxMD8gJzAnICsgdGhpcy50aW1lci5nZXRTZWNvbmRzKCk6dGhpcy50aW1lci5nZXRTZWNvbmRzKCl9YFxyXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbWVyJykuaW5uZXJIVE1MID0gYNCS0YDQtdC80LXQvdC4INC/0YDQvtGI0LvQvjogJHt0aGlzLm15VGltZVN0cn1gXHJcbiAgICAgICAgfSwgMTAwMClcclxuICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlXHJcbiAgICAgIH1cclxuICAgICAgbGV0IGN1cnJlbnQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnB1enpsZV9fY2VsbCcpXHJcbiAgICAgIGlmKCFjdXJyZW50KSByZXR1cm4gZmFsc2VcclxuICAgICAgLy9jb25zb2xlLmxvZyhjdXJyZW50LnB1enpsZUluZGV4LCAnICcsICB0aGlzLmhvbGUucHV6emxlSW5kZXgsICcgJywgdGhpcy5zaXplKVxyXG4gICAgICBpZighKGN1cnJlbnQucHV6emxlSW5kZXggLSAxID09PSB0aGlzLmhvbGUucHV6emxlSW5kZXggfHxcclxuICAgICAgICBjdXJyZW50LnB1enpsZUluZGV4ICsgMSA9PT0gdGhpcy5ob2xlLnB1enpsZUluZGV4IHx8XHJcbiAgICAgICAgY3VycmVudC5wdXp6bGVJbmRleCAtIHRoaXMuc2l6ZSA9PT0gdGhpcy5ob2xlLnB1enpsZUluZGV4IHx8XHJcbiAgICAgICAgY3VycmVudC5wdXp6bGVJbmRleCArIHRoaXMuc2l6ZSA9PT0gdGhpcy5ob2xlLnB1enpsZUluZGV4XHJcbiAgICAgICAgKSBcclxuICAgICAgICApIHJldHVybiBmYWxzZVxyXG4gICAgICAgIGxldCByb3dDZWxsID0gTWF0aC5mbG9vcihjdXJyZW50LnB1enpsZUluZGV4IC8gdGhpcy5zaXplKSArIDFcclxuICAgICAgICBsZXQgcm93SG9sZSA9IE1hdGguZmxvb3IodGhpcy5ob2xlLnB1enpsZUluZGV4IC8gdGhpcy5zaXplKSArIDFcclxuICAgICAgaWYoY3VycmVudC5wdXp6bGVJbmRleCAtIDEgPT09IHRoaXMuaG9sZS5wdXp6bGVJbmRleCAmJiByb3dDZWxsIC0gMSA9PT0gcm93SG9sZSB8fFxyXG4gICAgICAgIGN1cnJlbnQucHV6emxlSW5kZXggKyAxID09PSB0aGlzLmhvbGUucHV6emxlSW5kZXggJiYgcm93Q2VsbCArIDEgPT09IHJvd0hvbGVcclxuICAgICAgICApIHJldHVybiBmYWxzZVxyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uKGN1cnJlbnQpXHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzXHJcbiAgICAgICAgY3VycmVudC5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBzdG9wQW5pbWF0aW9uKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIHN0b3BBbmltYXRpb24oKXtcclxuICAgICAgICAgIGN1cnJlbnQuY2xhc3NMaXN0LnJlbW92ZSgndG9MZWZ0JywgJ3RvUmlnaHQnLCAndG9VcCcsICd0b0Rvd24nKVxyXG4gICAgICAgICAgdGhhdC5zd2FwKGN1cnJlbnQpXHJcbiAgICAgICAgICB0aGF0LmNvbnRhaW5lci5hcHBlbmQoLi4udGhhdC5jZWxsc05vZGUpXHJcbiAgICAgICAgICBjdXJyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIHN0b3BBbmltYXRpb24pXHJcbiAgICAgICAgICB0aGF0LmNvdW50ZXIgKz0gMVxyXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvdW50ZXInKS5pbm5lckhUTUwgPSBg0JrQvtC70LjRh9C10YHRgtCy0L4g0YXQvtC00L7QsjogJHt0aGF0LmNvdW50ZXJ9YFxyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGF0LmlzQ29tcGxldGVkKVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBpZih0aGF0LmlzQ29tcGxldGVkKCkpe1xyXG4gICAgICAgICAgICB0aGF0LnJlbW92ZUludGVydmFsKClcclxuICAgICAgICAgICAgdGhhdC5jb25ncmF0dWxhdGlvbigpXHJcbiAgICAgICAgICB9ICAgICAgICBcclxufVxyXG4gICAgfSlcclxuICB9XHJcbiAgcmVtb3ZlSW50ZXJ2YWwoKXtcclxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zZXRJbnQpXHJcbiAgfVxyXG4gIGFuaW1hdGlvbihjdXJyZW50KXtcclxuICAgIGxldCBkZWYgPSB0aGlzLmhvbGUucHV6emxlSW5kZXggLSBjdXJyZW50LnB1enpsZUluZGV4XHJcbiAgICBsZXQgYWRkQ2xhc3NcclxuICAgIHN3aXRjaCAoZGVmKSB7XHJcbiAgICAgIGNhc2UgMSA6IGFkZENsYXNzID0gJ3RvUmlnaHQnXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIC0xIDogYWRkQ2xhc3MgPSAndG9MZWZ0J1xyXG4gICAgICBicmVhaztcclxuICAgICAgY2FzZSB0aGlzLnNpemUgOiBhZGRDbGFzcyA9ICd0b0Rvd24nXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIC10aGlzLnNpemUgOiBhZGRDbGFzcyA9ICd0b1VwJ1xyXG4gICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDo7XHJcbiAgICB9XHJcbiAgICBjdXJyZW50LmNsYXNzTGlzdC5hZGQoYWRkQ2xhc3MpXHJcbiAgfVxyXG4gIGlzQ29tcGxldGVkKCl7XHJcbiAgICByZXR1cm4gIXRoaXMuY2VsbHNOb2RlLnNvbWUoZnVuY3Rpb24oaXRlbSwgaSkgeyByZXR1cm4gaXRlbS50cnVlT3JkZXIgPiAwICYmIGl0ZW0udHJ1ZU9yZGVyLTEgIT09IGk7IH0pO1xyXG4gIH1cclxuICBzaGFrZShhcnIpe1xyXG4gICAgcmV0dXJuIGFyci5zb3J0KGZ1bmN0aW9uKCkgeyByZXR1cm4gTWF0aC5yYW5kb20oKS0uNTsgfSkuY29uY2F0KC0xKVxyXG4gIH1cclxuICBzd2FwKGN1cnJlbnQpe1xyXG4gICAgdGhpcy5jZWxsc05vZGVbdGhpcy5ob2xlLnB1enpsZUluZGV4XSA9IGN1cnJlbnRcclxuICAgIHRoaXMuY2VsbHNOb2RlW2N1cnJlbnQucHV6emxlSW5kZXhdID0gdGhpcy5ob2xlXHJcbiAgICBsZXQgdGVtcCA9IHRoaXMuaG9sZS5wdXp6bGVJbmRleFxyXG4gICAgdGhpcy5ob2xlLnB1enpsZUluZGV4ID0gY3VycmVudC5wdXp6bGVJbmRleFxyXG4gICAgY3VycmVudC5wdXp6bGVJbmRleCA9IHRlbXBcclxuICB9XHJcbiAgc29sdmFibGUoYSkge1xyXG4gICAgZm9yICh2YXIga0Rpc29yZGVyID0gMCwgaSA9IDEsIGxlbiA9IGEubGVuZ3RoLTE7IGkgPCBsZW47IGkrKylcclxuICAgICAgZm9yICh2YXIgaiA9IGktMTsgaiA+PSAwOyBqLS0pIGlmIChhW2pdID4gYVtpXSkga0Rpc29yZGVyKys7XHJcbiAgICByZXR1cm4gIShrRGlzb3JkZXIgJSAyKTtcclxuICB9XHJcbiAgY2hlY2tTb2x2YWJsZShhKSB7XHJcbiAgICBpZiAoIXRoaXMuc29sdmFibGUoYSkpIHtcclxuICAgICAgbGV0IHRlbXAgPSBhWzBdXHJcbiAgICAgIGFbMF0gPSBhWzFdXHJcbiAgICAgIGFbMV0gPSB0ZW1wXHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbmdyYXR1bGF0aW9uKCl7XHJcbiAgICB0aGlzLnNhdmVXaW5uZXIoKVxyXG4gICAgYWxlcnQoYNCj0YDQsCEg0JLRiyDRgNC10YjQuNC70Lgg0LPQvtC70L7QstC+0LvQvtC80LrRgyDQt9CwICR7dGhpcy50aW1lci5nZXRNaW51dGVzKCk8MTA/ICcwJyArIHRoaXMudGltZXIuZ2V0TWludXRlcygpOnRoaXMudGltZXIuZ2V0TWludXRlcygpfToke3RoaXMudGltZXIuZ2V0U2Vjb25kcygpPDEwPyAnMCcgKyB0aGlzLnRpbWVyLmdldFNlY29uZHMoKTp0aGlzLnRpbWVyLmdldFNlY29uZHMoKX0g0LggJHt0aGlzLmNvdW50ZXJ9INGF0L7QtNC+0LJgKVxyXG5cclxuICB9XHJcbiAgZGVsZXRlKCl7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmUoKVxyXG4gIH1cclxuICBzYXZlV2lubmVyKCl7XHJcbiAgICBsZXQgcmVzID0ge31cclxuICAgIHJlcy5jb3VudCA9IHRoaXMuY291bnRlcjtcclxuICAgIHJlcy50aW1lID0gdGhpcy5teVRpbWVTdHIgfHwgJzAwOjAwJztcclxuICAgIHJlcy5zaXplID0gYCR7dGhpcy5zaXplfXgke3RoaXMuc2l6ZX1gXHJcbiAgICBcclxuICAgIGxldCByZWNvcmRzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Jlc3RSZXN1bHRzJyk/XHJcbiAgICBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiZXN0UmVzdWx0cycpKTpcclxuICAgIG5ldyBBcnJheSgxMCkuZmlsbCgwKTtcclxuICAgIHJlY29yZHMudW5zaGlmdChyZXMpXHJcbiAgICByZWNvcmRzLnNvcnQoKGEsYik9PntcclxuICAgICAgaWYoYSA9PT0gYil7cmV0dXJuIDB9XHJcbiAgICAgIGlmKCFhKXtyZXR1cm4gMX1cclxuICAgICAgaWYoIWIpe3JldHVybiAtMX1cclxuICAgICAgaWYoYS5jb3VudCA+IGIuY291bnQpe1xyXG4gICAgICAgIHJldHVybiAxXHJcbiAgICAgIH1cclxuICAgICAgaWYoYS5jb3VudCA8IGIuY291bnQpIHtcclxuICAgICAgICByZXR1cm4gLTFcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gMFxyXG4gICAgfSlcclxuICAgIHJlY29yZHMucG9wKClcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdiZXN0UmVzdWx0cycsIEpTT04uc3RyaW5naWZ5KHJlY29yZHMpKVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYmxlLW9mLWJlc3QnKS5yZW1vdmUoKVxyXG4gICAgdGFibGVSZW5kKClcclxuICB9XHJcbiAgYnVpbGRGaWxkKCl7XHJcbiAgICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgncHV6emxlJylcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXInKS5hcHBlbmQodGhpcy5jb250YWluZXIpXHJcbiAgICAgIGxldCBjb250YWluZXJXaWR0aCA9IDMwMFxyXG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS53aWR0aCA9IGNvbnRhaW5lcldpZHRoICsgJ3B4J1xyXG4gICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBjb250YWluZXJXaWR0aCArICdweCdcclxuICAgICAgdGhpcy5zaGFrZUNlbGxzLmZvckVhY2goKGl0ZW0sIGluZGV4KT0+e1xyXG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgY2VsbC5wdXp6bGVJbmRleCA9IGluZGV4XHJcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgncHV6emxlX19jZWxsJylcclxuICAgICAgY2VsbC5pbm5lckhUTUwgPSAnPHA+JyArIGl0ZW0gKyAnPC9wPidcclxuICAgICAgY2VsbC50cnVlT3JkZXIgPSAraXRlbVxyXG4gICAgICBjZWxsLnN0eWxlLmZvbnRTaXplID0gNTIgLSB0aGlzLnNpemUqNCArICdweCdcclxuICAgICAgXHJcbiAgICAgIGNlbGwuc3R5bGUud2lkdGggPSBjb250YWluZXJXaWR0aCAvIHRoaXMuc2l6ZSArICdweCdcclxuICAgICAgY2VsbC5zdHlsZS5oZWlnaHQgPSBjb250YWluZXJXaWR0aCAvIHRoaXMuc2l6ZSArICdweCdcclxuICAgICAgdGhpcy5jZWxsc05vZGUucHVzaChjZWxsKVxyXG4gICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmQoY2VsbClcclxuICAgICAgaWYoaXRlbSA9PT0gLSAxKSB7XHJcbiAgICAgIHRoaXMuaG9sZSA9IGNlbGxcclxuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdwdXp6bGVfX2NlbGxfZW1wdHknKVxyXG4gICAgICBjZWxsLmlubmVySFRNTCA9ICcnXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIGdldEN1cnJlbnRTdGF0ZSgpe1xyXG4gICAgcmV0dXJuIHRoaXMuY2VsbHNOb2RlLm1hcChpdGVtPT5pdGVtLnRydWVPcmRlcilcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtHZW1QdXp6bGV9IGZyb20gJy4vR2VtUHV6emxlJ1xyXG5cclxubGV0IGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKVxyXG5oMS5pbm5lckhUTUwgPSAnUlNTINCY0LPRgNCwINCyINC/0Y/RgtC90LDRiNC60LgnXHJcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGgxKVxyXG5sZXQgZmllbGRTaXplID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKVxyXG5kb2N1bWVudC5ib2R5LmFwcGVuZChmaWVsZFNpemUpXHJcbmZpZWxkU2l6ZS5pbm5lckhUTUwgPSAn0KDQsNC30LzQtdGAINC40LPRgNC+0LLQvtCz0L4g0L/QvtC70Y8gKG1pbiAz0YUzLCBtYXggONGFOCk6J1xyXG5sZXQgc2V0U2l6ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jylcclxuc2V0U2l6ZS50eXBlID0gJ251bWJlcidcclxuc2V0U2l6ZS5taW4gPSAzXHJcbnNldFNpemUubWF4ID0gOFxyXG5zZXRTaXplLnZhbHVlID0gNFxyXG5maWVsZFNpemUuYWZ0ZXIoc2V0U2l6ZSlcclxubGV0IGdlbmVyYXRlRmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxyXG5nZW5lcmF0ZUZpZWxkLmlubmVySFRNTCA9ICfQndC+0LLQsNGPINC40LPRgNCwJ1xyXG5nZW5lcmF0ZUZpZWxkLmNsYXNzTGlzdC5hZGQoJ2J1dHRvbi1kZWYnKVxyXG5kb2N1bWVudC5ib2R5LmFwcGVuZChnZW5lcmF0ZUZpZWxkKVxyXG5cclxubGV0IHNhdmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxyXG5zYXZlQnV0dG9uLmlubmVySFRNTCA9ICfQodC+0YXRgNCw0L3QuNGC0YwnXHJcbnNhdmVCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnV0dG9uLWRlZicpXHJcbmRvY3VtZW50LmJvZHkuYXBwZW5kKHNhdmVCdXR0b24pXHJcbnNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XHJcbiAgbGV0IHNhdmUgPSB7XHJcbiAgIGNvdW50ZXI6IG15Z2FtZS5jb3VudGVyLFxyXG4gICB0aW1lU2VjOiBteWdhbWUudGltZXIuZ2V0TWludXRlcygpLFxyXG4gICB0aW1lTWluOiBteWdhbWUudGltZXIuZ2V0U2Vjb25kcygpLFxyXG4gICBzaGFrZUNlbGxzOiBteWdhbWUuZ2V0Q3VycmVudFN0YXRlKCksXHJcbiAgIHNpemU6IG15Z2FtZS5zaXplXHJcbiAgfVxyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzYXZlJywgSlNPTi5zdHJpbmdpZnkoc2F2ZSkpXHJcbn0pXHJcblxyXG5sZXQgY29udEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcbmNvbnRCdXR0b24uaW5uZXJIVE1MID0gJ9Cf0YDQvtC00L7Qu9C20LjRgtGMJ1xyXG5jb250QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J1dHRvbi1kZWYnKVxyXG5kb2N1bWVudC5ib2R5LmFwcGVuZChjb250QnV0dG9uKVxyXG5jb250QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xyXG4gIGxldCBzYXZlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NhdmUnKT9cclxuICBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzYXZlJykpOlxyXG4gIDA7XHJcbiAgaWYoIXNhdmUpe1xyXG4gICAgYWxlcnQoJ9CjINCy0LDRgSDQvdC10YIg0YHQvtGF0YDQsNC90LXQvdC90YvRhSDQuNCz0YAnKVxyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIHRpbWVyLmlubmVySFRNTCA9ICfQmtC+0LvQuNGH0LXRgdGC0LLQviDRhdC+0LTQvtCyOiAnK3NhdmUuY291bnRlclxyXG4gICAgY291bnRlci5pbm5lckhUTUwgPSAn0JLRgNC10LzQtdC90Lgg0L/RgNC+0YjQu9C+OiAnK2Ake3NhdmUudGltZU1pbjwxMD8gJzAnICsgc2F2ZS50aW1lTWluOnNhdmUudGltZU1pbn06JHtzYXZlLnRpbWVTZWM8MTA/ICcwJyArIHNhdmUudGltZVNlYzpzYXZlLnRpbWVTZWN9YFxyXG4gICAgbXlnYW1lLmRlbGV0ZSgpXHJcbiAgICBteWdhbWUucmVtb3ZlSW50ZXJ2YWwoKVxyXG4gICAgbXlnYW1lID0gbmV3IEdlbVB1enpsZShzYXZlLnNpemUsIHNhdmUpXHJcbiAgfVxyXG59KVxyXG5cclxubGV0IGNvdW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG5jb3VudGVyLmNsYXNzTGlzdC5hZGQoJ2NvdW50ZXInKVxyXG5jb3VudGVyLmlubmVySFRNTCA9ICfQktC/0LXRgNGR0LQhJ1xyXG5kb2N1bWVudC5ib2R5LmFwcGVuZChjb3VudGVyKVxyXG5cclxubGV0IHRpbWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxudGltZXIuY2xhc3NMaXN0LmFkZCgndGltZXInKVxyXG50aW1lci5pbm5lckhUTUwgPSAn0J3QsNGH0L3QuNGC0LUg0LjQs9GA0YMnXHJcbmRvY3VtZW50LmJvZHkuYXBwZW5kKHRpbWVyKVxyXG5cclxubGV0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG53cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3dyYXBwZXInKVxyXG5kb2N1bWVudC5ib2R5LmFwcGVuZCh3cmFwcGVyKVxyXG5cclxubGV0IGJlc3RSZXN1bHRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuYmVzdFJlc3VsdHMuY2xhc3NMaXN0LmFkZCgnYmVzdC1yZXN1bHRzJylcclxuYmVzdFJlc3VsdHMuaW5uZXJIVE1MID0gJ9Cb0YPRh9GI0LjQtSDRgNC10LfRg9C70YzRgtCw0YLRizonXHJcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGJlc3RSZXN1bHRzKVxyXG5cclxudGFibGVSZW5kKClcclxuZXhwb3J0IGZ1bmN0aW9uIHRhYmxlUmVuZCgpe1xyXG4gIGxldCBiZXN0UmVzdWx0c0FyciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiZXN0UmVzdWx0cycpP1xyXG4gIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Jlc3RSZXN1bHRzJykpOlxyXG4gIG5ldyBBcnJheSgxMCkuZmlsbCgwKTtcclxuICBsZXQgdGFibGVPZkJlc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpXHJcbiAgdGFibGVPZkJlc3QuY2xhc3NMaXN0LmFkZCgndGFibGUtb2YtYmVzdCcpXHJcbiAgYmVzdFJlc3VsdHMuYWZ0ZXIodGFibGVPZkJlc3QpXHJcbiAgY29uc3QgdEhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpXHJcbiAgdEhlYWQuaW5uZXJIVE1MID0gJzx0aD7QnNC10YHRgtC+PC90aD48dGg+0KXQvtC00L7QsjwvdGg+PHRoPtCS0YDQtdC80Y88L3RoPjx0aD7Qn9C+0LvQtTwvdGg+J1xyXG4gIHRhYmxlT2ZCZXN0LmFwcGVuZCh0SGVhZClcclxuICBiZXN0UmVzdWx0c0Fyci5mb3JFYWNoKChlbCxpKT0+e1xyXG4gIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKVxyXG4gIGNvbnN0IHRkTnVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKVxyXG4gIHRkTnVtLmlubmVySFRNTCA9IGkgKyAxXHJcbiAgY29uc3QgdGRUaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKVxyXG4gIGNvbnN0IHRkQ291bnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpXHJcbiAgY29uc3QgdGRTaXplID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKVxyXG4gIHRhYmxlT2ZCZXN0LmFwcGVuZCh0cilcclxuICB0ci5hcHBlbmQodGROdW0sIHRkVGltZSwgdGRDb3VudCwgdGRTaXplKVxyXG4gIGlmKGVsKXtcclxuICAgIHRkVGltZS5pbm5lckhUTUwgPSBlbC5jb3VudFxyXG4gICAgdGRDb3VudC5pbm5lckhUTUwgPSBlbC50aW1lXHJcbiAgICB0ZFNpemUuaW5uZXJIVE1MID0gZWwuc2l6ZVxyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIHRkVGltZS5pbm5lckhUTUwgPSAnLSdcclxuICAgIHRkQ291bnQuaW5uZXJIVE1MID0gJy0nXHJcbiAgfVxyXG59KVxyXG59XHJcblxyXG5sZXQgbXlnYW1lID0gbmV3IEdlbVB1enpsZShzZXRTaXplLnZhbHVlKVxyXG5cclxuXHJcblxyXG5zZXRTaXplLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsKCk9PntcclxuICBpZihzZXRTaXplLnZhbHVlID44IHx8IHNldFNpemUudmFsdWUgPCAzKSByZXR1cm5cclxuICB0aW1lci5pbm5lckhUTUwgPSAn0J3QsNGH0L3QuNGC0LUg0LjQs9GA0YMnXHJcbiAgY291bnRlci5pbm5lckhUTUwgPSAn0JLQv9C10YDRkdC0ISdcclxuICBteWdhbWUuZGVsZXRlKClcclxuICBteWdhbWUucmVtb3ZlSW50ZXJ2YWwoKVxyXG4gIG15Z2FtZSA9IG5ldyBHZW1QdXp6bGUoc2V0U2l6ZS52YWx1ZSlcclxufSlcclxuXHJcbmdlbmVyYXRlRmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XHJcbiAgdGltZXIuaW5uZXJIVE1MID0gJ9Cd0LDRh9C90LjRgtC1INC40LPRgNGDJ1xyXG4gIGNvdW50ZXIuaW5uZXJIVE1MID0gJ9CS0L/QtdGA0ZHQtCEnXHJcbiAgbXlnYW1lLmRlbGV0ZSgpXHJcbiAgbXlnYW1lLnJlbW92ZUludGVydmFsKClcclxuICBteWdhbWUgPSBuZXcgR2VtUHV6emxlKHNldFNpemUudmFsdWUpXHJcbn0pXHJcblxyXG5cclxuLy8yMCA4XHJcbi8vNDAgM1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLypcclxudmFyIGZpZnRlZW4gPSB7XHJcbiAgTW92ZToge3VwOiAtNCwgbGVmdDogLTEsIGRvd246IDQsIHJpZ2h0OiAxfSxcclxuICBvcmRlcjogWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTVdLnNvcnQoZnVuY3Rpb24oKSB7IHJldHVybiBNYXRoLnJhbmRvbSgpLS41OyB9KS5jb25jYXQoMCksXHJcbiAgaG9sZTogMTUsXHJcbiAgaXNDb21wbGV0ZWQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gIXRoaXMub3JkZXIuc29tZShmdW5jdGlvbihpdGVtLCBpKSB7IHJldHVybiBpdGVtID4gMCAmJiBpdGVtLTEgIT09IGk7IH0pOyB9LFxyXG4gIGdvOiBmdW5jdGlvbihtb3ZlKSB7XHJcbiAgICB2YXIgaW5kZXggPSB0aGlzLmhvbGUgKyBtb3ZlO1xyXG4gICAgaWYgKCF0aGlzLm9yZGVyW2luZGV4XSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKG1vdmUgPT0gZmlmdGVlbi5Nb3ZlLmxlZnQgfHwgbW92ZSA9PSBmaWZ0ZWVuLk1vdmUucmlnaHQpXHJcbiAgICAgIGlmIChNYXRoLmZsb29yKHRoaXMuaG9sZS80KSAhPT0gTWF0aC5mbG9vcihpbmRleC80KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgdGhpcy5zd2FwKGluZGV4LCB0aGlzLmhvbGUpO1xyXG4gICAgdGhpcy5ob2xlID0gaW5kZXg7XHJcbiAgICByZXR1cm4gdHJ1ZTsgfSxcclxuICBzd2FwOiBmdW5jdGlvbihpMSwgaTIpIHsgdmFyIHQgPSB0aGlzLm9yZGVyW2kxXTsgdGhpcy5vcmRlcltpMV0gPSB0aGlzLm9yZGVyW2kyXTsgdGhpcy5vcmRlcltpMl0gPSB0OyB9LFxyXG4gIHNvbHZhYmxlOiBmdW5jdGlvbihhKSB7XHJcbiAgICBmb3IgKHZhciBrRGlzb3JkZXIgPSAwLCBpID0gMSwgbGVuID0gYS5sZW5ndGgtMTsgaSA8IGxlbjsgaSsrKVxyXG4gICAgICBmb3IgKHZhciBqID0gaS0xOyBqID49IDA7IGotLSkgaWYgKGFbal0gPiBhW2ldKSBrRGlzb3JkZXIrKztcclxuICAgIHJldHVybiAhKGtEaXNvcmRlciAlIDIpOyB9IH07XHJcblxyXG5pZiAoIWZpZnRlZW4uc29sdmFibGUoZmlmdGVlbi5vcmRlcikpIGZpZnRlZW4uc3dhcCgwLCAxKTtcclxuXHJcbnZhciBib3ggPSBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcclxuXHJcbmZvciAodmFyIGkgPSAwOyBpIDwgMTY7IGkrKykgYm94LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XHJcbiAgaWYgKGZpZnRlZW4uZ28oZmlmdGVlbi5Nb3ZlW3szOTogJ2xlZnQnLCAzNzogJ3JpZ2h0JywgNDA6ICd1cCcsIDM4OiAnZG93bid9W2Uua2V5Q29kZV1dKSkge1xyXG4gICAgZHJhdygpOyBpZiAoZmlmdGVlbi5pc0NvbXBsZXRlZCgpKSB7XHJcbiAgICAgIGJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdvbGRcIjtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBhcmd1bWVudHMuY2FsbGVlKTsgfSB9fSk7XHJcbmRyYXcoKTtcclxuZnVuY3Rpb24gZHJhdygpIHtcclxuICBmb3IgKHZhciBpID0gMCwgdGlsZTsgdGlsZSA9IGJveC5jaGlsZE5vZGVzW2ldLCBpIDwgMTY7IGkrKykge1xyXG4gICAgdGlsZS50ZXh0Q29udGVudCA9IGZpZnRlZW4ub3JkZXJbaV07IHRpbGUuc3R5bGUudmlzaWJpbGl0eSA9IGZpZnRlZW4ub3JkZXJbaV0/ICd2aXNpYmxlJyA6ICdoaWRkZW4nOyB9IFxyXG4gIH07Ki8iLCJpbXBvcnQgJy4vc3R5bGVzL21haW4uc2Nzcyc7XHJcbmltcG9ydCAnLi9nZW0tcHV6emxlJzsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9