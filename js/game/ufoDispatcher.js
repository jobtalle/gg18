function UfoDispatcher(onSpawn) {
    this.onSpawn = onSpawn;
    this.difficulty = 0;
    
    this.load();
}

UfoDispatcher.prototype = {
    load() {
        console.log(sequences);
    },
    
    update(deltaTime)
    {
        
    }
} 