import { browserHistory  } from 'react-router';
import request from '../../../../../util/requset';
import api from '../../../../../request/api'
import { showLoad , hideLoad } from '../../../public/loading/action';
import {Modal } from 'antd';
import $ from 'jquery'

import history from '../../../../../util/history';

export const YZ_CODE = 'YZ_CODE';
export const GET_CITY = 'GET_CITY';
export const GET_PROVINCE = 'GET_PROVINCE';
export const VERFIY_CODE = 'VERFIY_CODE';
export const SAVE_FORM = 'SAVE_FORM';

export const saveForm = (formData) =>({
    type:SAVE_FORM,
    formData
});

const getCode = (code) =>({
    type:YZ_CODE,
    data:code
});
export function codeAjax({method,data}){
    return (dispatch) => {
        request(api.sendVerifyCode,{
            method: method,
            headers: {'Content-Type': 'application/json'},
            data:JSON.stringify(data)}
            ).then((data) =>{
            dispatch(getCode(data));
            if(data.success && data.info){
                Modal.success({
                    title: '提示信息',
                    content: '验证码发送成功，请注意查收！'
                });
            }else{
                Modal.error({
                    title: '提示信息',
                    content: data.errorMessage
                });
            }
        })
    }
}

const verfiyCode = (verfiy) => ({
    type:VERFIY_CODE,
    data:verfiy
});

export function verfiyCodeAjax({method,phone,verifyCode}){
    return (dispatch) => {
        dispatch(showLoad())/*开始加载*/
        const data = {phone,verifyCode}
        return request(api.checkVerifyCode,{
            method: method,
            headers: {'Content-Type': 'application/json'},
            data:JSON.stringify(data)
        }).then((data)=>{
            if(!data.success && data.info){
                Modal.error({
                    title: '提示信息',
                    content: data.errorMessage
                });
            }else{
                if(data.success && data.info){
                    dispatch(verfiyCode(data));
                    dispatch(hideLoad())/*结束加载*/
                }
            }

        })


    }
}

const getProvince = (province) =>({
    type:GET_PROVINCE,
    data:province
});
export function getProvinceAjax({method}) {
    return (dispatch) => {
        dispatch(showLoad());
        /*$.get(url,function (data) {
            console.log(data)
        })*/
        /*request(url).then((data) => {
            console.log(11+'',data)
        })*/
        request(api.getProvinceList,{method:method}).then((data) => {
            dispatch(getProvince(data.info));
        })
        dispatch(hideLoad())
    }
}

const getCity = (city) =>({
    type:GET_CITY,
    data:city
});
export function getCityAjax({method,data}){

    return (dispatch) => {
        dispatch(showLoad());
        request(api.getCityList,
            {
                method:method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            .then((data) => {
                dispatch(getCity(data));
            });
        dispatch(hideLoad())
    }

};


