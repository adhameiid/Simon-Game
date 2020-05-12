

var buttonsColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0 ;  


$(document).keypress(function() {
    if (!started) {
    
      $("h1").text("Level " + level);
      nextSequence();
      started = true;
   }
  });


 $(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
  
  });
 
function nextSequence(){

    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonsColor[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
  }

function playSound(key){
    var audio = new Audio("sounds/" + key + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){ 
        $("#"+currentColour).removeClass("pressed");
    ; }, 100);

}

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      var wrong = "wrong";
      playSound(wrong);

      $("body").addClass("game-over");

      setTimeout(function(){ 
          $("body").removeClass("game-over");
      ; }, 100);

      $("h1").text("Game Over, Press Any Key to Restar");

      startOver();

    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

