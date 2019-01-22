
cc.Class({
    extends: cc.Component,

    properties: {
        _ctrl: null,
        _start_touch_position: null,
        _touch_move_once_flag: false,
    },

    pub_init(ctrl) {
        this._initData(ctrl);
        this._bindTouchEvent();
        return this;
    },

    _initData(ctrl) {
        this._ctrl = ctrl;
    },

    _bindTouchEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, this._touch_start_event, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touch_move_event, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._touch_end_event, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touch_cancle_event, this);
    },

    _touch_start_event(e) {
        let pos = e.getLocation();
        this._start_touch_position = pos;
    },

    _touch_move_event(e) {
        if(this._touch_move_once_flag) return;

        let touch_type_ = CONFIG.touch_type.none;
        this._touch_move_once_flag = true;
        let pos = e.getLocation();
        let dt_y_val = pos.y - this._start_touch_position.y;

        touch_type_ = dt_y_val > 0 ? CONFIG.touch_type.slider_up : dt_y_val == 0 ? (pos.x <= 640 ? CONFIG.touch_type.left_point : touch_type_ = CONFIG.touch_type.right_point) : CONFIG.touch_type.slider_down;

        this._ctrl.pub_tell_player_touch_type(touch_type_);
    },

    _touch_end_event(e) {
        this._touch_move_once_flag = false;
    },

    _touch_cancle_event(e) {
        this._touch_move_once_flag = false;
    }
});
