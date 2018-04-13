import {MY_ACTION,MY_SECTION_LOADED,SORT_LIST_INCREASE,SORT_LIST_DECREASE} from '../constants/actionTypes';

function compare(a,b) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

  function compareD(a,b) {
    if (a.name < b.name)
      return 1;
    if (a.name > b.name)
      return -1;
    return 0;
  }

  const initialState = {
    productList: []
  };

export default (state=initialState,action) =>{
    switch(action.type){
        case MY_ACTION:
            return{...state,mykey: action.value};
        case MY_SECTION_LOADED:
            return{...state,productList: state.productList.concat(action.payload)};
        case SORT_LIST_INCREASE:
            var temp = action.productList.sort(compare)
            console.log(state);
            return{...state,productList: state.productList.slice(0,0).concat(temp)};
        case SORT_LIST_DECREASE:
            var temp = action.productList.sort(compareD)
            console.log(state);
            return{...state,productList: state.productList.slice(0,0).concat(temp)};
        default:
        return state;
    }
}