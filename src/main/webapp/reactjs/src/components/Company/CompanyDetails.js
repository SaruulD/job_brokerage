import React, { Component } from "react";
import logo from "../../assets/reactjs-1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import PostedJob from "./PostedJob";
import JoditEditor from "jodit-react";
import * as actions from "../../stores/actions/company";
import * as actionsJob from "../../stores/actions/job";
class CompanyDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thumbsup: false,
            thumbsdown: false,
            companyId: "",
            companyName: "",
            description: "",
            location: "",
            showDetails: false,
            jobList: [],
        };
    }
    // all options from https://xdsoft.net/jodit/doc/
    config = {
        readonly: true,
        uploader: {
            insertImageAsBase64URI: true,
        },
        spellcheck: false,
        preset: "inline",
    };

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.id !== this.props.id) {
            actions
                .companyById(this.props.id)
                .then((res) => {
                    this.setState({
                        companyId: this.props.id,
                        companyName: res.data.name,
                        description: res.data.description,
                        location: res.data.location,
                        showDetails: true,
                    });

                    actionsJob.jobByCompany(this.props.id).then((res) => {
                        this.setState({
                            jobList: res.data,
                        });
                    });
                })
                .catch((err) => {});
        }
    }

    render() {
        return (
            <div style={{ backgroundColor: "#fff" }}>
                {this.state.showDetails ? (
                    <div>
                        <img
                            alt="companyLogo"
                            src={logo}
                            width="100%"
                            height="300"
                            className="d-inline-block align-top"
                        />{" "}
                        <div style={{ display: "flex", paddingLeft: 20 }}>
                            <div style={{ width: "80%" }}>
                                <h5>{this.state.companyName}</h5>
                            </div>
                            <div>
                                {this.state.thumbsup ? (
                                    <FontAwesomeIcon
                                        icon={faAngleUp}
                                        style={{
                                            color: "#28a745",
                                            fontSize: 30,
                                            border: "1 solid #ff3300",
                                        }}
                                        onClick={() =>
                                            this.setState({ thumbsup: false })
                                        }
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faAngleUp}
                                        style={{
                                            color: "#ddd",
                                            fontSize: 30,
                                            border: "1 solid",
                                            borderColor: "ff3300",
                                        }}
                                        onClick={() =>
                                            this.setState({
                                                thumbsup: true,
                                                thumbsdown: false,
                                            })
                                        }
                                    />
                                )}
                                {this.state.thumbsdown ? (
                                    <FontAwesomeIcon
                                        icon={faAngleDown}
                                        style={{
                                            color: "#dc3545",
                                            fontSize: 30,
                                            border: "1 solid #ff3300",
                                        }}
                                        onClick={() =>
                                            this.setState({ thumbsdown: false })
                                        }
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faAngleDown}
                                        style={{
                                            color: "#ddd",
                                            fontSize: 30,
                                            border: "1 solid",
                                            borderColor: "ff3300",
                                        }}
                                        onClick={() =>
                                            this.setState({
                                                thumbsdown: true,
                                                thumbsup: false,
                                            })
                                        }
                                    />
                                )}
                            </div>
                        </div>
                        <div
                            style={{
                                fontSize: 16,
                                padding: 50,
                                paddingTop: 20,
                                paddingBottom: 20,
                            }}
                        >
                            <h5>{this.state.name}</h5>
                            <div
                                style={{ display: "inline-block", width: 150 }}
                            >
                                Байршил:
                            </div>
                            <div
                                style={{
                                    display: "inline-block",
                                    fontWeight: "bold",
                                }}
                            >
                                {this.state.location}
                            </div>
                            <br />
                            <JoditEditor
                                ref={this.state.editor}
                                value={this.state.description}
                                config={this.config}
                                tabIndex={1} // tabIndex of textarea
                                onChange={(newContent) => {}}
                            />
                            {this.state.jobList.length > 0 ? (
                                <div>
                                    <h5>Оруулсан зарууд:</h5>
                                    {this.state.jobList.map((job) => (
                                        <PostedJob
                                            key={job.id}
                                            title={job.job_title}
                                            date={job.createdDate}
                                        />
                                    ))}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default CompanyDetails;
