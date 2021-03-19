const CIRCLE_CLASS="circle";
const X_CLASS = "x";

const cellElements = document.querySelectorAll("[data-cell]");
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const WinningCombos=
[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

var circleTurn;

restartButton.addEventListener('click', startGame);
startGame();

function startGame()
{
    circleTurn=false;
    cellElements.forEach(cell =>
    {
        cell.addEventListener('click', handleClick, {once: true});
    });
    winningMessageElement.classList.remove('show');    
    cellElements.forEach(cell => 
    {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
    });
    setBoardHoverClass()
}


function handleClick(e)
{
    const cell = e.target;
    const currentClass = circleTurn? CIRCLE_CLASS:X_CLASS;
    swapTurns();
    placeMark(cell, currentClass);
    if(checkWin(currentClass)) 
    {
        console.log('winner '+currentClass);
        return endGame(false);
    }    
    if(isDraw()) endGame(true);
    setBoardHoverClass();
    
}



function isDraw()
{
    for(x=0; x<cellElements.length; x++)
    {
        if(!(cellElements[x].classList.contains(CIRCLE_CLASS) || cellElements[x].classList.contains(X_CLASS))) return false;
    }
    return true;
}
function endGame(draw)
{
    if(draw)
    {
        winningMessageTextElement.innerText = "It's a draw!";
        winningMessageElement.classList.add('show');

    }
    else
    {
        winningMessageTextElement.innerText = circleTurn?"X wins!":"Circle wins!";
        winningMessageElement.classList.add('show');
    }
}

function placeMark(cell, currentClass)
{
    cell.classList.add(currentClass);
}

function swapTurns()
{
    circleTurn=!circleTurn;
}

function setBoardHoverClass()
{
    board.classList.remove(CIRCLE_CLASS);
    board.classList.remove(X_CLASS);
    if(circleTurn) board.classList.add(CIRCLE_CLASS);
    else board.classList.add(X_CLASS);
}

function checkWin(currentClass)
{
    return WinningCombos.some((combination) =>
    {
        return combination.every((index)=>
        {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}