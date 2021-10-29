import React, { Component } from "react";

class Info extends Component {
    render() {
        return (
            <div style={{ width: "50%", paddingLeft: 50 }}>
                <h6>{this.props.title}:</h6>
                <p style={{ paddingLeft: 25 }}>{this.props.details}</p>
            </div>
        );
    }
}

export default Info;
