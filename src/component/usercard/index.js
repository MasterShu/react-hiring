import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, WingBlank } from 'antd-mobile';
import {withRouter} from 'react-router';

@withRouter
class UserCard extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }
    render() {
        return (
            <WingBlank>
                {this.props.userList.map(v => (
                    <Card
                        key={v._id}
                        onClick={()=>this.handleClick(v)}
                    >
                        <Card.Header
                            title={v.user}
                            thumb={v.avatar ? require(`../img/${v.avatar}.png`) : null}
                            extra={<span>{v.title}</span>}
                        >
                        </Card.Header>
                        <Card.Body>
                            {v.type === 'boss' ? <div>公司: {v.company} </div> : null}
                            
                            {v.desc ? v.desc.split('\n').map(d => (
                                <div key={d}>{d}</div>
                            )) : null}
                            {v.type === 'boss' ? <div>薪资: {v.money} </div> : null}
                        </Card.Body>
                    </Card>
                ))}
            </WingBlank>
        );
    }

    handleClick(v){
        this.props.history.push(`/chat/${v._id}`);
    }
}

export default UserCard;