import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {loadData} from '../../redux/user.redux';
import { connect } from 'react-redux';

@withRouter
@connect(
    null,
    {loadData}
)
class AuthRoute extends React.Component {
    state = {  }
    render() {
        return (
            null
        );
    }

    componentDidMount(){
        const publicList = ['/login', '/register'];
        const pathName = this.props.location.pathname
        if (publicList.indexOf(pathName) > -1) {
            return null;
        }
        axios.get('/user/info')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        this.props.loadData(res.data.data)
                    }else{

                        this.props.history.push('/login')
                    }
                }
            });
    }
}

export default AuthRoute;