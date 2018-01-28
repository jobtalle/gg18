function GlobalScore(score) {
    this.score = score;
    
    this.setScore();
    this.hide();
}

GlobalScore.prototype = {
    
    getParent(){
        return scoreObject = document.getElementById("ScoreElement");
    },
    
    setScore(){
        var scoreObject = this.getParent();
        
        scoreObject.innerHTML = 'Score: ' + this.score;
    },
    
    addScore(scoreToAdd){
        this.score += scoreToAdd;
        
        var scoreObject = this.getParent();
        
        scoreObject.classList.add("scoreAnimation");
        scoreObject.addEventListener("webkitAnimationEnd", this.removeClass.bind(this));
        
        this.setScore();
    },
    
    removeClass(){
        console.log("Doei maar weer");
        
        var scoreObject = this.getParent();
        scoreObject.classList.remove('scoreAnimation');
    },
    
    hide(){
        var scoreObject = this.getParent();
        
        scoreObject.style.display = "none";
    },
    
    unhide(){
        var scoreObject = this.getParent();
        
        scoreObject.style.display = "block";
    }
}