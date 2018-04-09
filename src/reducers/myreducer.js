import {MY_ACTION} from '../constants/actionTypes';

export default (state={},action) =>{
    switch(action.type){
        case MY_ACTION:
        console.log(action);
        console.log(state);
        return{...state,mykey: action.value};
        default:
        return state;
    }
}