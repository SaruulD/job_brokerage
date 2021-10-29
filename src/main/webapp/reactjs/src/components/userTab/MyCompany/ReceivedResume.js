import React, { Component } from "react";
import { Link } from "react-router-dom";

class ReceivedResume extends Component {
    render() {
        return (
            <div style={{ display: "flex", paddingLeft: 50 }}>
                <div style={{ width: "70%" }}>
                    <Link to={`/viewreceived/${this.props.id}`}>
                        <h5>{this.props.name}</h5>
                    </Link>
                    <p>
                        Илгээсэн: {this.props.user.surname} овогтой{" "}
                        {this.props.user.givenname} <br />
                        Утасны дугаар: {this.props.user.phoneNumber}
                    </p>
                </div>
            </div>
        );
    }
}

export default ReceivedResume;
