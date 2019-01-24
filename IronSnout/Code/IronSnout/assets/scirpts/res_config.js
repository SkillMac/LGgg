let res_config = {
    role_res: {
        'jump_attack': '',
        'double_jump_attack': '',
        'right_left_jump_attack': '',
        'normal_attack': '',
        'duck': '', 
        'duck_attack1': '', // top to down
        'duck_attack2': '', // duck attck
    },

    hero_animation_name: {
        normal_attack: 'normal_attack',
        normal_attack1: 'normal_attack1',
        idle: 'idle',
        jump_attack: 'jump_attack',
        d_jump_attack: 'd_jump_attack',
        duck_idle: 'duck',
        duck_attack1: 'duck_attack1', // stand to duck
        duck_attack2: 'duck_attack2',
        duck_2_normal: 'duck_2_normal',
        down: 'down',
    },

    hero_action_effect: {
        // small jump
        small_jump: {
            height: 30,
        },

        jump_attack: {
            height : 160,
        },

        d_jump_attack: {
            height : 100,
        }
    },

    touch_type: {
        none : '-1',
        left_point : '1',
        right_point : '2',
        slider_up : '3',
        slider_down : '4',
        slider_up_right: '5',
        slider_up_left: '6',
        slider_down_right: '7',
        slider_down_left: '8',
    },
};

module.exports = res_config;
