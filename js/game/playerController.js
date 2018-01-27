function PlayerController(gamepad, controllerId)
{
    if(gamepad != undefined)
    {
        this.controllerId = controllerId;
        this.isController = true;
        gamepad.on('press', 'button_1', e => {
            if(e.player == this.controllerId)
                if(this.onActivatePressed != null)
                    this.onActivatePressed();
        });
        gamepad.on('press', 'button_2', e => {
            if(e.player == this.controllerId)
                if(this.onActivateReleased != null)
                    this.onActivateReleased();
        });
        gamepad.on('release', 'button_1', e => {
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
                var vector = new Vector(e.value[0], e.value[1]);
                this.targetAngle = this.getAngle(vector);
            }
        });
    }
    else{
        document.body.addEventListener("keydown", this.onKeyDown.bind(this));
        document.body.addEventListener("keyup", this.onKeyUp.bind(this));
    }
}

PlayerController.prototype = {
    onAxis : null,
    onActivatePressed : null,
    onActiveReleased : null,
    onEnterPressed : null,
    onEnterReleased : null,
    onPlayerMove : null,
    leftKey: "KeyA",
    rightKey: "KeyD",
    upKey: "KeyW",
    downKey: "KeyS",
    enterKey: "KeyE",
    escapeKey: "KeyQ",
    isController: false,
    controllerId:-1,
    playerPos: new Vector(0,0),
    keyboardPos: new Vector(0,0),
    targetAngle: 0,
    slowdownAngle: 30,

    onKeyDown(e)
    {
        switch(e.code)
        {
            case this.leftKey:
                this.keyboardPos = new Vector(-1, 0);
                if(this.onAxis != null)
                {
                    this.onAxis(this.keyboardPos);
                }
                break;
            case this.rightKey:
            this.keyboardPos = new Vector(1, 0);
                if(this.onAxis != null)
                {
                    this.onAxis(this.keyboardPos);
                }
                break;
            case this.upKey:
            this.keyboardPos = new Vector(0, -1);
                if(this.onAxis != null)
                {
                    this.onAxis(this.keyboardPos);
                }
                break;
            case this.downKey:
            this.keyboardPos = new Vector(0, 1);
                if(this.onAxis != null)
                {
                    this.onAxis(this.keyboardPos);
                }
                break;
            case this.enterKey:
                if(this.onEnterPressed != null)
                    this.onEnterPressed();
                break;
            case this.escapeKey:
                if(this.onActivatePressed != null)
                    this.onActivatePressed();
                break;
        }
    },

    onKeyUp(e)
    {
        switch(e.code)
        {
            case this.enterKey:
                if(this.onEnterReleased != null)
                    this.onEnterReleased();
                break;
            case this.escapeKey:
                if(this.onActivateReleased != null)
                    this.onActivateReleased();
                break;
        }
    },

    setPlayerPos(playerPos)
    {
        this.playerPos = playerPos;
    },

    update(deltaTime){
            if(this.onPlayerMove != null)
            {
                if(!this.isController)
                    this.targetAngle = this.getAngle(this.keyboardPos);

                if(this.targetAngle != this.getAngle(this.playerPos))
                {
                    dir = deltaAngle(this.targetAngle, this.getAngle(this.playerPos));
                    if(dir > -this.slowdownAngle && dir < this.slowdownAngle)
                        this.onPlayerMove(dir/ this.slowdownAngle);
                    else
                        this.onPlayerMove(Math.sign(dir));
                }
            }
    },

    getPlayerDirection(vector)
    {
        angle = Math.atan2(vector.x, vector.y);
        angle = toDegrees(angle);
        playerAngle = Math.atan2(this.playerPos.x, this.playerPos.y);
        return Math.sign(deltaAngle(angle, playerAngle));
    },
    
    getPlayerAngleDifference(vector)
    {
        angle = Math.atan2(vector.x, vector.y);
        angle = toDegrees(angle);
        playerAngle = Math.atan2(this.playerPos.x, this.playerPos.y);
        return deltaAngle(angle, playerAngle);
    },
    
    getAngle(vector)
    {
        angle = Math.atan2(vector.x, vector.y);
        angle = toDegrees(angle);
        return angle;
    }
}