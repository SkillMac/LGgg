
cc.Class({
    extends: cc.Component,

    properties: {
       _player_ctrl: null,
       _animation: cc.Animation,
    },

    pub_init(player_ctrl) {
        this._animation = this.node.getComponent(cc.Animation);
        this._player_ctrl = player_ctrl;
        this._bind_animation_event();
        return this;
    },

    _bind_animation_event() {
        this._animation.on('finished', this._on_last_frame, this);
    },

    _on_last_frame(action_name, animation_status) {
        let anima_name = animation_status._name;
        // LOG.log(anima_name);
        if(
            anima_name == CONFIG.hero_animation_name.normal_attack  ||
            anima_name == CONFIG.hero_animation_name.normal_attack1 ||
            anima_name == CONFIG.hero_animation_name.duck_2_normal  ||
            anima_name == CONFIG.hero_animation_name.jump_attack    ||
            anima_name == CONFIG.hero_animation_name.d_jump_attack  ||
            anima_name == CONFIG.hero_animation_name.down
            ) {
            // play idle animation
            this._animation.play(CONFIG.hero_animation_name.idle);
        } else if (
            anima_name == CONFIG.hero_animation_name.duck_attack1 ||
            anima_name == CONFIG.hero_animation_name.duck_attack2
            ) {
            
            // play dank animation
            this._animation.play(CONFIG.hero_animation_name.duck_idle);
        }
    },

    pub_get_animation() {
        return this._animation;
    }
});
