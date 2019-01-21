
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
        switch (animation_status._name) {
            case CONFIG.hero_animation_name.normal_attck:
                this._animation.play(CONFIG.hero_animation_name.idle);
                break;
            case CONFIG.hero_animation_name.normal_attck1:
                this._animation.play(CONFIG.hero_animation_name.idle);
                break;
            default:
                break;
        }
    },

    pub_get_animation() {
        return this._animation;
    }
});
