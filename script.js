
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const wme = document.getElementById('winningMsg')
const wmte = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')
let circleTurn

const WINNING_COMBINATION = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

startGame()
function startGame(){
    circleTurn = false;
    cellElements.forEach(cell=>{
        cell.addEventListener('click',handleclick,{once:true})
    })
    setBoardHoverClass()
}
function handleclick(e){
   const cell = e.target;
   const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
   placeMark(cell,currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }else if(isDraw()){
        endGame(true)
    }else{
        swapTurns()
        setBoardHoverClass()
    }
  
}
function endGame(draw){
    if(draw){
        wmte.textContent = "It's a Draw!"
    }else{
        wmte.textContent = `${circleTurn ? "O's Win!" : "X's Win!"}`
    }
    wme.classList.add("show")
    restartButton.addEventListener('click',handleRestart)
}
function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function handleRestart(){
    wme.classList.remove("show")
    cellElements.forEach(cell=>{
        cell.classList.remove(X_CLASS)||cell.classList.remove(CIRCLE_CLASS)
    })
    startGame()
}
function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)

    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS) 
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATION.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}