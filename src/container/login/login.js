import React from 'react';
import { List, InputItem, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import {login} from '../../redux/user.redux';
import Logo from "../../component/logo/logo";
import Form from '../../component/form';

@connect(
    state => state.user,
    {login}
)
@Form
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
        const redirectTo = this.props.redirectTo;
        return(
            <div>
                <Logo></Logo>
                {redirectTo && redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} /> : null}
                <WingBlank>
                    {this.props.msg ? this.props.msg : null}
                    <List>
                        <InputItem
                            onChange={v => this.props.handleChange('user', v)} 
                        >账号</InputItem>
                        <WhiteSpace />
                        <InputItem
                            onChange={v => this.props.handleChange('pwd', v)} 
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
    handleLogin(){
        this.props.login(this.props.state)
    }
}



export default Login;