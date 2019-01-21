import { browserHistory  } from 'react-router';
import requset from '../../../../../util/requset';
import api from '../../../../../request/api'
import {Modal } from 'antd';

export const SUB_FORM = 'SUB_FORM';
export const GET_SHOP = 'GET_SHOP';
export const GET_MENU = 'GET_MENU';

const setForm = (sellerApplyForm) =>({
    type:SUB_FORM,
    data:sellerApplyForm
});

export function setFormAjax({method,data}) {
    return (dispatch) => {
        return requset(api.submit,{method:method,data:JSON.stringify(data)}).then((data) => {
            if(data.success && data.info){
                dispatch(setForm(data.info));
            }else{
                Modal.error({
                    title: '提示信息',
                    content: '222'
                });
            }
        })
    }
}
export function isNames({param,next}) {
    return (dispatch) => {
        const {method,data} = param;
        return requset(api.check,{method:method,data:JSON.stringify(data)}).then((data) => {
            if(data.success) {
                dispatch(setFormAjax(next))
            }else{
                Modal.error({
                    title: '提示信息',
                    content: '11'
                });
            }
        })
    }

}

const getShop = (shop) =>({
    type:GET_SHOP,
    data:shop
});
export function getShopAjax({method}){
    return (dispatch) => {
        return requset(api.storeTypes,{method:method}).then((data) => {
            dispatch(getShop(data.info))
        })
    }
}

const getMenu = (menuType) =>({
    type:GET_MENU,
    data:menuType
});
export function getMenuAjax({method}){
    return (dispatch) => {
       return  requset(api.mainCategoryList,{method:method}).then((data) => {
           dispatch(getMenu(data.info));
       })
    }
};

