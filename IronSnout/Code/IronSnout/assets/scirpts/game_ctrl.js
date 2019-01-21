import res_config from "res_config";

cc.Class({
    extends: cc.Component,
    properties : {
        hero: cc.Node,
        touch_node: cc.Node,


        _hero: null,
        _touch: null,
    },

    onLoad () {
        this._register_global_variable();
        this._initData();
    },

    _initData() {
        this._hero = this.hero.getComponent('player_ctrl').pub_init(this);
        this._touch = this.touch_node.getComponent('touch_ctrl').pub_init(this);
    },

    _register_global_variable() {
        window.CONFIG = res_config;
    },

    pub_tell_player_touch_type( type ) {
        this._hero.pub_change_anima_by_touch_type( type )
    }
});
