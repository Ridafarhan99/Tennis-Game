var canvas;
var canvasContext;
let ballX=70;
let ballY=70;
let ballSpeedX=10;
let ballSpeedY=10;
var radius;
let paddle1Y=250;
let paddle2Y=250;
const PADDLE_HEIGHT=100;
let HumanScore=0;
let AIScore=0;
let WINNING_SCORE=50;
console.log("Hello India!"); 		//';' is optional.

function calculateMousePos(evt){
	var rect = canvas.getBoundingClientRect(); 		//Return the size of an element and its position relative to the viewport
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft; 		//mouse movement.
	var mouseY = evt.clientY - rect.top - root.scrollTop; 		//mouse movement.
	return{
		x:mouseX,
		y:mouseY
	}
}

window.onload = function(){
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	let framepersecond = 60;
	setInterval(function(){
		moveEveryting();
		drawEverything();
	},1000/framepersecond); 		//this function is used for calling function multiple times including time(here 1000 is 1000ms).

	canvas.addEventListener('mousemove',
		function(evt){
			var mousePos = calculateMousePos(evt);
			paddle1Y = mousePos.y-(PADDLE_HEIGHT/2); 		//cursor will point the middle of the pointer. you can change the paddle control(paddle1Y/paddle2Y)
	});
}

function ballReset(){ 		//ball reset after loose
	if(HumanScore>=WINNING_SCORE || AIScore>=WINNING_SCORE){ 		//game will start again when Gameover.
		HumanScore=0;
		AIScore=0;
	}
	ballSpeedX=-ballSpeedX;
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}

function movement(){ 		//it is for AI paddle
	let paddle2YCenter = paddle2Y+(PADDLE_HEIGHT/2);
	if(paddle2YCenter<ballY-37){
		paddle2Y+=15;
	}
	else if(paddle2YCenter>ballY+37){
		paddle2Y-=15;
	}
}


function moveEveryting(){
	movement();

	ballX=ballX+ballSpeedX;
	ballY=ballY+ballSpeedY;
	if(ballX>canvas.width-10){ 		//for ball bouncing after hitting the right wall. 
		if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT){
			ballSpeedX=-ballSpeedX;
		}
		else{
			HumanScore++;
			ballReset(); 		//if ball misses the paddle then it will restart.
		}
	}
	if(ballX<10){ 		//left wall
		if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT){
			ballSpeedX=-ballSpeedX;
		}
		else{
			AIScore++;
			ballReset(); 		//if ball misses the paddle then it will restart.
		}
	}
	if(ballY<10){
		ballSpeedY=-ballSpeedY;
	}
	if(ballY>canvas.height-10){
		ballSpeedY=-ballSpeedY;
	}
}

function drawEverything(){

	console.log(ballX);
	canvasContext.fillStyle = 'black'; 		//background colour. 
	canvasContext.fillRect(0,0,canvas.width,canvas.height);

	canvasContext.fillStyle = 'purple';
	canvasContext.fillRect(50,0,(canvas.width-105),(canvas.height-0)); 		//inside purple box.

	canvasContext.fillStyle = 'white';
	canvasContext.fillRect(1,paddle1Y,16,PADDLE_HEIGHT); 		//left paddle

	canvasContext.fillStyle = 'white';
	canvasContext.fillRect(canvas.width-(16+1),paddle2Y,16,PADDLE_HEIGHT); 		//right paddle	

	drawCircle(ballX,ballY,'yellow',10);		//draw the ball

	canvasContext.fillStyle = '#00FFFF';
	canvasContext.fillText("Human Score: "+HumanScore,40,70);

	canvasContext.fillStyle = '#00FFFF';
	canvasContext.fillText("AI Score: "+AIScore,canvas.width-90,70);
}

function drawCircle(centerX,centerY,colour,radius){
	canvasContext.fillStyle=colour;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
	canvasContext.fill();
}

