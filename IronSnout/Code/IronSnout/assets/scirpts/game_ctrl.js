import res_config from "res_config";

cc.Class({
    extends: cc.Component,
    properties : {
        hero: cc.Node,
        touch_node: cc.Node,
        log: cc.Label,

        _hero: null,
        _touch: null,
    },

    onLoad () {
        this._register_global_variable();
        this._init_data();
        this._init_log();
    },

    _init_data() {
        this._hero = this.hero.getComponent('player_ctrl').pub_init(this);
        this._touch = this.touch_node.getComponent('touch_ctrl').pub_init(this);
    },

    _register_global_variable() {
        window.CONFIG = res_config;
        window.LOG = this.log;
    },

    _init_log() {
        window.LOG.log = function () {
            window.LOG.string = [...arguments].join('');
        }
    },

    pub_tell_player_touch_type( type ) {
        this._hero.pub_change_anima_by_touch_type( type )
    }
});
