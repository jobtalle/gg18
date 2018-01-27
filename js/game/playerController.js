function PlayerController(gamepad, controllerId)
{
    this.controllerId = controllerId;

    gamepad.on('press', 'button_1', e => {
        if(e.player == this.controllerId)
            if(this.onActivatePressed != null)
                this.onActivatePressed();
    });
    gamepad.on('release', 'button_1', e => {
        if(e.player == this.controllerId)
            if(this.onActivateReleased != null)
                this.onActivateReleased();
    });
    gamepad.on('press', 'button_2', e => {
        if(e.player == this.controllerId)
            if(this.onEnterPressed != null)
                this.onEnterPressed();
    });
    gamepad.on('release', 'button_2', e => {
        if(e.player == this.controllerId)
            if(this.onEnterReleased != null)
                this.onEnterReleased(); 
    });
    gamepad.on('hold', "stick_axis_left", e=>{
        if(e.player == this.controllerId)
        {
            this.vector.x = e.value[0];
            this.vector.y = e.value[1];
            this.movedStick = true;
        }
    });
}

PlayerController.prototype = {
    onAxis: null,
    onActivatePressed: null,
    onActiveReleased: null,
    onEnterPressed: null,
    onEnterReleased: null,
    vector: new Vector(),
    zeroVector: new Vector(),
    onMove: null,
    movedStick: false,
    
    leftKey: "KeyA",
    rightKey: "KeyD",
    upKey: "KeyW",
    downKey: "KeyS",
    enterKey: "KeyE",
    escapeKey: "KeyQ",

    update(deltaTime) {
        if(this.movedStick) {
            this.onMove(this.vector);
            
            this.movedStick = false;
        }
        else
            this.onMove(this.zeroVector);
    }
}