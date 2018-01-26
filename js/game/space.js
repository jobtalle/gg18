function Space() {
    
}

Space.prototype = {
    COLOR_SPACE: "#001144",
    
    render(context) {
        context.clearRect(0,0, context.canvas.clientWidth, context.canvas.clientHeight);
    },
    
    update(timeStep) {
        
    }
}