import axios from 'axios';
import io from 'socket.io-client';

const socket = io('ws://localhost:9097')

const MSG_LIST = 'msgList'
const MSG_RECV = 'msgRecv'
const MSG_READ = 'msgRead'

const initState = {
    chatmsg: [],
    users: {},
    unread: 0
}

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {...state, chatmsg: action.payload.msgs, users: action.payload.users, unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length}
        case MSG_RECV:
            const addNum = action.payload.to === action.userid ? 1: 0;
            return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + addNum}
        case MSG_READ:
            const {from, num} = action.payload
            return {...state,
                chatmsg: state.chatmsg.map(v =>({...v, read: v.from === from ? true : v.read})),
                unread: state.unread - num
            }
        default:
            return state;
    }
}

export function msgList(msgs, users, userid) {
    return { type: MSG_LIST, payload: { msgs, users, userid}}
}
export function msgRecv(msg, userid) {
    return {userid, type: MSG_RECV, payload: msg}
}
export function msgRead({from, to, num}) {
    return {type: MSG_READ, payload: {from, to, num} }
}

export function recvMsg() {
    return (dispatch, getState) => {
        socket.on('recvmsg', function(data) {
            console.log('recvmsg', data)
            const userid = getState().user._id;
            dispatch(msgRecv(data, userid))
        })
    }
}
export function sendMsg({from, to, msg}) {
    return dispatch => {
        socket.emit('sendmsg', { from, to, msg })
    }
}
export function getMsgList() {
    return async (dispatch, getState) => {
        const res = await axios.get('/user/getmsglist')
        if (res.status === 200 && res.data.code === 0) {
            const userid = getState().user._id;
            dispatch(msgList(res.data.msgs, res.data.users, userid))
        }
    }
}
export function readMsg(from) {
    return async (dispatch, getState) => {
        const res = await axios.post('/user/readmsg', { from })
        const userid = getState().user._id;
        if (res.status === 200 && res.data.code === 0) {
            dispatch(msgRead({ userid, from, num: res.data.num }))
        }
    }
}