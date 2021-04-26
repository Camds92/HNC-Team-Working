let jumper; 

// player 
var squareX = 10 // X Position 
var squareY = 640 // Y Position 
var squareW = 30; // can use later for powerup's
var squareH = 70; // can use later for powerup's 

// Second Obstacle
var rect3x =450;
var rect3y = 500;
var rect3Width = 50;
var rect3Height = 160;

// First Obstacle
var rect4x =300;
var rect4y = 600;
var rect4Width = 50;
var rect4Height = 60;

//gravity and jumping 
var jump = false;
var direction = 1; // the force of gravity in the y direction
var velocity = 2; // speed of the player
var jumpPower = 15; // how high can they jump
var fallingSpeed = 5; //
var minHeight =640; // height of ground
var maxHeight = 50; // height of sky 
var jumpCounter = 0; //Keeps track of how much we are jumping

function setup() //Makes the background
{
  //createCanvas(800, 700); // Creates canvas for use on p5.js editor
  let myCanvas = createCanvas(800, 700);
  myCanvas.parent('Game'); // Gives the game a HTML ID only use when not using p5.js editor
  rectMode(CENTER);
  textAlign(CENTER);
  
} // end of setup 

function draw() 
{
  background(135, 200, 200);

  //Runs the other two functions
  keyPressed();
  gravity();

  //Floor
  noStroke();
  fill(100);
  rect(width/2, 700, width, 100);
 
  //Player Square
  fill(100,0,0)
  square(squareX,squareY,20)
  
  //boxes 
  fill(100);
  rect(rect3x,rect3y,rect3Width,rect3Height);
  rect(rect4x,rect4y,rect4Width,rect4Height);
  
  //collisions
  if (squareX <=0){
    squareX = 0+10; // Stops the player from leaving the left screen
  }
  if (squareX >= width){
    squareX = width; // Stops the player from leaving the right screen 
  }

  // Allows the player to land on the rectangles.
  if(squareX >= rect4x-rect4Width/2 && squareX <= rect4x+rect4Width/2 && squareY+10 >= rect4y-rect4Height/2 && squareY+10 <= rect4y+rect4Height/2 && jump == false){
    sqaureY = squareY; //Don't fall
    velocity = 0; // No speed because we arent falling
    jumpCounter =0; //allows us to jump again
    }
  if(squareX >= rect3x-rect3Width/2 && squareX <= rect3x+rect3Width/2 && squareY+10 >= rect3y-rect3Height/2 && squareY+10 <= rect3y+rect3Height/2 && jump == false){
      sqaureY = squareY; //Don't fall
      velocity = 0; // No speed because we arent falling
      jumpCounter =0; //allows us to jump again
  }

  // end of collisions  
  
} //end of draw

//Controls the Gravity for the player
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
    if(squareY <= maxHeight || jumpCounter >=jumpPower){
      if(squareY >= minHeight){
        squareY = minHeight;
      } //closes on minHeight
      else{
      velocity = fallingSpeed;
      }// closes at max
    }
    else{
    velocity =-jumpPower;
    jumpCounter = jumpCounter +1;
    }// close else not at max
  }//close jump
  else{
    velocity = fallingSpeed;
  }//close not jumping
}// Close Gravity 

function keyPressed()
{
      
  if (keyIsDown(LEFT_ARROW)) {
    squareX -= 5;
    }
  

  if (keyIsDown(RIGHT_ARROW)) {
    squareX += 5;
    }


  if (keyIsDown(UP_ARROW)) 
  {
    jump = true;
  } else
    {
      jump = false;
    }

}// close keyPressed
