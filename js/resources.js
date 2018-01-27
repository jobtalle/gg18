function Resources() {
    this.load();
}

Resources.prototype = {
    load() {
        this.ufo_booster_2 = new Sprite("img/ufo/ufo_booster_2.png", 11, 6, 1);
        this.ufo_booster_3 = new Sprite("img/ufo/ufo_booster_3.png", 11, 6, 1);
        this.ufo_constant_2 = new Sprite("img/ufo/ufo_constant_2.png", 11, 6, 1);
        this.ufo_constant_3 = new Sprite("img/ufo/ufo_constant_3.png", 11, 6, 1);
        this.ufo_half_2 = new Sprite("img/ufo/ufo_half_2.png", 11, 6, 1);
        this.ufo_half_3 = new Sprite("img/ufo/ufo_half_3.png", 11, 6, 1);
        this.ufo_lander_2 = new Sprite("img/ufo/ufo_lander_2.png", 11, 6, 1);
        this.ufo_lander_3 = new Sprite("img/ufo/ufo_lander_3.png", 11, 6, 1);
        this.ufo_mother = new Sprite("img/ufo/ufo_mother.png", 11, 6, 1);

        this.ufo_booster_engine = new Sprite("img/ufo/ufo_booster_engine.png", 11,6,5, 10);
        this.ufo_constant_engine = new Sprite("img/ufo/ufo_constant_engine.png", 13,-3,5, 10);
        this.ufo_half_engine_left = new Sprite("img/ufo/ufo_half_engine_left.png", 11,6,5, 10);
        this.ufo_half_engine_right = new Sprite("img/ufo/ufo_half_engine_right.png", 11,6,5, 10);
        this.ufo_lander_engine = new Sprite("img/ufo/ufo_lander_engine.png", 11,6,5, 10);
        this.ufo_mother_engine = new Sprite("img/ufo/ufo_mother_engine.png", 11,6,5, 10);

        this.ufo_light = new Sprite("img/ufo/ufo_light.png", 0,0,1);
        this.ufo_light_blue = new Sprite("img/ufo/ufo_light_blue.png", 0,0,1);
        this.ufo_light_green = new Sprite("img/ufo/ufo_light_green.png", 0,0,1);
        this.ufo_light_orange= new Sprite("img/ufo/ufo_light_orange.png", 0,0,1);
        this.ufo_light_purple= new Sprite("img/ufo/ufo_light_purple.png", 0,0,1);
        this.ufo_light_red= new Sprite("img/ufo/ufo_light_red.png", 0,0,1);
        this.ufo_light_yellow= new Sprite("img/ufo/ufo_light_yellow.png", 0,0,1);
        this.ufo_light_mother = new Sprite("img/ufo/ufo_light_mother.png", 0,0,1);
        this.ufo_light_mother_blue = new Sprite("img/ufo/ufo_light_mother_blue.png", 0,0,1);
        this.ufo_light_mother_green = new Sprite("img/ufo/ufo_light_mother_green.png", 0,0,1);
        this.ufo_light_mother_orange= new Sprite("img/ufo/ufo_light_mother_orange.png", 0,0,1);
        this.ufo_light_mother_purple= new Sprite("img/ufo/ufo_light_mother_purple.png", 0,0,1);
        this.ufo_light_mother_red= new Sprite("img/ufo/ufo_light_mother_red.png", 0,0,1);
        this.ufo_light_mother_yellow= new Sprite("img/ufo/ufo_light_mother_yellow.png", 0,0,1);
        
        this.base_1_idle = new Sprite("img/character/base_1_idle.png", 3,10,3, 10);
        this.base_1_idle_arms = new Sprite("img/character/base_1_idle_arms.png", 3,10,3, 10);
        this.base_1_running = new Sprite("img/character/base_1_running.png", 3,10,4, 10);
        this.base_1_running_arms = new Sprite("img/character/base_1_running_arms.png", 3,10,4, 10);
        this.base_1_shooting = new Sprite("img/character/base_1_shooting.png", 3,10,3, 10);
        
        this.biemer_base = new Sprite("img/biemer/biemer_base.png", 2.5,9,1);
        this.biemer_blue = new Sprite("img/biemer/biemer_blue.png", 7.5,6,1);
        this.biemer_empty = new Sprite("img/biemer/biemer_empty.png", 7.5,6,1);
        this.biemer_green = new Sprite("img/biemer/biemer_green.png", 7.5,6,1);
        this.biemer_orange = new Sprite("img/biemer/biemer_orange.png", 7.5,6,1);
        this.biemer_purple = new Sprite("img/biemer/biemer_purple.png", 7.5,6,1);
        this.biemer_red = new Sprite("img/biemer/biemer_red.png", 7.5,6,1);
        this.biemer_yellow = new Sprite("img/biemer/biemer_yellow.png", 7.5,6,1);
        this.biemer_spark = new Sprite("img/biemer/biemer_spark.png", 6.5, 11,11,20);
        
        this.portraits_idle = new Sprite("img/portrait/portraits_idle.png", 0,0,3, 6.667);
        this.portraits_idle_arms = new Sprite("img/portrait/portraits_idle_arms.png", 0,0,3, 6.667);
        this.portraits_running = new Sprite("img/portrait/portraits_running.png", 0,0,4, 6.667);
        this.portraits_running_arms = new Sprite("img/portrait/portraits_running_arms.png", 0,0,4, 6.667);
        this.portraits_shooting = new Sprite("img/portrait/portraits_shooting.png", 0,0,3, 6.667);

        this.alien = new Sprite("img/alien.png", 0,0,1);

        this.gems_blue = new Sprite("img/gems/gems_blue.png", 3,6,1);
        this.gems_green = new Sprite("img/gems/gems_green.png", 3,6,1);
        this.gems_orange = new Sprite("img/gems/gems_orange.png", 3,6,1);
        this.gems_purple = new Sprite("img/gems/gems_purple.png", 3,6,1);
        this.gems_red = new Sprite("img/gems/gems_red.png", 3,6,1);
        this.gems_yellow = new Sprite("img/gems/gems_yellow.png", 3,6,1);

        this.heart =  new Sprite("img/particles/heart.png", 0,0,5, 10);
        this.mad =  new Sprite("img/particles/mad.png", 0,0,5, 10);

        this.building_1 = new Sprite("img/environment/building_1.png",2,10,2,1);
        this.building_2 = new Sprite("img/environment/building_2.png",3,12,2,1);
        this.building_3 = new Sprite("img/environment/building_3.png",3,15,2,1);
        this.building_4 = new Sprite("img/environment/building_4.png",3,7,2,1);
        this.building_5 = new Sprite("img/environment/building_5.png",5,14,2,1);
        this.building_6 = new Sprite("img/environment/building_6.png",2,6,2,1);
        
        this.bush = new Sprite("img/environment/bush.png",4,4,2,1);
        this.oak = new Sprite("img/environment/oak.png",4,10,2,1);
        this.pine = new Sprite("img/environment/pine.png",4,10,2,1);
        
        
    }
}