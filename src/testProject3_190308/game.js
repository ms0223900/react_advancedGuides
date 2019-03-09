/* eslint-disable no-unused-vars */

let 
snake = [38, 37], 
food = 39;
let timer, next, direction = 1;

const ctx = document.getElementById("root").getContext("2d");
function draw(n, color) {
	ctx.fillStyle = color;
	ctx.fillRect(n % 36 * 20 + 1, ~~(n / 36) * 20 + 1,  18, 18);
}
document.onkeydown = function(e) {
	let newDir;
	direction = (snake[0] - snake[1]) === (newDir = [ -1, -36, 1, 36 ][(e.keyCode) - 37] || direction) ? direction : newDir;
}
// eslint-disable-next-line no-unused-expressions
!function() {
	next = snake[0] + direction; // to right
	snake = [next, ...snake]; //new snake
	if(next % 36 === 0) {
		return ;
	}
	console.log(snake);
	draw(next, 'red'); //snake body
	
	if(next === food) {
		while (snake.indexOf(food = ~~(Math.random() * 36 * 24)) >= 0);
		draw(food, 'blue');
	} else {
		draw(snake[snake.length - 1], '#dddaaa'); //move and fill last path
		snake = snake.slice(0, -1);
	}
	// eslint-disable-next-line no-caller
	timer = setTimeout(arguments.callee, 100);
}();
document.getElementById('stop').onclick = function() {
	clearTimeout('timer');
}
