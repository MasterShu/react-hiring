import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, Modal } from 'antd-mobile';
import browserCookie from 'browser-cookies';
import { Redirect } from 'react-router';

import {logoutSubmit} from '../../redux/user.redux';

@connect(
    state => state.user,
    { logoutSubmit }
)
class User extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    render() {
        const props = this.props;
        const Item = List.Item;
        const Brief = Item.Brief;

        return (

            props.user ? (
            <div>
                <Result
                    img={<img src={require(`../img/${props.avatar}.png`)} style={{width: 50}} alt="" />}
                    title={props.user}
                    message={props.type === 'boss' ? props.company : null}
                >
                </Result>
                <List
                    renderHeader={()=>'简介'}
                >
                    <List.Item multipleLine onClick={() => { }}>
                        {props.title}
                        {props.desc.split('\n').map(v => (
                            <Brief key={v}>
                                {v}
                            </Brief>
                        ))}
                    </List.Item>
                </List>
                <WhiteSpace />
                <List>
                    <Item onClick={this.logout}>
                        退出登录
                    </Item>
                </List>
            </div>
            ) :  props.redirectTo ? <Redirect to={props.redirectTo} /> : null )
    }

    logout() {
        console.log('logout')
        const alert = Modal.alert
        alert('注销', '确认退出吗???', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确认', onPress: () => {
                    browserCookie.erase('userid')
                    this.props.logoutSubmit()
                }
            }
        ])
    }
}

export default User;