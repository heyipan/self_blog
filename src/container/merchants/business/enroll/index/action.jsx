export const POSS_CURRENT = 'POSS_CURRENT';

export const getCurrent = ({current,test}) =>({
    type:POSS_CURRENT,
    poss:{
        current,
        test
    }
});

