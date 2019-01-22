
cc.Class({
    extends: cc.Component,

    properties: {
        _enemity: cc.Node,
        _duck_attack_type: 0,
    },

    pub_init() {
        this._enemity = this.node.getChildByName('enemity').getComponent('enemity_animation_status').pub_init(this);
        this._play_animation_by_name(CONFIG.hero_animation_name.idle);
        return this;
    },
    
    _play_animation_by_name(name) {
        this._enemity.pub_get_animation().play(name);
    },

    pub_change_anima_by_touch_type(type) {
        switch (type) {
            case CONFIG.touch_type.left_point:
                this._duck_attack_type = 0;
                this.node.scaleX = -1;
                this._play_animation_by_name(CONFIG.hero_animation_name.normal_attack1);
                break;
            case CONFIG.touch_type.right_point:
                this._duck_attack_type = 0;
                this.node.scaleX = 1;
                this._play_animation_by_name(CONFIG.hero_animation_name.normal_attack);
                break;
            case CONFIG.touch_type.slider_up:
                
                break;
            case CONFIG.touch_type.slider_down:
                if(!this._duck_attack_type) {
                    
                    this._play_animation_by_name(CONFIG.hero_animation_name.duck_attack1);
                } else if(this._duck_attack_type) {
                    this._play_animation_by_name(CONFIG.hero_animation_name.duck_attack2);
                }
                this._duck_attack_type = !this._duck_attack_type;
                break;
            default:
                break;
        }
    },
});
