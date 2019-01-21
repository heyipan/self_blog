import { YZ_CODE ,GET_CITY ,GET_PROVINCE ,VERFIY_CODE ,SAVE_FORM} from './action';

const initState = {
    city:{
        info:[]
    },
    province:{
        info:[]
    },
    code:{
        info:false
    },
    verfiy:{
        success:false,
        info:false
    },
    formData:{
        showModel:true
    }
};

export default function fillStoreRs(state =initState , action){

    switch (action.type){
        case YZ_CODE: {
            const oldCode = state.code;
            return {...state,code:{...oldCode,info:action.data}}
        }
        case GET_PROVINCE: {
            const oldProvince = state.province;
            return {...state,province: {...oldProvince,info:action.data} }

        }
        case GET_CITY:{
            const oldCity = state.city;
            return {...state,city: {...oldCity,...action.data} }
        }

        case VERFIY_CODE:{
            return {...state,formData: {showModel: true}}
        }
        case SAVE_FORM:
            return {...state,action}/*Object.assign({},state,action)*/;
        default :
            return state;
    }
};