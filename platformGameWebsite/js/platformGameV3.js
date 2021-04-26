let jumper; 

// player 
var squareX = 20 // X Position 
var squareY = 525 // Y Position 
var squareW = 30; // can use later for powerup's
var squareH = 70; // can use later for powerup's 
var move = 5; //Player speed

// First Obstacle
var rect3x = 300;
var rect3y = 525;
var rect3Width = 50;
var rect3Height = 60;

// Second Obstacle
var rect4x = 450;
var rect4y = 455;
var rect4Width = 50;
var rect4Height = 200;

// Third Obstacle
var rect5x = 300;
var rect5y = 200;
var rect5Width = 50;
var rect5Height = 60;

//gravity and jumping 
var jump = false;
var direction = 1; // the force of gravity in the y direction
var velocity = 2; // speed of the player
var jumpPower = 15; // how high can they jump
var fallingSpeed = 4; //
var minHeight = 525; // height of ground
var maxHeight = 50; // height of sky 
var jumpCounter = 0; //Keeps track of how much we are jumping

/// Multimedia
/// THIS SECTION WILL BE USED FOR CHARECTER SPRITES, BACKGROUND, PLATFORM ETC IMAGES AND SOUNDS.
var marioFont;
var deadpool;
var background;

function setup() //Makes the background
{
  //createCanvas(800, 700); // Creates canvas for use on p5.js editor
  let myCanvas = createCanvas(800, 700);
  myCanvas.parent('Game'); // Gives the game a HTML ID only use when not using p5.js editor
  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
  
} // end of setup 

function draw() 
{
  //background(135, 200, 200);
  image(background, width/2, height/2, width, height);

  //Runs the other two functions
  //keyPressed();
  keyTyped();
  gravity();

  //Floor
  // noStroke();
  // fill(100);
  // rect(width/2, 700, width, 100);
 
  //Player Square
  stroke(0);
  strokeWeight(5);
  fill(100,0,0)
  //rect(squareX, squareY, squareW, squareH)
  image(deadpool,squareX, squareY, squareW, squareH);
  
  //boxes 
  stroke(255);
  strokeWeight(5);
  fill(100);
  rect(rect3x, rect3y, rect3Width, rect3Height);
  rect(rect4x, rect4y, rect4Width, rect4Height);
  rect(rect5x, rect5y, rect5Width, rect5Height);
  
  //Map Barriers
  if (squareX < 0){
    squareX = squareX + move; // Stops the player from leaving the left screen
  }
  if (squareX >= width){
    squareX = width - move; // Stops the player from leaving the right screen 
  }
  // End of map Barriers
  
  //collisions
  if(squareX >= rect3x-rect3Width/2 && squareX <= rect3x+rect3Width/2 && squareY+squareH/2 >= rect3y-rect3Height/2 && squareY-squareH/2 <= rect3y+rect3Height/2 && jump == false){
    squareY = rect3y-65; //Don't fall
    velocity = 0; // No speed because we arent falling
    jumpCounter = 0; //allows us to jump again
  }

  if(squareX >= rect4x-rect4Width/2 && squareX <= rect4x+rect4Width/2 && squareY+squareH/2 >= rect4y-rect4Height/2 && squareY-squareH/2 <= rect4y+rect4Height/2 && jump == false){
    squareY = rect4y-135; //Don't fall
    velocity = 0; // No speed because we arent falling
    jumpCounter = 0; //allows us to jump again
  }

  if(squareX >= rect5x-rect5Width/2 && squareX <= rect5x+rect5Width/2 && squareY+squareH/2 >= rect5y-rect5Height/2 && squareY-squareH/2 <= rect5y+rect5Height/2 && jump == false){
    squareY = rect5y-65; //Don't fall
    velocity = 0; // No speed because we arent falling
    jumpCounter = 0; //allows us to jump again
  }
  // end of collisions  
  
} //end of draw

///////////Controls the Gravity for the player
function gravity()
{
  if(squareY >= minHeight && jump == false)
  {
    squareY = squareY;
    jumpCounter = 0; // reset jumpcounter when landing
  } //Closes on ground 
  else{
    squareY = squareY + (direction*velocity);
  }// else fall

  if(jump==true){
    if(squareY <= maxHeight || jumpCounter >= jumpPower){
      if(squareY >= minHeight){
        squareY = minHeight;
      } //closes on minHeight
      else{
      velocity = fallingSpeed;
      }// closes at max
    }
    else{
    velocity = -jumpPower;
    jumpCounter = jumpCounter +1;
    }// close else not at max
  }//close jump
  else{
    velocity = fallingSpeed;
  }//close not jumping
}// Close Gravity 

//FUNCTION NOT REQUIRED (KEPT CODE INCASE)
// function keyPressed()
// {
//   if (keyIsDown(LEFT_ARROW)) {
//     squareX -= move;
//     }
  
//   if (keyIsDown(RIGHT_ARROW)) {
//     squareX += move;
//     }

//   if (keyIsDown(UP_ARROW)) 
//   {
//     jump = true;
//   } else
//     {
//       jump = false;
//     }
//}// close keyPressed

function keyTyped(){
  
  if (keyDown('a')) {
    squareX -= move; // moves the charecter left
    }

  if (keyDown('d')) { 
    squareX += move; // moves the charcter right 
    }

	if(keyDown('w')){
		jump = true; //jump
	}//a pressed
	else{
		jump = false; //dont jump
	}//close if not w
}

function preload(){
  marioFont = loadFont('images/smbfont.ttf');
  deadpool = loadImage('images/deadpool.png');
  background = loadImage('images/game_background.png');
}

