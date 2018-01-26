function Renderer() {
    this.addListeners();
}

Renderer.prototype = {
    ID_CANVAS: "renderer",
    
    getCanvas() {
        return document.getElementById(this.ID_CANVAS);
    },
    
    resize() {
        const canvas = this.getCanvas();
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    },
    
    addListeners() {
        window.addEventListener("resize", this.resize.bind(this));
    }
}