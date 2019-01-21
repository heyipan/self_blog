import './result.less';
import React , { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrent } from '../index/action'
@connect(null,dispatch =>({
    setCurrent:(current) => dispatch(getCurrent(current))
}))
class Result extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.setCurrent({current:3,test:'test3'})
    }
    render(){
        return (
            <div className="result-box">
                <div className="tit-box">提交成功</div>
                <div className="ms-xx">
                    提交成功！福礼惠会在1-3个工作日审核完毕，请注意查收您的联系手机、邮箱
                </div>
                <div className="ms-xx">有任何疑问请联系客服   400-XXXX-XXXX </div>
            </div>
        )
    }
}

export default Result;