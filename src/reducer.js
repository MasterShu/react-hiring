import { combineReducers } from "redux";

import {user} from './redux/user.redux';
import {chatuser} from './redux/chatuser.redux';
import {chat} from './redux/chat.redux';

export default combineReducers({ user, chatuser, chat})