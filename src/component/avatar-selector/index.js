import React from 'react';
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends React.Component {
    static propTypes = {
        selectAvatar: PropTypes.func
    }
    constructor(props){
        super(props)
        this.state = {}
    }
    render() {
        const gridHeader = this.state.text ? 
            (<div>
                <span>已选择</span>
                <img style={{width: 20}} src={this.state.icon} alt="" />
            </div>) : <div> 请选择头像</div>;
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',')
            .map(v => ({
                icon: require(`../img/${v}.png`),
                text: v
            }))
        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid
                        data={avatarList}
                        columnNum={5}
                        onClick={elm => {
                            this.setState(elm)
                            this.props.selectAvatar(elm.text)
                        }}
                    />
                </List>
            </div>
        );
    }
}

export default AvatarSelector; 