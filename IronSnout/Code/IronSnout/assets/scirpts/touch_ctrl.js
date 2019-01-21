
cc.Class({
    extends: cc.Component,

    properties: {
        _ctrl: null,
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
        let touch_type_ = CONFIG.touch_type.none;
        if(pos.x <= 640) {
            touch_type_ = CONFIG.touch_type.left_point;
        } else if(pos.x > 640) {
            touch_type_ = CONFIG.touch_type.right_point;
        };
        this._ctrl.pub_tell_player_touch_type(touch_type_);
    },

    _touch_move_event(e) {
        
    },

    _touch_end_event(e) {
        
    },

    _touch_cancle_event(e) {
        
    }
});
