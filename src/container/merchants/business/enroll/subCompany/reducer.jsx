import { SUB_FORM ,GET_SHOP ,GET_MENU} from './action';

const initState = {
    sellerApplyForm:{},
    shop:{
        info:{}
    },
    menuType:{
        info:[]
    }
};

export default function companyRs (state = initState ,action){
    switch (action.type){
        case SUB_FORM:{
            const oldSellerApplyForm = state.sellerApplyForm;
            return {...state,sellerApplyForm: {...oldSellerApplyForm,...action.data} }
        }
        case GET_SHOP:{
            const oldShop = state.shop;
            return {...state,shop: {...oldShop,info:action.data}}
        }
        case GET_MENU:{
            const oldMenuType = state.menuType;
            return {...state,menuType: {...oldMenuType,info:action.data}};
        }

        default:
            return state;
    }
};
