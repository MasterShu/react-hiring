import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import {withRouter} from 'react-router';

import './index.css'

@withRouter
class NavLinkBar extends Component {
    static propTypes = {
        data: PropTypes.array
    }
    state = {  }
    render() {
        const navList = this.props.data.filter(v => !v.hide)
        const {pathname} = this.props.location
        return (
            <div>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                {navList.map(v => (
                        <TabBar.Item
                            title={v.text}
                            key={v.path}
                            icon={{uri: require(`./img/${v.icon}.png`)}}
                            selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
                            selected={pathname === v.path}
                            onPress={() => {
                                this.props.history.push(v.path)
                            }}
                        >
                        </TabBar.Item>
                    ))}
                </TabBar>
            </div>
        );
    }
}

export default NavLinkBar;