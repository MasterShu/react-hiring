import React from 'react';
import { List, InputItem, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {login} from '../../redux/user.redux';

import Logo from "../../component/logo/logo";

@connect(
    state => state.user,
    {login}
)
class Login extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            pwd: ''
        }
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    register() {
        this.props.history.push('/register')
    }
    render(){
        return(
            <div>
                <Logo></Logo>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <WingBlank>
                    {this.props.msg ? this.props.msg : null}
                    <List>
                        <InputItem
                            onChange={v => this.handleChange('user', v)} 
                        >账号</InputItem>
                        <WhiteSpace />
                        <InputItem
                            onChange={v => this.handleChange('pwd', v)} 
                            type="password"
                        >密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        ) 
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    handleLogin(){
        this.props.login(this.state)
    }
}



export default Login;