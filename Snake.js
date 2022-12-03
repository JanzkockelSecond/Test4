let gameboard = document.getElementById("GameBoard");
//gameboard wird von html übertragen
let gb = gameboard.getContext("2d");
//game-board
let randomColor = "red";

let rows = 20;
let cols = 20;
let snake = [
    {x: 2, y: 10}

]
// mit arrays kann man mehrere jason's einer Variable zuweisen.
let food = {x: 17, y: 10}
// Das mit den geschweiften klammern sind jason's. (man könnte sagen man weist ihnen mehrere werte zu)
let CellWidth = gameboard.width / cols;
let CellHeight = gameboard.height / rows;
let direction = "";

let onfood = false;

setInterval(GameLoop, 100)
// wenn eine funtction in ein setInterval eingefügt wurde dann widerholt es die funtction permanent.
// die Zahl nach dem komma seht für die milisekunden in der es wiederholt wird.
document.addEventListener("keydown", keyDown);
// mit document.addEventListener kann man dafür sorgen das immer wenn eine taste gedrückt wird wird die danach kommende function aktiviert.

draw();
foodGetRandom();

function rec(x, y,){
    gb.fillRect(x * CellHeight, y * CellWidth, CellHeight - 2, CellWidth - 2)
}

function col(c){
    gb.fillStyle = c
}

    function draw(){
        gb.fillStyle = "grey"
        gb.fillRect(0, 0, gameboard.width, gameboard.height,)

        col("cyan")
        snake.forEach(part => rec(part.x, part.y));

        col(randomColor)
        rec(snake[0].x, snake[0].y)

        col("yellow")
        rec(food.x, food.y,)

        requestAnimationFrame(draw);
        // mit requestAnimationFrame wiederholt man die function die in den klammern steht wenn sich in der function etwas verändert.
    }
    function snakemore(){
        for (let i = snake.length - 1; i > 0; i --) {
            const part = snake[i];
            const lastpart = snake[i - 1];
            part.x = lastpart.x;
            part.y = lastpart.y;
        }
    }
    function foodGetRandom(){
        let randomX = Math.floor(Math.random() * cols);
        let randomY = Math.floor(Math.random() * rows);

        food = {x: randomX, y: randomY}
    }


    function GameLoop(){
        snakemore();
        if (onfood == true){
            snake = [{x: snake[0].x, y: snake[0].y}, ...snake]
            onfood = false;
            document.getElementById("outlänge").innerHTML = snake.length;
        }
        
        if(snake[0].x == food.x && snake[0].y == food.y){
            foodGetRandom();
            onfood = true;
        }
        
        if(direction == "left"){
            snake[0].x--;
        }
        if(direction == "right"){
            snake[0].x++;
        }
        if(direction == "up"){
            snake[0].y--;
        }
        if(direction == "down"){
            snake[0].y++;
        }
        
        if(snake[0].x == 21){
            snake[0].x = 0;
        }
        if(snake[0].x == -1){
            snake[0].x = 20;
        } 
        if(snake[0].y == -1){
            snake[0].y = 20;
        } 
        if(snake[0].y == 21){
            snake[0].y = 0;
        }


        if(snake.length == 5){
            randomColor = "blue"
        }
        if(snake.length == 20){
            randomColor = "orange"
        }
        if(snake.length == 100){
            randomColor = "#FE2EF7";
        }

    }   
    
    function keyDown(e){
        if (e.keyCode == 37) {
            direction = "left";
        }
        if (e.keyCode == 40) {
            direction = "down";
        }
        if (e.keyCode == 38) {
            direction = "up";
        }
        if (e.keyCode == 39) {
            direction = "right";
        }
    }    
    
    // in javascript hat jede taste eine Zahl (z.b. pfeil links = 37)

