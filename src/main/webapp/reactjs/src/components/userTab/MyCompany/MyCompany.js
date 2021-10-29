import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class MyCompany extends Component {
    render() {
        return (
            <div style={{ display: "flex", paddingLeft: 50 }}>
                <div style={{ width: "70%" }}>
                    <Link to={`viewcompany/${this.props.id}`}>
                        <h5>{this.props.title}</h5>
                    </Link>
                    <p>Ирсэн анкет: {this.props.detail}</p>
                </div>
                <Link to={this.props.url} className="nav-link">
                    {<Button variant="outline-secondary">Засах</Button>}
                </Link>
            </div>
        );
    }
}

export default MyCompany;
