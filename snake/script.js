const canvas = document.getElementById('gameanvas');
const ctx = canvas.getContext('2d'); // fornece os metodos e propriedades necessarios para desenhar e manipular graficos 2d
const tileSize = 20; // tamanho da tile
let snake = [{x:10, y: 10}];// inicializa a cobrinha com uma posição( é um array de objeto, onde cada objeto é um quadradinho da cobrinha)
let dx = 0;// direção horizontal da cobrinha
let dy = 0;// direção vertical da cobrinha
let food = {x:15, y:15};//posição da comida
let gameOver = false; // indica o fim do jogo
let paused = false; //indica se o jogo esta pausado ou não

// função para desenhar a cobrinha
function drawSnake(){
    // define a cor do preenchimento para a cobrinha
    ctx.fillStyle = '#00ff08';
    //itera sobre cada segmento da cobrinha
    snake.forEach(segment => {
        // desenha um retangulo (um segmento da cobrinha) no canvas
        // o retangulo é prenchido com a cor definida acima
        // as coordenadas do retangulo sao baseadas nas cordenadas do segmento da cobrinha
        // cada coordenada é multiplicada pelo tamanho do tile para posicionamento correto
        // tileSize representa o tamanho de cada bloco na grade do jogo
    ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize)

    })
}

// função para desenhar a comida
function drawFood(){
    // define a cor de preenchimento para a comida(vermelho)
    ctx.fillStyle = '#f00';
    //
    ctx.fillRect(food.x * tileSize, segment.y * tileSize, tileSize, tileSize)
}

// função para mover a cobrinha
function moveSnake() {
    if (!paused) {
        const head = { x: snake[0]. x + dx, y: snake[0].y + dy};
        snake.unshift(head);
        if(head.x === food.x && head.y === food.y) {
            generateFood();
        }else{
            snake.pop();
        }
        if(checkCollision()){
            gameOver = true;
            setTimeout(()=>{
                location.reload();
            },5000);
        }
    }
}


// Função para gerar comida em uma posição aleatório
function generateFood(){
    food.x = math.floor(Math.random()*canvas.width / tileSize);
    food.y = math.floor(math.random()*canvas.height / tileSize,)
}


// função para atualizar o jogo
function update(){
    clearCanvas ();
    drawFood ();
    drawSnake ();
    moveSnake ();
    if(!gameOver) {
        setTimeout(update, 100);
    }else{
        ctx.fillStyle = '#000';
        ctx.font = '30px Arial';
        ctx.fillText('game over', canvas.width / 2 - 80, canvas.height/2);
    }
}

// função para verificar a colisão
function checkCollision() {
    const head = snake[0];
    for ( let i = 1; i < snake.length; i++) {
        if(snake[i].x === head.x && snake[i].y === head.y) {
            return true; // retorna true se houver colisão com o proprio corpo da cobrinha
        }
    }
    return head.x < 0 || head.x >= canvas.width / tileSize || head.y < 0 || head.y >= canvas.height/ tileSize;
}
// função principal do jogo
function main (){
    update(); // inicia o jogo
}
 // evento de teclado para controlar a direção da cobrinha
 document.addEventListener('keydown', e => {
    if(!gameOver && !paused) {
        switch (e.key){
            case'arrowUp':
            if(dy=== 0) {
                dx = 0;
                dy = -1;
            }
            break;
            case'arrowDown':
            if(dy=== 0){
                dx = 0;
                dy = 1;
            }
            break;
        case'arrowLeft':
            if(dy=== 0){
                dx = -1;
                dy = 0;
            }
            break;
            case'arrowRight':
            if(dy=== 0){
                dx = 1;
                dy = 0;
            }
            break;
        }
    }
 });
 // Adiciona eventode click ao botão para pausar/ despausar o jogo.

 const pauseButton = document.getElementById('pauseButton');
 pauseButton.addEventListener('click',() =>{
    paused = !paused;
    pauseButton.textContent = paused? 'resume' : 'pause';
 });
 main(); // inicia o jogo
