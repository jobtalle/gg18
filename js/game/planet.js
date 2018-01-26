function Planet() {
    
}

Planet.prototype = {
    COLOR_PLANET: "#55FF11",
    RADIUS: 100,
    
    render(context) {
        context.fillStyle = this.COLOR_PLANET;
        
        context.beginPath();
        context.arc(0, 0, this.RADIUS, 0, Math.PI * 2);
        context.fill();
    },
    
    update(timeStep) {
        
    }
}