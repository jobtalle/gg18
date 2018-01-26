function Renderer() {
    this.context = this.getCanvas().getContext("2d");
                
    this.addListeners();
}

Renderer.prototype = {
    ID_CANVAS: "renderer",
    
    getContext() {
        return this.context;
    },
    
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