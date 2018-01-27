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
            
            if(this.difficulty >= sequence.difficulty.min && this.difficulty <= sequence.difficulty.max)
                possibilities.push(sequence);
        }
        
        if(possibilities.length == 0)
            return null;
        
        return possibilities[Math.trunc(Math.random() * possibilities.length)];
    },
    
    nextSequence() {
        ++this.difficulty;
        this.sequence = this.getSequence();
        this.ufoIndex = 0;
    },
    
    nextUfo() {
        if(this.ufoIndex >= this.sequence.ufos.length)
            this.nextSequence();
        
        if(this.sequence == null)
            return;
        
        this.ufo = this.sequence.ufos[this.ufoIndex++];
        this.time = 0;
        
        this.onSpawn(this.ufo);
    },
    
    update(deltaTime)
    {
        if(this.sequence == null)
            return;
        
        this.time += deltaTime;
        
        if(this.time > this.ufo.next)
            this.nextUfo();
    }
} 