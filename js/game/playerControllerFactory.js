function playerControllerFactory(gamepad) {
    this.gamepad = gamepad;
    this.availableKeyboardSchemes = this.keyboardSchemes;
    
    gamepad.on('connect', e => {
        if(!this.availableControllerIds.includes(e.index))
        {
            this.availableControllerIds.push(e.index);
        }
    });
}

playerControllerFactory.prototype = {
    keyboardSchemes:[
        {
            leftKey: "KeyA",
            rightKey: "KeyD",
            enterKey: "KeyE",
            escapeKey: "KeyQ"
        },
        {
            leftKey: "ArrowLeft",
            rightKey: "ArrowRight",
            enterKey: "Delete",
            escapeKey: "PageDown"
        },
        {
            leftKey: "KeyJ",
            rightKey: "KeyL",
            enterKey: "KeyO",
            escapeKey: "KeyU"
        }
    ],
    availableKeyboardSchemes:null,
    availableControllerIds:[],
    gamepad:null,

    getPlayerKeyboardController()
    {
        if(this.availableKeyboardSchemes.length > 0)
        {
            var scheme = this.availableKeyboardSchemes[0];
            this.availableKeyboardSchemes.splice(0,1);

            var playerController = new PlayerController;
            playerController.leftKey = scheme.leftKey;
            playerController.rightKey = scheme.rightKey;
            playerController.enterKey = scheme.enterKey;
            playerController.escapeKey = scheme.escapeKey;

            return playerController;
        }
        return null;
    },

    getPlayerControllerController()
    {
        if(this.availableControllerIds.length > 0)
        {
            var id = this.availableControllerIds[0];
            this.availableControllerIds.splice(0,1);
            return new PlayerController(id);
        }
        return null;
    },
    getPlayerControllerController(id)
    {
        var index = this.availableControllerIds.indexOf(id);
        if(index != -1)
        {
            this.availableControllerIds.splice(index,1);
            return new PlayerController(this.gamepad, id);
        }
        return null;
    },
    releaseControllerId(id)
    {
        if(!this.availableControllerIds.includes(id))
            this.availableControllerIds.push(id);
    }
}