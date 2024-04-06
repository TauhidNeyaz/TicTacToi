let boxes = document.querySelectorAll(".box")
let resetGame = document.querySelector("#reset-btn")
let showMessege = document.querySelector("#msg")
let playerX = document.querySelector("#playerX")
let playerO = document.querySelector("#playerO")
let resetPoints = document.querySelector("#reset-points")

let turnX = true
let moveCount = 0
let playerXpoints = 0
let playerOpoints = 0
let checkForDraw = true

playerX.innerText = `PlayerX Points: ${playerXpoints}`
playerO.innerText = `PlayerO Points: ${playerOpoints}`


const winPattern = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6]
]

const updatePlayerPoints = (ok) => {
    if (!turnX && ok) {
        playerXpoints++;
        playerX.innerText = `PlayerX Points: ${playerXpoints}`
    }
    else if (ok) {
        playerOpoints++;
        playerO.innerText = `PlayerO Points: ${playerOpoints}`
    }
}


const showResult = () => {
    if (!turnX) {
        showMessege.innerText = `Winner is Player X`
    }
    else {
        showMessege.innerText = `Winner is Player O`
    }
    showMessege.style.display = "inline"
}


boxes.forEach((box) => {
    box.addEventListener('click', (event) => {

        if (turnX) {
            box.innerHTML = "X"
            box.style.color = "#EB8A90"
            turnX = !turnX
        }
        else {
            box.innerHTML = "O"
            box.style.color = "#2D82B7"
            turnX = !turnX
        }
        moveCount++
        box.disabled = true
        if (checkWinner()) {
            boxes.forEach((item) => {
                item.disabled = true
            })
            showResult()
            updatePlayerPoints(true)
            checkForDraw = false
            
        }

        if (checkForDraw && moveCount == 9) {
            showMessege.innerText = `Draw`
            showMessege.style.display = "inline"
        }
    })
})


const checkWinner = () => {
    for (pattern of winPattern) {
        if (boxes[pattern[0]].innerText === "X" &&
            boxes[pattern[1]].innerText === "X" &&
            boxes[pattern[2]].innerText === "X") {
                return true
        }

        else if (boxes[pattern[0]].innerText === "O" &&
            boxes[pattern[1]].innerText === "O" &&
            boxes[pattern[2]].innerText === "O") {
                return true
        }
        
    }
    return false
}


resetGame.addEventListener('click', (event) => {
    boxes.forEach((box) => {
        box.innerHTML = ""
        box.disabled = false
        showMessege.style.display = "none"
        moveCount = 0;
    })
})


resetPoints.addEventListener("click", () => {
    playerXpoints = 0
    playerOpoints = 0
    playerX.innerText = `PlayerX Points: ${playerXpoints}`
    playerO.innerText = `PlayerO Points: ${playerOpoints}`
})