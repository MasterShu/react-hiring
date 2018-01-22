import React from 'react';
// import logoImg from "./logo.png";
import "./logo.css";

class Logo extends React.Component {
    state = {  }
    render() {
        return (
            <div className="logo-container">
                <img src={require('./logo.png')} alt="HIRING" />
            </div>
        );
    }
}

export default Logo;