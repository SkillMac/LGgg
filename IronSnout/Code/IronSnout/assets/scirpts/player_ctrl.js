

cc.Class({
    extends: cc.Component,

    properties: {
        _enemity: cc.Node,
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
                this.node.scaleX = -1;
                this._play_animation_by_name(CONFIG.hero_animation_name.normal_attck1);
                break;
            case CONFIG.touch_type.right_point:
                this.node.scaleX = 1;
                this._play_animation_by_name(CONFIG.hero_animation_name.normal_attck);
                break;
            case CONFIG.touch_type.slider_up:
                
                break;
            case CONFIG.touch_type.slider_down:
                
                break;
            default:
                break;
        }
    },
});
