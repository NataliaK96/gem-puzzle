export class GemPuzzle {
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

