function Planet(players) {
    this.players = players;
    this.angle = 0;
    this.ufos = [];
    
    this.listenToPlayers(players);
    
    this.createScenery();
    this.createBeamers();
    this.createCrystals();
    this.calculateInteractionRadius();
    
    this.tony = Math.cos(Math.PI / 4) * this.RADIUS;
}

Planet.prototype = {
    COLOR_PLANET: "#769584",
    COLOR_PLANET_HIGHLIGHT: "#dae4d0",
    COLOR_PLANET_LINES: "#afc0b5",
    RADIUS: 50,
    RADIUS_ORBIT: 100,
    RADIUS_INCOMING: 400,
    ROTATION_SPEED: 0.1,
    SCENERY_AMOUNT: 40,
    BEAMER_COUNT: 6,
    ATMOSPHERE_SIZE_MODIFIER: 1.35,
    ATMOSPHERE_COLOR: "rgba(89,133,221,0.3)",
    DIR_DAY: Math.PI * 0.25,
    INTERACTION_DISTANCE: 16,
    CRYSTAL_COUNT: 12,
    
    update(timeStep) {
        this.angle += this.ROTATION_SPEED * timeStep;
        
        if(this.angle > Math.PI * 2)
            this.angle -= Math.PI * 2;
        
        this.checkUfos();
        
        for(var i = 0; i < this.ufos.length; ++i)
            this.ufos[i].update(timeStep);
        
        for(var i = 0; i < this.crystals.length; ++i) {
            const crystal = this.crystals[i];
            
            crystal.setDay(this.getDay(crystal.position));
            crystal.update(timeStep);
        }
        
        for(var i = 0; i < this.players.length; ++i) {
            const player = this.players[i];
            
            player.setDay(this.getDay(player.position));
            player.update(timeStep);
        }
        
        for(var i = 0; i < this.scenery.length; ++i) {
            const obj = this.scenery[i];
            obj.setDay(this.getDay(obj.position));
        }

        for(var i = 0; i < this.beamers.length; ++i) {
            const beamer = this.beamers[i];
            
            beamer.setDay(this.getDay(beamer.position));
            beamer.update(timeStep);
        }
    },
    
    render(context) {
        this.renderAtmosphere(context);

        context.imageSmoothingEnabled = false;
        
        context.save();
        context.rotate(this.angle);
        
        context.fillStyle = this.COLOR_PLANET;
        
        context.beginPath();
        context.arc(0, 0, this.RADIUS, 0, Math.PI * 2);
        context.fill();
        
        context.restore();

        this.renderHighlight(context);
        
        context.save();
        context.rotate(this.angle);        

        for(var i = 0; i < this.scenery.length; ++i)
            this.scenery[i].render(context);
        
        for(var i = 0; i < this.beamers.length; ++i)
            this.beamers[i].render(context);
        
        for(var i = 0; i < this.crystals.length; ++i)
            this.crystals[i].render(context);
        
        for(var i = 0; i < this.players.length; ++i)
            this.players[i].render(context);
        
        for(var i = this.ufos.length; i-- > 0;)
            this.ufos[i].render(context);
        
        context.restore();
    },
    
    getDay(vector) {
        return vector.dot(Vector.prototype.fromAngle(this.DIR_DAY - this.angle)) < 0;
    },
    
    getBeams() {
        var beams = [];
        
        for(var i = 0; i < this.beamers.length; ++i)
            for(var j = 0; j < this.beamers[i].beams.length; ++j)
                beams.push(this.beamers[i].beams[j]);
        
        return beams;
    },
    
    checkUfos() {
        const beams = this.getBeams();
        
        for(var i = 0; i < this.ufos.length; ++i) {
            const ufo = this.ufos[i];
            
            if(ufo.finished)
                continue;
            
            const hitBeams = ufo.findBeams(beams);
            
            if(ufo.match(hitBeams, this.getDay.bind(this)))
                ufo.leave();
        }
    },
    
    calculateInteractionRadius() {
        this.interactionRadius = this.INTERACTION_DISTANCE / this.RADIUS;
    },
    
    listenToPlayers(players) {
        for(var i = 0; i < players.length; ++i) {
            const player = players[i];
            
            player.onTryEnter = this.tryEnter.bind(this);
            player.onTryPickup = this.tryPickup.bind(this);
            player.onTryDrop = this.tryDrop.bind(this);
            player.planet = this;
        }
    },
    
    tryEnter(player) {
        const playerPositionNormalized = player.position.normalize();
        
        for(var i = 0; i < this.beamers.length; ++i) {
            const beamer = this.beamers[i];
            
            if(Math.acos(beamer.positionNormalized.dot(playerPositionNormalized)) < this.interactionRadius) {
                player.enterBeamer(beamer, this);
                
                break;
            }
        }
    },
    
    tryPickup(player) {
        var nearestCrystal = this.findNearestCrystal(player.position);
        
        if(nearestCrystal != null) {
            player.pickup(nearestCrystal);
            this.crystals.splice(this.crystals.indexOf(nearestCrystal), 1);
        }
        else {
            const beamer = this.findNearestBeamer(player.position);
            
            if(beamer != null && beamer.crystal != null) {
                player.pickup(beamer.crystal);
                beamer.dropCrystal();
            }
        }
    },
    
    tryDrop(player) {
        const beamer = this.findNearestBeamer(player.position);
        
        if(beamer == null)
            this.crystals.push(player.crystal);
        else
            beamer.putCrystal(player.crystal, this);
        
        player.drop();
    },
    
    findNearestCrystal(vector) {
        const normalized = vector.normalize();
        var crystalAngle = 1;
        var nearestCrystal = null;
        
        for(var i = 0; i < this.crystals.length; ++i) {
            const crystal = this.crystals[i];
            const angle = Math.acos(crystal.position.normalize().dot(normalized));
            
            if(angle < this.interactionRadius && angle < crystalAngle) {
                crystalAngle = angle;
                nearestCrystal = crystal;
            }
        }
        
        return nearestCrystal;
    },
    
    findNearestBeamer(vector) {
        const normalized = vector.normalize();
        
        for(var i = 0; i < this.beamers.length; ++i)
            if(Math.acos(this.beamers[i].positionNormalized.dot(normalized)) < this.interactionRadius)
                return this.beamers[i];
            
        return null;
    },
    
    createScenery() {
        this.scenery = [];
        
        for(var i = 0; i < this.SCENERY_AMOUNT; ++i)
            this.scenery.push(new Scenery(Math.random() * Math.PI * 2));
    },
    
    createBeamers() {
        this.beamers = [];
        
        for(var i = 0; i < this.BEAMER_COUNT; ++i)
            this.beamers.push(new Beamer((Math.PI / 3) * i));
    },
    
    createCrystals() {
        this.crystals = [];
        
        for(var i = 0; i < this.CRYSTAL_COUNT; ++i) {
            var color;
            
            switch(i % 3) {
                case 0:
                    color = "red";
                    break;
                case 1:
                    color = "yellow";
                    break;
                case 2:
                    color = "blue";
                    break;
            }
            
            this.crystals.push(new Crystal(Math.random() * 2 * Math.PI, new CrystalEssence(color)));
        }
    },
    
    dispatch(ufoObject) {
        var colors;
        var mover;
        
        colors = [
            "red"
        ];
        mover = new UfoMoverOrbit(2, this.RADIUS_ORBIT, true);
        
        this.addUfo(new Ufo(
            colors,
            mover
        ));
    },
    
    addUfo(ufo) {
        ufo.addLeaveListener(this.removeUfo.bind(this));
        
        this.ufos.push(ufo);
    },
    
    removeUfo(ufo) {
        this.ufos.splice(this.ufos.indexOf(ufo), 1);
    },

    renderAtmosphere(context)
    {
        context.save();

        grd=context.createRadialGradient(0,0,this.RADIUS,0,0,this.RADIUS * this.ATMOSPHERE_SIZE_MODIFIER);
        grd.addColorStop(0,"#00000000");
        grd.addColorStop(1, this.ATMOSPHERE_COLOR);

        context.beginPath();
        context.fillStyle = grd;
        context.arc(0,0, this.RADIUS * this.ATMOSPHERE_SIZE_MODIFIER,
                    this.DIR_DAY + Math.PI * 0.5,
                    this.DIR_DAY - Math.PI * 0.5);
        
        context.fill();
        context.restore();
    },

    renderHighlight(context) {
        context.save();

        var grd=context.createRadialGradient(-30,-50,100,-30,-50,120);
        grd.addColorStop(0, this.COLOR_PLANET_HIGHLIGHT);
        grd.addColorStop(1,"rgba(0,0,0,0)");

        context.beginPath();
        context.fillStyle ="rgba(0,0,0,0)";
        context.arc(0,0, this.RADIUS, 0, Math.PI * 2);
        context.fill();
        context.clip();

        context.beginPath();
        context.fillStyle = this.COLOR_PLANET_HIGHLIGHT;
        context.arc(-this.tony, -this.tony, this.tony * 2, 0, Math.PI * 2);
        context.fill();

        context.restore();
    }
}