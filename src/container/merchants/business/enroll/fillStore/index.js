import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, DatePicker, Col , Button ,Cascader  ,Row ,InputNumber,Select } from 'antd';
import { getCurrent } from '../index/action'
import Title from '../../../../../component/common/title/title';

import {getProvinceAjax ,getCityAjax ,codeAjax ,verfiyCodeAjax ,saveForm} from './action';

import history from '../../../../../util/history';

const FormItem = Form.Item;
const Option = Select.Option;
@connect(state =>{
    const {city , province ,verfiy,formData} = state.fillStoreRs;
    return {
        city ,
        province ,
        verfiy,
        formData
    }
},dispatch =>({
    setCurrent:(current) => dispatch(getCurrent(current)),
    ProvinceAjax:(option) => dispatch(getProvinceAjax(option)),
    CityAjax:(url) => dispatch(getCityAjax(url)),
    getCode:(option) => dispatch(codeAjax(option)),
    getVerfiy:(option) => dispatch(verfiyCodeAjax(option)),
    setForm:(data) => dispatch(saveForm(data))
}))
 class FillStore extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.setCurrent({current:1,test:'test1'});
        this.props.ProvinceAjax({method:'get'});
    }
    componentDidMount(){
       /* const form = this.props.form;*/
        /*form.setFieldsValue(this.props.formData);*/
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let isForm = true;
        const form = this.props.form;

        const { form: { validateFieldsAndScroll } } = this.props;

        validateFieldsAndScroll((err, values) => {
            if (!err) {

            }else{
                isForm = false;
            }
        });
        if(isForm){
            const values = form.getFieldsValue();
            this.props.setForm({...values,showModel:true});
            this.props.getVerfiy({method:'POST',phone:{mobileNo:form.getFieldValue('personPhone'),verifyCode:form.getFieldValue('verifyCode')}}).then((data) => {
                this.props.history.push('/about/subCompany');
            });

        }
    }
    onPhoneRq = (rule, value, callback) =>{
        if(/^\d*$/g.test(value)){
            if(value.length != 11){
                callback('请输入11位电话号码!');
            }
        }else{
            callback('请输入正确的电话号码!');
        }
    }
    onGetCode = () =>{
        const form = this.props.form;
        this.props.getCode({method:'POST',data:{mobileNo:form.getFieldValue('personPhone')}});
    }
    onProvince = (val) =>{
        const form = this.props.form;
        this.props.CityAjax({method:'POST',data:{provinceCode:val}});
    }
    render(){
        const formItemLayout  = {
            labelCol : { span: 6 },
            wrapperCol : { span: 12 }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 14,
                offset: 6
            }
        };

        const { form:{getFieldDecorator},province,city } = this.props;

        return (
            <div className="store-box">
                <Title title="填写公司信息" />
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="公司名称"
                        hasFeedback>
                        {getFieldDecorator('company', {
                            initialValue:'',
                            rules: [{ required: true, message: '请输入公司名称!' }]
                        })(
                            <Input placeholder="请输入公司名称" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公司所在地">
                        <Row gutter={24}>
                                <Col span={12}>
                                    <FormItem>
                                    {getFieldDecorator('companyProvince')(
                                        <Select placeholder="省" onChange={this.onProvince}>
                                            {province.info.map((d) =>
                                                <Option key={d.code} value={d.code}>{d.name}</Option>
                                            )}
                                        </Select>
                                    )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem>
                                    {getFieldDecorator('companyCity')(
                                        <Select placeholder="市">
                                            {city.success ? city.info.map((d) =>
                                                <Option key={d.code} value={d.code}>{d.name}</Option>
                                            ) : null}
                                        </Select>

                                    )}
                                    </FormItem>
                                </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公司地址">
                        {getFieldDecorator('companyAdd',{initialValue:''})(
                            <Input placeholder="请填写公司详细地址" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="传真">
                        {getFieldDecorator('fax',{initialValue:''})(
                            <Input placeholder="请填写传真号" />
                        )}
                    </FormItem>
                    <Title title="填写店铺联系人" />
                    <FormItem
                        {...formItemLayout}
                        label="联系人姓名"
                        hasFeedback>
                        {getFieldDecorator('contactName',{
                            initialValue:'',
                            rules:[{required:true,message:'请填写店铺负责人姓名'}]
                        })(
                            <Input placeholder="请填写店铺负责人姓名" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="联系人手机"
                        >
                        {getFieldDecorator('personPhone',{
                            initialValue:'',
                            rules:[
                                {required:true,message:'必填项不能为空'},
                                {validator: this.onPhoneRq}
                            ]
                        })(
                            <Input placeholder="请输入手机号" />
                        )}
                    </FormItem>
                    <FormItem
                       labelCol={{ span: 6 }}
                        wrapperCol= {{ span: 12 }}
                        label="手机验证码"
                        >
                        {getFieldDecorator('verifyCode',{
                            initialValue:'',
                            rules:[
                                {required:true,message:'必填项不能为空'}
                            ]
                        })(
                            <div className="yzm-box">
                                <Row gutter={16}>
                                    <Col span={10}><Input  placeholder="请输入验证码" /></Col>
                                    <Col span={6}> <Button  className="btnStore" onClick={this.onGetCode}>获取验证码</Button></Col>
                                </Row>
                            </div>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="邮箱"
                        hasFeedback>
                        {getFieldDecorator('email',{
                            initialValue:'',
                            rules:[
                                {required:true,message:'必填项不能为空'},
                                {type:'email',message:'请输入正确的邮箱地址'}
                            ]
                        })(
                            <Input  placeholder=" 将作为商户后台的登录名，收取初始密码" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="QQ"
                        hasFeedback>
                        {getFieldDecorator('qq',{
                            initialValue:'',
                            rules:[
                                {required:true,message:'必填项不能为空'}
                            ]
                        })(
                            <Input  placeholder="请填写您的QQ号" />
                        )}
                    </FormItem>

                    <Title title="填写结算银行账户" />
                    <FormItem
                        {...formItemLayout}
                        label="银行开户名"
                        hasFeedback>
                        {getFieldDecorator('bankUser',{
                            initialValue:'',
                            rules:[
                                {required:true,message:'必填项不能为空'}
                            ]
                        })(
                            <Input  placeholder=" 开户行名称" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="开户行帐号"
                        hasFeedback>
                        {getFieldDecorator('bankCode',{
                            initialValue:'',
                            rules:[
                                {required:true,message:'必填项不能为空'}
                            ]
                        })(
                            <Input   placeholder="开户行帐号" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="开户行支行名称"
                        hasFeedback>
                        {getFieldDecorator('bankNameBranch',{
                            initialValue:'',
                            rules:[
                                {required:true,message:'必填项不能为空'}
                            ]
                        })(
                            <Input  placeholder="分支行信息" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="联行号"
                        hasFeedback>
                        {getFieldDecorator('brandNameCode',{
                            initialValue:''
                        })(
                            <Input  placeholder="" />
                        )}
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType='button' onClick={this.handleSubmit} size="large">下一步</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
FillStore = Form.create({})(FillStore);

/*class FillStore extends Component{
    render(){
        return(
            <h1> FillStore</h1>
        )
    }
}*/

export default FillStore;