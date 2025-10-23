const grid = document.querySelector(".grid")
const resultDisplay = document.querySelector(".results")
const width = 15
const aliensRemoved = []
let currentShooterIndex = 202
let isGoingRight = true
let direction = 1
let results = 0 
var modeMenu = document.querySelector("#modes");
var body = document.querySelector("body");
const restartButton = document.querySelector('#restartButton')

function newGame() {
    // grid.innerHTML = ""
    resultDisplay.textContent = "0"
    results = 0
    aliensRemoved.length = 0
    currentShooterIndex = 202
    isGoingRight = true
    direction = 1

    alienInvaders.length = 0
    alienInvaders.push(
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    )
}

// CONTROL FUNCTIONALITY 

for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    // square.id = i 
    grid.appendChild(square)
}

const squaresArray = Array.from(document.querySelectorAll('.grid div'))

// console.log(squares)
let invadersId 
let squares = squaresArray

const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
]

function draw() {
    for (let i =0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i))
        squares[alienInvaders[i]].classList.add('invader')
    }
}

function remove() {
    for (let i =0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove('invader')
    }
}

draw()
squares[currentShooterIndex].classList.add('shooter')


function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !==0) currentShooterIndex -=1
            break
        case 'ArrowRight':
            if (currentShooterIndex % width < width -1) currentShooterIndex +=1
            break
    }
    squares[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter)

  function LosingColors () {
    resultDisplay.innerHTML = "GAME OVER!"
    resultDisplay.style.fontSize = '4rem'
    resultDisplay.style.fontWeight = 'bolder' 
    resultDisplay.style.color = '#4e0101ed'

    const flash = document.createElement('div')
    flash.style.position = 'fixed';
    flash.style.top = 0;
    flash.style.left = 0;
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = 'red';
    flash.style.opacity = 0.8;
    flash.style.zIndex = 9999;
    flash.style.pointerEvents = 'none';
    document.body.appendChild(flash)
    
  setTimeout(() => {
    flash.animate(
        [
            {opacity:0.8},
            {opacity: 0 }
        ],
        {
            duration: 600,
            easing: 'ease-out'
        }
    ).onfinish = () => flash.remove();
  }, 0);
  }

  function WinningColors () {
    resultDisplay.innerHTML = "YOU WIN!"
    resultDisplay.style.fontSize = '4rem'
    resultDisplay.style.fontWeight = 'bolder' 
    resultDisplay.style.color = '#4e0101ed'
}

// setTimeout(() => {
//     flash.animate([...])
// }, 0)

  
function moveInvaders () {
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length -1] % width === width -1
    remove()

    if (rightEdge && isGoingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1
            direction = -1
            isGoingRight = false 
        }
    }

    if (leftEdge &&!isGoingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1
            direction = 1
            isGoingRight = true
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
    }

    draw()


    if (squares[currentShooterIndex]. classList.contains('invader')) {
        LosingColors()
        clearInterval(invadersId)
    }

    if (aliensRemoved.length === alienInvaders.length) {
        WinningColors()
        clearInterval(invadersId)
    }
}
invadersId = setInterval(moveInvaders, 600)

function shoot(e) {
    let laserId
    let currentLaserIndex = currentShooterIndex

    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add('laser')

        if (squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('invader')
            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].classList.add('boom')


            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300)
            clearInterval(laserId)

            const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoved)
            results++
            resultDisplay.innerHTML = results
            // console.log(aliensRemoved) 
        }
    }

    if (e.key === 'ArrowUp') {
        laserId = setInterval(moveLaser, 100)
    }
 }

document.addEventListener('keydown', shoot) 

restartButton.addEventListener('click', function() {
    clearInterval(invadersId); // stop old movement
    newGame(); // reset variables
    squares.forEach(sq => sq.classList.remove('invader', 'laser', 'boom', 'shooter')); // clear visuals
    draw(); // draw invaders again
    squares[currentShooterIndex].classList.add('shooter'); // place shooter again
    invadersId = setInterval(moveInvaders, 600); // restart movement
  });  
newGame()
// draw()

// PREMIUM PAY ALERT POP UP 
modeMenu.addEventListener('click', function (e) {
    if (e.key === "Premium") {
        alert("YOU MUST FIRST ENTER PAYMENT DETAILS")
    }
})


// Light/ Dark Mode 

modeMenu.addEventListener("change", function (e) {
    let mode = e.target.value;
    if (mode === "light") {
      body.classList.remove("dark");
      body.classList.remove("premium");
      body.classList.add("light");
    } else if (mode === "dark") {
      body.classList.remove("light");
      body.classList.remove("premium");
      body.classList.add("dark");
    } else if (mode === "premium") {
      body.classList.remove("dark");
      body.classList.remove("light");
      body.classList.add("premium");
    }
  });

 







