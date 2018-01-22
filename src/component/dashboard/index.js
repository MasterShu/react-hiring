import React from 'react';
import { NavBar } from 'antd-mobile';
import {connect} from 'react-redux';
import { Route, Redirect} from 'react-router';
import QueueAnim from 'rc-queue-anim';

import NavLinkBar from '../navlink';
import Boss from '../boss';
import Genius from '../genius';
import User from '../user';
import {getMsgList, recvMsg} from '../../redux/chat.redux';
import Msg from '../msg';
import './index.css';

@connect(
    state => state,
    { getMsgList, recvMsg}
)
class Dashboard extends React.Component {
    state = {  }
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    render() {
        const user = this.props.user       
        const {pathname} = this.props.location 
        const navList = [
            {
                path: '/boss',
                text: '大神',
                icon: 'boss',
                title: '大神列表',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'BOOS列表',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg,
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User,
            },
        ]
        const page = navList.find(v => v.path === pathname)
        return page?  (
            <div>
                <NavBar className="fixed-header" mode="dark">{page.title}</NavBar>
                <div style={{marginTop: 50}}>
                    <QueueAnim type="scaleX" duration={800}>
                        <Route key={page.path} path={page.path} component={page.component}></Route>
                    </QueueAnim>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        ): <Redirect to='/msg'/>;
    }
}

export default Dashboard;