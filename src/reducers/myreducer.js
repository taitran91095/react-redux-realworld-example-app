import {MY_ACTION,MY_SECTION_LOADED} from '../constants/actionTypes';

export default (state={},action) =>{
    switch(action.type){
        case MY_ACTION:
            console.log(action);
            console.log(state);
            return{...state,mykey: action.value};
        case MY_SECTION_LOADED:
            console.log(action);
            console.log(state);
        return{...state,productList: action.payload};
        default:
        return state;
    }
}