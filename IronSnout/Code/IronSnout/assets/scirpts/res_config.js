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
        duck_idle: 'duck',
        duck_attack1: 'duck_attack1',
        duck_attack2: 'duck_attack2',
    },

    touch_type: {
        none : '-1',
        left_point : '1',
        right_point : '2',
        slider_up : '3',
        slider_down : '4'
    }
};

module.exports = res_config;
