import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';

@connect(
   state => state 
)
class Msg extends Component {
    state = {  }
    render() {
        const userid = this.props.user._id
        const users = this.props.chat.users
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        });
        const chatList1 = Object.values(msgGroup)
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLaste(a).create_time
            const b_last = this.getLaste(b).create_time
            console.log(a, 'a')
            console.log(b, 'b')
            console.log('a_last', a_last)
            console.log('b_last', b_last)
            return b_last-a_last
        })
        console.log(chatList1)
        console.log(chatList)
        return (
            <div>
                <List>
                    {chatList.map(v => {
                        const lastItem = this.getLaste(v)
                        const targetId = v[0].from === userid ? v[0].to : v[0].from
                        const name = users[targetId] && users[targetId].name 
                        const unreadNum = v.filter(v=> !v.read && v.to === userid).length
                        return (
                            <List.Item
                                extra={<Badge text={unreadNum}></Badge>}
                                thumb={users[targetId].avatar ? require(`../img/${users[targetId].avatar}.png`): null}
                                key = {lastItem._id}
                                arrow="horizontal"
                                onClick={()=>{
                                    this.props.history.push('/chat/'+targetId)
                                }}
                            >
                                {lastItem.content}
                                <List.Item.Brief>
                                    {name}
                                </List.Item.Brief>
                            </List.Item>
                        )
                    })}

                </List>
            </div>
        );
    }

    getLaste(arr){
        return arr[arr.length -1]
    }
}

export default Msg;