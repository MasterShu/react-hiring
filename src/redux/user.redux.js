import axios from 'axios';

import {getRedirectPath} from '../util';

const AUTH_SUCCESS = 'authSuccess';
const LOGOUT = 'logout';
const ERROR_MSG = 'errorMsg';
const LOAD_DATA = 'loadData';

const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    type: '',
    pwd: ''
}

export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload } 
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg}
        case LOAD_DATA:
            return {...state, ...action.payload}
        case LOGOUT:
            return {...initState, redirectTo: '/login'}
        default:
            return state;
    }

}

export function register({ user, pwd, repeatpwd, type}) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名密码必须输入')
    }

    if (pwd !== repeatpwd) {
        return errorMsg('两次密码输入不一致')
    }

    return async dispatch => {
        const res =await axios.post('/user/register', { user, pwd, type })
        if (res.status === 200 && res.data.code === 0) {
            dispatch(authSuccess({ user, pwd, type }))
        } else {
            dispatch(errorMsg(res.data.msg))
        }
    }
}

export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('用户名密码必须输入')
    }

    return async dispatch => {
        const res = await axios.post('/user/login', { user, pwd })
        if (res.status === 200 && res.data.code === 0) {
            dispatch(authSuccess(res.data.data))
        } else {
            dispatch(errorMsg(res.data.msg))
        }
    }
}

export async function  userinfo() {
    const res = await axios.get('/user/info')
    if (res.status === 200) {
        if (res.data.code === 0) {

        } else {
            this.props.loadData(res.data.data)
            this.props.history.push('/login')
        }
    }
}

export function update(data) {
    return async dispatch => {
        const res = await axios.post('/user/update', data)
        if (res.status === 200 && res.data.code === 0) {
            dispatch(authSuccess(res.data.data))
        } else {
            dispatch(errorMsg(res.data.msg))
        }
    }
}

export function logoutSubmit(params) {
    return {type: LOGOUT}
}

export function loadData(userinfo) {
    return {type: LOAD_DATA, payload: userinfo}
}

function authSuccess(data) {
    const {pwd, ...datas} = data;
    return { type: AUTH_SUCCESS, payload: datas}
}

function errorMsg(msg) {
    return {msg, type: ERROR_MSG}
}