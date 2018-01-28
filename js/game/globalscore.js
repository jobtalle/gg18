function GlobalScore(score) {
    this.score = score;
    
    this.setScore();
}

GlobalScore.prototype = {
    
    setScore(){
        var scoreObject = document.getElementById("ScoreElement");
        
        scoreObject.innerHTML = 'Score: ' + this.score;
    },
    
    addScore(scoreToAdd){
        this.score += scoreToAdd;
    }
}