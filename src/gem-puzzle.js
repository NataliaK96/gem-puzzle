import {GemPuzzle} from './GemPuzzle'

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
    mygame = new GemPuzzle(save.size, save)
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
export function tableRend(){
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

let mygame = new GemPuzzle(setSize.value)



setSize.addEventListener('change',()=>{
  if(setSize.value >8 || setSize.value < 3) return
  timer.innerHTML = 'Начните игру'
  counter.innerHTML = 'Вперёд!'
  mygame.delete()
  mygame.removeInterval()
  mygame = new GemPuzzle(setSize.value)
})

generateField.addEventListener('click',()=>{
  timer.innerHTML = 'Начните игру'
  counter.innerHTML = 'Вперёд!'
  mygame.delete()
  mygame.removeInterval()
  mygame = new GemPuzzle(setSize.value)
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