function GameoverScreen(finalScore){
    this.finalScore = finalScore;

    this.createGameOverScreen();
}

GameoverScreen.prototype = {
    createGameOverScreen()
    {
        document.getElementById("gameOver").style.display = 'none';
    },

    ShowScoreScreen(){
        var gameOver = document.getElementById("gameOver");
        gameOver.style.display = 'block';
        
        var score = document.createElement('gameoverheader');
        score.classList.add("gameoverheader");
        score.innerHTML = 'FINAL SCORE: ' + globalScore.getScore();

        //cleanup on aisle 3
        while (gameOver.firstChild){
            gameOver.removeChild(gameOver.firstChild);
        }
        
        gameOver.appendChild(score);
    }
}
