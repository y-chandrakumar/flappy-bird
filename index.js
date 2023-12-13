const fullsizebtn=document.getElementById("fullscreenbutton");
const gameboard=document.getElementById("gameboard");
const startbutton=document.getElementById("startbtn");
const retrybtn=document.getElementById("retrybtn");
var gameover=true;
var fullscreen=false;
var score=0;
if(localStorage.getItem('fullscreen')=='true'){
    fullsizebtn.click();
}


const highestscore=document.getElementById('highestscore');
if(localStorage.getItem('Highest score')==null){
    highestscore.innerHTML="Highest Score:0";
}
else{
highestscore.innerHTML="Highest Score:"+localStorage.getItem('Highest score');}



console.log(localStorage.getItem('Highest score'));

fullsizebtn.addEventListener('click',()=>{
    fullscreen=true;
    localStorage.setItem('fullscreen','true');
    function launchFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
    launchFullscreen(document.documentElement);

})








function generateObstacles(numObstacles) {
    for (let i = 0; i < numObstacles; i++) {
        const obstacleTop = document.createElement("div");
        const obstacleBottom = document.createElement("div");

        obstacleTop.className = "obstacle";
        obstacleBottom.className = "obstacle";

        const gapHeight = 25; // Adjust the gap between the obstacles

        const obstacleHeight = Math.floor(Math.random() * (80 - gapHeight));
        const obstacleTopHeight =  parseInt(obstacleHeight) 
        console.log(obstacleTop.style.height);
        const obstacleBottomHeight = parseInt(80 - obstacleHeight - gapHeight)


        obstacleTop.style.top = 0;
        obstacleTop.style.height = obstacleTopHeight + "vh";

        obstacleBottom.style.bottom = 0;
        obstacleBottom.style.height = obstacleBottomHeight + "vh";

        const obstaclePosition = 500 + i * 200; // Adjust the starting position of obstacles

        obstacleTop.style.left = obstaclePosition + "px";
        obstacleBottom.style.left = obstaclePosition + "px";

        gameboard.appendChild(obstacleTop);
        gameboard.appendChild(obstacleBottom);
    }
}

// Call the function with the desired number of obstacles
generateObstacles(500);



//----------------------------------------------------------------------------------------------------





const player = document.getElementById("player1");
    const obstacle = document.getElementsByClassName("obstacle");
 
    
    
    function isCollision() {
        const playerRect = player.getBoundingClientRect();
        const boardRect = gameboard.getBoundingClientRect();
        const obstacleRect = obstacle[1].getBoundingClientRect();
        const obstacleRec = obstacle[0].getBoundingClientRect();
           
        return (
            (playerRect.right > obstacleRect.left &&  //downsides
            playerRect.left < obstacleRect.right &&
            playerRect.bottom > obstacleRect.top &&
            playerRect.top < obstacleRect.bottom) ||

            (playerRect.right > obstacleRec.left &&
            playerRect.left < obstacleRec.right &&  //upsides
            playerRect.bottom > obstacleRec.top &&
            playerRect.top < obstacleRec.bottom) ||


            playerRect.top<boardRect.top ||
            playerRect.bottom>boardRect.bottom

        );
    }

    

    function stopAnimation() {
      
      const computedStyleplayer=window.getComputedStyle(player);
      const currentTransformValueplayer=computedStyleplayer.getPropertyValue('transform');
      player.style.transform=currentTransformValueplayer;
      console.log(currentTransformValueplayer)
     
  
    for(let i=0;i<500;i++){
        const animatedBox = obstacle[i];
        const computedStyle = window.getComputedStyle(animatedBox);
        const currentTransformValue = computedStyle.getPropertyValue('transform');
    
        animatedBox.style.animation = 'none';
        animatedBox.style.transform = currentTransformValue;
    
       

    }
    }

    // Check for collision every 100 milliseconds (adjust as needed)
    setInterval(() => {
        const boardRect = gameboard.getBoundingClientRect();
        const obstacleRectdown = obstacle[1].getBoundingClientRect();
        
           if(obstacleRectdown.right<boardRect.left){
            obstacle[0].classList.remove("obstacle");
            obstacle[0].classList.remove("obstacle");

            score+=1;
            document.getElementById("scoreboard").innerHTML="Score:"+score;
           }
        //    player.style.transform+="translateY(1vh)";
        if (!gameover && isCollision()) {
            gameover=true;
            // console.log("collison happened");
            retrybtn.style.display="block";
           localStorage.setItem('Highest score',Math.max(localStorage.getItem('Highest score'),score));
            stopAnimation();
        }
        // console.log("no collison happened");
    }, 5);

    setInterval(()=>{
        if(!gameover){
          
        player.style.transform+="translateY(15vh)";
    }
    },500)



//----------------------------------------------------------------------------------



    function handleUserInput(event) {
        if(event.key=="s" && gameover){
            console.log("pressed s");
            startbutton.click();
            
        }
        if(event.key=="f" ){
            console.log("pressed f");
            fullsizebtn.click();
        }

        if(event.key=="r" && gameover){
            console.log("pressed r");
            retrybtn.click();
        }
        event.preventDefault();
        // Check if the event is triggered by space bar, upward arrow, or touch
        
            if((event.code=="ArrowUp" || event.type=="touchstart" || event.code=="Space") && !gameover){
                player.style.transform+="translateY(-10vh)";
            }
          
      
        
        
        }
      
       
      startbutton.addEventListener('click',()=>{
        startbutton.style.display="none";
        var elements = document.getElementsByClassName("obstacle");


      for (var i = 0; i < elements.length; i++) {
    elements[i].style.animation = "moveObstacle 200000s linear";
    }
    gameover=false;
      })

      retrybtn.addEventListener('click',()=>{
       location.reload();
        
        
    
      })
      
      document.addEventListener('keydown', handleUserInput);
      document.addEventListener('touchstart', handleUserInput);

    


    //   ----------------------------------------------------------------





      // Function to handle the continuous press
  function handleContinuousPress() {
    player.style.transform+="translateY(-7.5vh)";
  }

 
  let touchStartTime;
  let continuousPressInterval;

  // Target element
  
  // Touch start event
  document.addEventListener('touchstart', function (event) {
 
    event.preventDefault();

    // Record the touch start time
    touchStartTime = new Date().getTime();

    // Set an interval to repeatedly check the press duration
    continuousPressInterval = setInterval(function () {
      const touchDuration = new Date().getTime() - touchStartTime;

      
      if (touchDuration >= 500 && !gameover) {
        handleContinuousPress();
      }
    }, 100); // Adjust the interval as needed
  });

  // Touch move event
  document.addEventListener('touchmove', function () {
    
    clearInterval(continuousPressInterval);
  });

  // Touch end event
  document.addEventListener('touchend', function () {
    // Clear the interval
    clearInterval(continuousPressInterval);
  });





     
