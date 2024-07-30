var buttonBox = document.querySelector('.btns'),
    btns = document.querySelectorAll('.btns .btn'),
    x_turn = document.querySelector('.x_turn'),
    o_turn = document.querySelector('.o_turn'),
    showChange = document.querySelector('.showChange'),
    choose = document.querySelectorAll('.choose'),
    startingPage = document.querySelector('.starting_page'),
    mainPage = document.querySelector('.main_page'),
    winnerName = document.querySelector('.winnerName'),
    winnerPage = document.querySelector('.winner_page'),
    playAgainBtn = document.querySelector('.playAgainBtn'),
    timerAnimation = document.querySelector('.timer')



let changeTurn = false;
let hasWinner = false; 
let turnTimer 

function startTimer(){
    clearTimeout(turnTimer) // clear any existing timer
    resetAnimation() // Reset the CSS animation
    turnTimer = setTimeout(() => {
        changeTurn = !changeTurn //Switch turn if time runs out
        updateTurnIndicator()
        startTimer() // Restart timer for the next turn
    }, 4000) // 4 seconds timer
}

function resetAnimation() {
    timerAnimation.style.animation = 'none';
    timerAnimation.offsetHeight;
    timerAnimation.style.animation = 'animate 4s linear forwards'
}

function updateTurnIndicator(){
    if(changeTurn){
        buttonBox.classList.remove('x')
        buttonBox.classList.add('o')
        timerAnimation.style.backgroundColor = '#A80D2A'
        showChange.style.left = '155px'
        showChange.style.backgroundColor = '#A80D2A'
        o_turn.style.color = '#fff'
        x_turn.style.color = '#000'
    } else {
        buttonBox.classList.add('x')
        buttonBox.classList.remove('o')
        timerAnimation.style.backgroundColor = '#183153'
        showChange.style.left = '0'
        showChange.style.backgroundColor = '#183153'
        o_turn.style.color = '#000'
        x_turn.style.color = '#fff'
    }
}


choose.forEach(chooseNow => {
    chooseNow.addEventListener('click', ()=> {
        if(chooseNow.id == 'playerX'){
            changeTurn = false
            updateTurnIndicator()
        } else {
            changeTurn = true
            updateTurnIndicator()
        }
        startingPage.style.display = "none"
        mainPage.style.display = "block"
        startTimer() // start timer when game starts
    })
})



btns.forEach(btn => {
    btn.addEventListener('click', ()=> {
        if(btn.innerHTML === ""){
            if(!changeTurn){
                btn.innerHTML = 'X'
                btn.style.backgroundColor = '#183153',
                btn.id = "X"
                btn.style.pointerEvents = "none"
                changeTurn = true
            } else {
                btn.innerHTML = 'O'
                btn.style.backgroundColor = '#A80D2A',
                btn.id = "O"
                btn.style.pointerEvents = "none"
                changeTurn = false
            }
            updateTurnIndicator()
            startTimer()

            winningFunc()

            if(!hasWinner){
                drawFunc()
            }

        }
    })
})


let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function winningFunc() {
    for(let a = 0; a <= 7; a++){
        let b = winningCombinations[a]

        if(btns[b[0]].id == "" || btns[b[1]].id == "" || btns[b[2]].id == ""){
            continue
        }

        else if(btns[b[0]].id == "X" && btns[b[1]].id == "X" && btns[b[2]].id == "X"){
            winnerName.innerHTML = `Player <span class="winnerText">X</span> Won The Game!`

            let winnerText = document.querySelector('.winnerText')

            winnerText.style.color = '#183153'
            playAgainBtn.style.backgroundColor = '#183153'
            hasWinner = true

            incrementWinCount("X")

            setTimeout(() => {
                mainPage.style.display = 'none'
                winnerPage.style.display = 'block'
            }, 300)
            clearTimeout(turnTimer) // Stop timer when game ends
            break
        }

        else if(btns[b[0]].id == "O" && btns[b[1]].id == "O" && btns[b[2]].id == "O"){
            winnerName.innerHTML = `Player <span class="winnerText">O</span> Won The Game!`

            let winnerText = document.querySelector('.winnerText')

            winnerText.style.color = '#A80D2A'
            playAgainBtn.style.backgroundColor = '#A80D2A'
            hasWinner = true

            incrementWinCount("O")

            setTimeout(() => {
                mainPage.style.display = 'none'
                winnerPage.style.display = 'block'
            }, 300)
            clearTimeout(turnTimer) // Stop timer when game ends
            break
        }
    }
}

function drawFunc() {
    if(!hasWinner && Array.from(btns).every(box => box.id != "")){
        winnerName.innerHTML = 'Match has been Drawn!'
        setTimeout(() => {
            mainPage.style.display = 'none'
            winnerPage.style.display = 'block'
        }, 300)
        clearTimeout(turnTimer) // Stop timer when game ends
    }
}


function incrementWinCount(player){
    if(player === "X"){
        let xWins = document.getElementById('x_wins_count')
        xWins.innerHTML = parseInt(xWins.innerHTML) + 1
    }
    else if(player == "O"){
        let oWins = document.getElementById('o_wins_count')
        oWins.innerHTML = parseInt(oWins.innerHTML) + 1
    }
}


function resetGame(){
    changeTurn = false // Reset the changeTurn flag
    hasWinner = false // Reset the hasWinner flag

    winnerName.innerHTML = ""
    btns.forEach(btn => {
        btn.innerHTML = ""
        btn.id = ""
        btn.style.backgroundColor = ""
        btn.style.pointerEvents = "auto"
    })

    startingPage.style.display = "block"
    mainPage.style.display = "none"
    winnerPage.style.display = "none"
}

playAgainBtn.addEventListener('click', ()=> {
    resetGame()
})