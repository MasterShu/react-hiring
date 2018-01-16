import React from 'react';
import { List, InputItem, Radio, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {register} from '../../redux/user.redux';
import Logo from '../../component/logo/logo';

@connect(
    state => state.user,
    {register}
)
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 'genius',
            user: '',
            pwd: '',
            repeatpwd: ''
        }

        this.handleRegister = this.handleRegister.bind(this)
    }
    render() {
        const RadioItem = Radio.RadioItem;
        return(
            <div>
                <Logo></Logo>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} />: null}
                <List>
                    {this.props.msg? this.props.msg: null}
                    <InputItem
                        onChange={v => this.handleChange('user', v)}    
                    >账号</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        onChange={v => this.handleChange('pwd', v)} 
                        type="password"
                    >密码</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange={v => this.handleChange('repeatpwd', v)}
                    >确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem
                        checked={this.state.type === 'genius'}
                        onChange={() => this.handleChange('type', 'genius')}
                    >
                        大神
                    </RadioItem>
                    <RadioItem
                        checked={this.state.type === 'boss'}
                        onChange={() => this.handleChange('type', 'boss')}
                    >
                        BOOS
                    </RadioItem>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </List>
            </div>
        )
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    handleRegister() {
        console.log(this.state);
        this.props.register(this.state)
    }
}

export default Register;