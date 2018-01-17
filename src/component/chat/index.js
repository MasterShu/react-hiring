import React, { Component } from 'react';
import io from 'socket.io-client';
import {List, InputItem} from 'antd-mobile';

const socket = io('ws://localhost:9097')

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {text: ''}
    }
    componentDidMount() {
    }
    render() {
        console.log(this.props)
        return (
            <div className="stick-footer">
                <List>
                    <InputItem
                        placeholder="请输入"
                        value={this.state.text}
                        onChange={v => {
                            this.setState({text: v})
                        }}
                        extra={<span onClick={() => this.handleSubmit()}>发送</span>}
                    >信息</InputItem>
                </List>
            </div>
        );
    }

    handleSubmit() {
        console.log(this.state)
        socket.emit('sendmsg', {text: this.state.text})
        this.setState({text: ''})
    }
}

export default Chat;