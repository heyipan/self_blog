import './poss.less';
import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Steps } from 'antd';
import { getCurrent } from './action';
import { Route, Switch, Redirect } from 'react-router';

import logoImg from '../../../../../asset/entroll/logo.jpg';
import Loading from '../../../public/loading/index';
import Agreement from "../agreement";
import FillStore from "../fillStore";
import SubCompany from "../subCompany";
import Result from "../result";

const Step = Steps.Step;

@connect(state =>{
    return {
        current:state.possRs.current
    }
},dispatch =>({
    setCurrent:(cur) => dispatch(getCurrent(cur))
}))
export default class Enroll extends Component{
    constructor(props){
        super(props)
    }
    componentWillMount(){
        this.props.setCurrent({current: 0,test:'test0'});
    }
    render(){
        return (
        <div className="poss-box">
            <div className="log-box" >
                <a href="#" className='logoImg'>
                    <img src={logoImg} alt=""/>
                </a>
                <span className="sj-box">商家入驻</span>
                <span className="phone">商家客服热线： 400-xxxx-xxxx</span>
            </div>
            <div className="con-box">
                <div className="menu-box">
                    <Steps current={this.props.current}>
                        <Step title="同意入驻协议"  />
                        <Step title="填写店铺基本信息"  />
                        <Step title="提交企业认证信息"  />
                        <Step title="等待福礼惠审核"  />
                    </Steps>
                </div>
                <div className="children-box">
                    <Switch>
                        <Route path='/' exact   component={Agreement} />
                        <Route path='/about/fillStore' exact component={FillStore}/>
                        <Route path='/about/subCompany' exact component={SubCompany} />
                        <Route path='/about/result' exact component={Result}/>
                    </Switch>
                </div>
                <Loading />
            </div>
        </div>
        )
    }
}