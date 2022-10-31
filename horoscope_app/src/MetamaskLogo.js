import React, { Component } from "react";

const ModelViewer = require('@metamask/logo');
export class MetamaskLogo extends Component {
    componentDidMount(){

        this.viewer = ModelViewer({
            pxNotRatio: true, 
            width: 200,
            height: 200,
            followMouse: true
        });
        this.el.appendChild(this.viewer.container);
    }

    componentWillUnmount(){
        this.viewer.stopAnimation();
    } 

    render() {
        return (
            <div 
            style={{ top: '50%', left:'50&'}}
                ref={el => (this.el = el)}
            />
        )
    }
}

export default MetamaskLogo;