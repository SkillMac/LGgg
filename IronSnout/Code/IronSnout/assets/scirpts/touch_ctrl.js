
cc.Class({
    extends: cc.Component,

    properties: {
        _ctrl: null,
        _start_touch_position: null,
        _current_touch_type: null,
    },

    pub_init(ctrl) {
        this._init_data(ctrl);
        this._bind_touch_event();
        return this;
    },

    _init_data(ctrl) {
        this._ctrl = ctrl;
        this._current_touch_type = CONFIG.touch_type.none;
    },

    _bind_touch_event() {
        if(cc.sys.isBrowser) {
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this._on_key_down, this);
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this._on_key_up, this);
        }
        else if(cc.sys.platform == cc.sys.WECHAT_GAME) {
            this.node.on(cc.Node.EventType.TOUCH_START, this._touch_start_event, this);
            this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touch_move_event, this);
            this.node.on(cc.Node.EventType.TOUCH_END, this._touch_end_event, this);
            this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touch_cancle_event, this);
        }
        
    },

    _on_key_down: function (event) {
        let touch_type_ = CONFIG.touch_type.none;

        switch(event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                touch_type_ = CONFIG.touch_type.left_point;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                touch_type_ = CONFIG.touch_type.right_point;
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                touch_type_ = CONFIG.touch_type.slider_up;
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                touch_type_ = CONFIG.touch_type.slider_down;
                break;
        }
        this._ctrl.pub_tell_player_touch_type(touch_type_);
    },

    _on_key_up: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                break;
        }
    },

    _delay_response_touch() {
        LOG.log('操作类型 => ', CONFIG.touch_type_msg[this._current_touch_type]);
        this._ctrl.pub_tell_player_touch_type(this._current_touch_type);
    },

    _touch_start_event(e) {
        let pos = e.getLocation();
        this._start_touch_position = pos;

        let touch_type_ = pos.x <= 640 ? CONFIG.touch_type.left_point : CONFIG.touch_type.right_point;
        this._current_touch_type = touch_type_;

        this.node.stopAllActions();
        this.node.runAction(cc.sequence(cc.delayTime(0.05),cc.callFunc(this._delay_response_touch,this)));
    },

    _touch_move_event(e) {
        let touch_type_ = CONFIG.touch_type.none;
        let pos = e.getLocation();
        let dt_y_val = pos.y - this._start_touch_position.y;

        if(dt_y_val > 5) {
            if(pos.x <= 640) {
                touch_type_ = CONFIG.touch_type.slider_up_left;
            } else {
                touch_type_ = CONFIG.touch_type.slider_up_right;
            }
        } else if(dt_y_val < -5) {
            if(pos.x <= 640) {
                touch_type_ = CONFIG.touch_type.slider_down_left;
            } else {
                touch_type_ = CONFIG.touch_type.slider_down_right;
            }
        } else {
            if(pos.x <= 640) {
                touch_type_ = CONFIG.touch_type.left_point;
            } else {
                touch_type_ = CONFIG.touch_type.right_point;
            }
        }
        this._current_touch_type = touch_type_;
    },

    _touch_end_event(e) {
    },

    _touch_cancle_event(e) {
    }
});
