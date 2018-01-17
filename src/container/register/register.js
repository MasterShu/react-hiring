import React from 'react';
import { List, InputItem, Radio, WhiteSpace, Button } from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {register} from '../../redux/user.redux';
import Logo from '../../component/logo/logo';
import Form from '../../component/form';

@connect(
    state => state.user,
    {register}
)
@Form
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.handleRegister = this.handleRegister.bind(this)
    }
    componentDidMount() {
        this.props.handleChange('type', 'genius')
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
                        onChange={v => this.props.handleChange('user', v)}    
                    >账号</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        onChange={v => this.props.handleChange('pwd', v)} 
                        type="password"
                    >密码</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange={v => this.props.handleChange('repeatpwd', v)}
                    >确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem
                        checked={this.props.state.type === 'genius'}
                        onChange={() => this.props.handleChange('type', 'genius')}
                    >
                        大神
                    </RadioItem>
                    <RadioItem
                        checked={this.props.state.type === 'boss'}
                        onChange={() => this.props.handleChange('type', 'boss')}
                    >
                        BOOS
                    </RadioItem>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </List>
            </div>
        )
    }

    handleRegister() {
        this.props.register(this.props.state)
    }
}

export default Register;