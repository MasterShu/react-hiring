import React, { Component } from 'react';
import {connect} from 'react-redux';

import {getUserList} from '../../redux/chatuser.redux';
import UserCard from '../usercard';

@connect(
    state => state.chatuser,
    {getUserList}
)
class Boss extends Component {
    render() {
        return (
            <UserCard userList={this.props.userList}></UserCard>
        );
    }
    componentDidMount() {
        this.props.getUserList('genius');
    }
}

export default Boss;