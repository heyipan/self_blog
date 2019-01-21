import { POSS_CURRENT } from './action';

const initState = {
    current:0,
    test:1,
};

export default function possRs (state = initState , action ){
    switch(action.type){
        case POSS_CURRENT:
            return {...state,...action.poss};
        default :
            return state;
    }
};