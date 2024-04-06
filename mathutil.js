document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    const ctx = gameBoard.getContext("2d");
    const scoreText = document.getElementById("scoreText");
    const resetBtn = document.getElementById("resetBtn");
    const gameWidth = gameBoard.width;
    const gameHeight = gameBoard.height;
    const boardBackground = "white";
    const snakeColor = "green";
    const snakeBorder = "black";
    const foodColor = "red";
    const unitSize = 25;
    let running = false;
    let xVelocity = unitSize;
    let yVelocity = 0;
    let foodX;
    let foodY;
    let score = 0;
    let snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 }
    ];

    resetBtn.addEventListener("click", resetGame);
    document.addEventListener("keydown", changeDirection);

    gameStart();

    function gameStart() {
        running = true;
        scoreText.textContent = score;
        createFood();
        drawFood();
        nextTick();
    }

    function nextTick() {
        if (running) {
            setTimeout(() => {
                clearBoard();
                drawFood();
                moveSnake();
                drawSnake();
                checkGameOver();
                nextTick();
            }, 75);
        } else {
            displayGameOver();
        }
    }

    function clearBoard() {
        ctx.fillStyle = boardBackground;
        ctx.fillRect(0, 0, gameWidth, gameHeight);
    }

    function createFood() {
        function randomFood(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        foodX = randomFood(0, gameWidth / unitSize) * unitSize;
        foodY = randomFood(0, gameHeight / unitSize) * unitSize;
    }

    function drawFood() {
        ctx.fillStyle = foodColor;
        ctx.fillRect(foodX, foodY, unitSize, unitSize);
    }

    function moveSnake() {
        const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };

        // Check if snake eats the food
        if (head.x === foodX && head.y === foodY) {
            score += 1;
            scoreText.textContent = score;
            createFood();
        } else {
            snake.pop();
        }

        snake.unshift(head);
    }

    function drawSnake() {
        ctx.fillStyle = snakeColor;
        ctx.strokeStyle = snakeBorder;
        snake.forEach(snakePart => {
            ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
            ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
        });
    }

    function changeDirection(event) {
        const keyPressed = event.keyCode;
        const LEFT = 37;
        const UP = 38;
        const RIGHT = 39;
        const DOWN = 40;

        if (keyPressed === LEFT && xVelocity !== unitSize) {
            xVelocity = -unitSize;
            yVelocity = 0;
        } else if (keyPressed === UP && yVelocity !== unitSize) {
            xVelocity = 0;
            yVelocity = -unitSize;
        } else if (keyPressed === RIGHT && xVelocity !== -unitSize) {
            xVelocity = unitSize;
            yVelocity = 0;
        } else if (keyPressed === DOWN && yVelocity !== -unitSize) {
            xVelocity = 0;
            yVelocity = unitSize;
        }
    }

    function checkGameOver() {
        if (
            snake[0].x < 0 ||
            snake[0].x >= gameWidth ||
            snake[0].y < 0 ||
            snake[0].y >= gameHeight
        ) {
            running = false;
        }

        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                running = false;
            }
        }
    }

    function displayGameOver() {
        ctx.font = "50px MV Boli";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
        running = false;
    }

    function resetGame() {
        score = 0;
        xVelocity = unitSize;
        yVelocity = 0;
        snake = [
            { x: unitSize * 4, y: 0 },
            { x: unitSize * 3, y: 0 },
            { x: unitSize * 2, y: 0 },
            { x: unitSize, y: 0 },
            { x: 0, y: 0 }
        ];
        gameStart();
    }
});






















































console.log("Hello");