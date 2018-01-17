import React, { Component } from 'react';

export default function Form(Comp) {
    return class WrapperComp extends Component{
        constructor(props) {
            super(props)
            this.state = {}
            this.handleChange = this.handleChange.bind(this)
        }

        render(){
            return <Comp handleChange={this.handleChange} state={this.state} {...this.props} ></Comp>
        }

        handleChange(key, val){
            console.log(key, val)
            this.setState({
                [key]: val
            })
        }
    }
}