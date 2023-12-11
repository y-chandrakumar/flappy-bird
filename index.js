const fullsizebtn=document.getElementById("fullscreenbutton");
const gameboard=document.getElementById("gameboard");
const startbutton=document.getElementById("startbtn");
const retrybtn=document.getElementById("retrybtn");
var gameover=true;
var fullscreen=false;



fullsizebtn.addEventListener('click',()=>{
    fullscreen=true;
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

        const gapHeight = 100; // Adjust the gap between the obstacles

        const obstacleHeight = Math.floor(Math.random() * (300 - gapHeight));
        const obstacleTopHeight = obstacleHeight;
        const obstacleBottomHeight = 300 - obstacleHeight - gapHeight;

        obstacleTop.style.top = 0;
        obstacleTop.style.height = obstacleTopHeight + "px";

        obstacleBottom.style.bottom = 0;
        obstacleBottom.style.height = obstacleBottomHeight + "px";

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
        const obstacleRectup = obstacle[0].getBoundingClientRect();
           if(obstacleRectdown.right<boardRect.left){
            obstacle[0].classList.remove("obstacle");
            obstacle[0].classList.remove("obstacle");
           }
        //    player.style.transform+="translateY(1vh)";
        if (isCollision()) {
            gameover=true;
            // console.log("collison happened");
            retrybtn.style.display="block";
           
            stopAnimation();
        }
        // console.log("no collison happened");
    }, 10);

    setInterval(()=>{
        if(!gameover){
        player.style.transform+="translateY(20vh)";}
    },1000)



//----------------------------------------------------------------------------------



    function handleUserInput(event) {
        // Check if the event is triggered by space bar, upward arrow, or touch
        if (event.code === 'ArrowUp' || event.code === 'ArrowDown' || event.type === 'touchstart') {
            
            // if(event.code=="ArrowDown" && !gameover){
            //     player.style.transform+="translateY(10vh)";
            // }
            if((event.code=="ArrowUp" || event.type=="touchstart") && !gameover){
                player.style.transform+="translateY(-10vh)";
            }
          
          console.log('User input detected! Performing some action...');
        
        
        }
      }
       
      startbutton.addEventListener('click',()=>{
        startbutton.style.display="none";
        var elements = document.getElementsByClassName("obstacle");

// Loop through each element and add the animation attribute
      for (var i = 0; i < elements.length; i++) {
    elements[i].style.animation = "moveObstacle 200000s linear";
    }
    gameover=false;
      })

      retrybtn.addEventListener('click',()=>{

        location.reload();
        console.log(fullscreen);
        if(fullscreen){

        launchFullscreen(document.documentElement);}
        retrybtn.style.display='none';
      })
      
      document.addEventListener('keydown', handleUserInput);
      document.addEventListener('touchstart', handleUserInput);





     
