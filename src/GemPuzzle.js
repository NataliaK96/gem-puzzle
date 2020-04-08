import {tableRend} from  './gem-puzzle'
export class GemPuzzle {
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
    tableRend()
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
