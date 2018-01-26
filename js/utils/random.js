function Randomizer(seed) {
    if(seed == undefined)
        this.n = Math.trunc(Math.random() * this.MAX);
    else
        this.n = seed;
}

Randomizer.prototype = {
    ADD: 1,
    MULTIPLY: 69069,
    MAX: 4294967296,
    
    get() {
        this.n = (this.n * this.MULTIPLY + this.ADD) % this.MAX;
        
        return this.n / this.MAX;
    }
}