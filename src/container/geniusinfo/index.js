import React from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import AvatarSelector from '../../component/avatar-selector';
import { update } from '../../redux/user.redux';

@connect(
    state => state.user,
    { update }
)
class GeniusInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            money: '',
            desc: '',
            avatar: ''
        }
    }
    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <NavBar mode="dark">大神 完善信息</NavBar>
                <AvatarSelector selectAvatar={imgName => { this.setState({ avatar: imgName }) }}></AvatarSelector>
                <InputItem
                    onChange={v => this.handleChange('title', v)}
                >期望职位</InputItem>
                <InputItem
                    onChange={v => this.handleChange('money', v)}
                >期望薪资</InputItem>
                <TextareaItem
                    title="个人简介"
                    onChange={v => this.handleChange('desc', v)}
                    rows="3"
                    autoHeight
                />
                <Button
                    type="primary"
                    onClick={() => {
                        this.props.update(this.state)
                    }}
                >保存</Button>
            </div>
        );
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
}

export default GeniusInfo;