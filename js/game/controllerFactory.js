function ControllerFactory() {
    this.controllers = [];
    
    gamepad.on("press", "button_1", e => {
        for(var i = 0; i < this.controllers.length; ++i)
            if(this.controllers[i].controllerId == e.player)
                this.controllers[i].onPressButton1();
    });
    
    gamepad.on("release", "button_1", e => {
        for(var i = 0; i < this.controllers.length; ++i)
            if(this.controllers[i].controllerId == e.player)
                this.controllers[i].onReleaseButton1();
    });
    
    gamepad.on('press', 'button_2', e => {
        for(var i = 0; i < this.controllers.length; ++i)
            if(this.controllers[i].controllerId == e.player)
                this.controllers[i].onPressButton2();
    });
    
    gamepad.on('release', 'button_2', e => {
        for(var i = 0; i < this.controllers.length; ++i)
            if(this.controllers[i].controllerId == e.player)
                this.controllers[i].onReleaseButton2();
    });
    
    gamepad.on('hold', "stick_axis_left", e=>{
        for(var i = 0; i < this.controllers.length; ++i)
            if(this.controllers[i].controllerId == e.player)
                this.controllers[i].onMoveStickLeft(new Vector(
                    e.value[0],
                    e.value[1]));
    });
}

ControllerFactory.prototype = {
    createPlayerController(id) {
        var controller = new PlayerController(id);
        
        this.controllers.push(controller);
        
        return controller;
    },
    
    deletePlayerController(controller) {
        this.controller.splice(this.controllers.indexOf(controller), 1);
    }
}