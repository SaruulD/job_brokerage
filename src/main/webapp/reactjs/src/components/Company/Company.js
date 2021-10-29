import React, { Component } from "react";
import logo from "../../assets/reactjs-1.jpg";

class Company extends Component {
    render() {
        return (
            <div style={{ display: "flex", width: "100%" }}>
                <img
                    alt="companyLogo"
                    src={logo}
                    width="70"
                    height="70"
                    className="d-inline-block align-top"
                />{" "}
                <div
                    style={{
                        width: "70%",
                        textAlign: "start",
                        paddingLeft: 15,
                    }}
                >
                    <div
                        style={{
                            wordWrap: "break-word",
                            color: "#000",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            fontWeight: "bold",
                            paddingTop: 10,
                        }}
                    >
                        {this.props.title}
                    </div>
                    Нээлттэй ажлын байр: {this.props.jobCount}
                </div>
            </div>
        );
    }
}

export default Company;
