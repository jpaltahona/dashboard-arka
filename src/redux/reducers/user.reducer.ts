import {USERDATA} from '../types';

const INITIAL_STATE = {};

const userReducer = (state = INITIAL_STATE, action:any) => {
    switch(action.type) {
        case USERDATA :
            return  action.payload;
        default: return state
    }
};

export default userReducer;