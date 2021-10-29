import React, { Component } from "react";
import { Link } from "react-router-dom";
import history from "../../history";
import { Button } from "react-bootstrap";

class PostedJob extends Component {
    render() {
        return (
            <div style={{ marginTop: 5 }}>
                <div
                    style={{
                        display: "inline-block",
                        paddingLeft: 20,
                        paddingRight: 20,
                    }}
                >
                    ●
                </div>
                <div style={{ display: "inline-block", width: "20%" }}>
                    {this.props.date}
                </div>
                {this.props.moderator ? (
                    <div style={{ display: "inline-block", width: "50%" }}>
                        <Button
                            variant="info"
                            size="sm"
                            onClick={() =>
                                history.push(`/editjob/${this.props.id}`)
                            }
                        >
                            {this.props.title}
                        </Button>
                    </div>
                ) : (
                    <div style={{ display: "inline-block", width: "50%" }}>
                        <Link to="/jobs">{this.props.title}</Link>
                    </div>
                )}
                {this.props.moderator ? (
                    <div style={{ display: "inline-block" }}>
                        <Link to={`/receivedresumes/${this.props.id}`}>
                            {" "}
                            Ирсэн анкет: {this.props.received_cv}
                        </Link>
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default PostedJob;
