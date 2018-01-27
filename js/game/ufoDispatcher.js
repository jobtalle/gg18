function UfoDispatcher(onSpawn) {
    this.onSpawn = onSpawn;
}

UfoDispatcher.prototype = {
    start() {
        this.difficulty = -1;
        
        this.nextSequence();
        this.nextUfo();
    },
    
    getSequence() {
        var possibilities = [];
        
        for(var i = 0; i < sequences.length; ++i) {
            const sequence = sequences[i];
            
            if(sequence.difficulty.min >= this.difficulty && sequence.difficulty.max >= this.difficulty)
                possibilities.push(sequence);
        }
        
        return possibilities[Math.trunc(Math.random() * possibilities.length)];
    },
    
    nextSequence() {
        ++this.difficulty;
        this.sequence = this.getSequence();
        this.ufoIndex = 0;
        
        console.log("Next sequence");
    },
    
    nextUfo() {
        if(this.ufoIndex >= this.sequence.ufos.length)
            this.nextSequence();
        
        this.ufo = this.sequence.ufos[this.ufoIndex++];
        this.time = 0;
        
        this.onSpawn(this.ufo);
    },
    
    update(deltaTime)
    {
        this.time += deltaTime;
        
        if(this.time > this.ufo.next)
            this.nextUfo();
    }
} 