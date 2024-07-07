var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

//starting the game
var started=false;
var level=0;
$(document).keypress(function()
{ 
  if(!started){
    $("#level-title").text("Level "+level);
    eventSequence();
    started=true;
}

})


//functions used to make
function eventSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
    playSound(randomChosenColor);
}


function playSound(name)
{
  var audio= new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor)
{

    $("#" + currentColor).addClass("pressed");
  
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
      console.log("success");
    
    if(userClickedPattern.length===gamePattern.length)
      {
        setTimeout(function () {
          eventSequence();
        }, 1000);
      }
    }
      else{
        var audio=new Audio("sounds/wrong.mp3")
        audio.play();
        $("body").addClass("game-over");
  
        setTimeout(function(){
          $("body").removeClass("game-over");
          }, 200);
          $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
      }
}

function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}