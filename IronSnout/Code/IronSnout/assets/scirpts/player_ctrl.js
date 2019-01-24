let _role_style = {
    vacate: 1,
    stand: 0,
    duck: -1,
}

cc.Class({
    extends: cc.Component,

    properties: {
        _enemity: cc.Node,
        _role_style: 0,
        _is_double_jump_flag: false,
        _init_pos_y: 0,
        _is_need_duck_attack: false,
    },

    pub_init() {
        this._init_pos_y = this.node.y;
        this._enemity = this.node.getChildByName('enemity').getComponent('enemity_animation_status').pub_init(this);
        this._play_animation_by_name(CONFIG.hero_animation_name.idle);
        return this;
    },
    
    _play_animation_by_name(name) {
        return this._enemity.pub_get_animation().play(name);
    },

    _play_small_jump_effect() {
        let anima_status = this._play_animation_by_name(CONFIG.hero_animation_name.duck_2_normal);
        let total_animation_time = anima_status.duration / anima_status.speed;
        this.node.runAction(cc.sequence(cc.moveBy(total_animation_time,cc.v2(0,CONFIG.hero_action_effect.small_jump.height)),cc.callFunc(()=>{
            // play down animation
            this._play_animation_by_name(CONFIG.hero_animation_name.down);
        }),cc.moveBy(total_animation_time,cc.v2(0,-CONFIG.hero_action_effect.small_jump.height)), cc.callFunc(() => {
            console.log('small jump finfish');
            this._role_style = _role_style.stand;
        })));
    },

    _play_jump_effect() {
        let anima_status = this._play_animation_by_name(CONFIG.hero_animation_name.jump_attack);
        let total_animation_time = anima_status.duration / anima_status.speed;
        this.node.runAction(cc.sequence(cc.moveBy(total_animation_time * 1.5,cc.v2(0,CONFIG.hero_action_effect.jump_attack.height)),cc.callFunc(()=>{
            // play down animation
            this._play_animation_by_name(CONFIG.hero_animation_name.down);
        }),cc.moveBy(total_animation_time * 1.7, cc.v2(0,-CONFIG.hero_action_effect.jump_attack.height)), cc.callFunc(() => {
            console.log('jump finfish');
            this._is_double_jump_flag = false;
            this._role_style = _role_style.stand;
        })));
    },

    _play_d_jump_effect() {
        if(this._role_style == _role_style.vacate) this.node.stopAllActions();
        let anima_status = this._play_animation_by_name(CONFIG.hero_animation_name.d_jump_attack);
        let total_animation_time = anima_status.duration / anima_status.speed;
        this.node.runAction(cc.rotateBy(total_animation_time * 1, this.node.scaleX > 0 ? -360 : 360));

        this.node.runAction(cc.sequence(cc.moveBy(total_animation_time * 1.2 ,cc.v2(0,CONFIG.hero_action_effect.d_jump_attack.height)).easing(cc.easeCubicActionOut()), cc.callFunc(()=>{
            // play down animation
            this._play_animation_by_name(CONFIG.hero_animation_name.down);
        }), cc.moveTo(total_animation_time * 1.7, cc.v2(0, this._init_pos_y)).easing(cc.easeCubicActionIn()), cc.callFunc(() => {
            console.log('double jump finfish');
            this._role_style = _role_style.stand;
            this._is_double_jump_flag = false;
        })));
    },

    _deal_left_attack(type) {
        if(this._role_style == _role_style.vacate) return;
        this.node.scaleX = -1;
        
        if(this._role_style == _role_style.duck) {
            this._play_small_jump_effect();
        } else if(this._role_style == _role_style.stand) {
            this._play_animation_by_name(CONFIG.hero_animation_name.normal_attack1);
        }
        this._role_style = _role_style.stand;
    },

    _deal_right_attack(type) {
        if(this._role_style == _role_style.vacate) return;
        this.node.scaleX = 1;
        
        if(this._role_style == _role_style.duck) {
            this._play_small_jump_effect();
        } else if(this._role_style == _role_style.stand) {
            this._play_animation_by_name(CONFIG.hero_animation_name.normal_attack);
        }
        this._role_style = _role_style.stand;
    },

    _deal_up_attack(type) {
        if(this._is_double_jump_flag) return;
        if(this._role_style == _role_style.duck) {
            // deal duck => stand
            this._play_small_jump_effect();
        } else if(this._role_style == _role_style.vacate) {
            // double jump
            this._is_double_jump_flag = true;
            this._play_d_jump_effect();
        } else if(this._role_style == _role_style.stand) {
            // jump
            this._play_jump_effect();
        }
        this._role_style = _role_style.vacate;
    },

    _deal_down_attack(type) {
        if((this._role_style == _role_style.stand || this._role_style == _role_style.vacate) && !this._is_need_duck_attack) {
            this._play_animation_by_name(CONFIG.hero_animation_name.duck_attack1);
            this._is_need_duck_attack = true;
        } else if(this._is_need_duck_attack || this._role_style == _role_style.duck) {
            this._play_animation_by_name(CONFIG.hero_animation_name.duck_attack2);
            this._is_need_duck_attack = false;
        }
        this._role_style = _role_style.duck;
    },

    pub_change_anima_by_touch_type(type) {
        switch (type) {
            case CONFIG.touch_type.left_point:
                this._deal_left_attack(type);
                break;
            case CONFIG.touch_type.right_point:
                this._deal_right_attack(type);
                break;
            case CONFIG.touch_type.slider_up:
                this._deal_up_attack(type);
                break;
            case CONFIG.touch_type.slider_down:
                this._deal_down_attack(type);
                break;
            case CONFIG.touch_type.slider_up_right:
                this.node.scaleX = 1;
                this._deal_up_attack(CONFIG.touch_type.slider_up);
                break;
            case CONFIG.touch_type.slider_up_left:
                this.node.scaleX = -1;
                this._deal_up_attack(CONFIG.touch_type.slider_up);
                break;
            case CONFIG.touch_type.slider_down_right:
                this.node.scaleX = 1;
                this._deal_down_attack(CONFIG.touch_type.slider_down);
                break;
            case CONFIG.touch_type.slider_down_left:
                this.node.scaleX = -1;
                this._deal_down_attack(CONFIG.touch_type.slider_down);
                break;
            default:
                break;
        }
    },
});
