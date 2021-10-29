import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class ResumeListItem extends Component {
    render() {
        return (
            <div style={{ display: "flex", paddingLeft: 50 }}>
                <div style={{ width: "70%" }}>
                    <Link to={`viewresume/${this.props.id}`}>
                        <h5>{this.props.title}</h5>
                    </Link>
                    <p>Сүүлд зассан огноо: {this.props.date}</p>
                </div>
                <Link to={`editresume/${this.props.id}`} className="nav-link">
                    {<Button variant="outline-secondary">Засах</Button>}
                </Link>
            </div>
        );
    }
}

export default ResumeListItem;
