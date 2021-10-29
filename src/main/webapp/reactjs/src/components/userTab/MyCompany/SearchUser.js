import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import * as actions from "../../../stores/actions/company";

class SearchUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            isMod: false,
        };
    }

    componentDidMount() {
        actions
            .checkModerator(this.props.id, this.props.companyId)
            .then((res) => {
                this.setState({
                    isMod: res.data,
                });
            });
    }

    render() {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 8,
                }}
            >
                <p
                    style={{
                        display: "inline-block",
                        width: 300,
                        paddingTop: 5,
                        fontSize: 18,
                    }}
                >
                    {this.props.username}
                </p>
                {this.state.isMod ? (
                    <Button
                        variant="outline-success"
                        className=" mr-sm-2"
                        onClick={() =>
                            actions
                                .removeModerator(
                                    this.props.id,
                                    this.props.companyId
                                )
                                .then((res) => {
                                    alert("Removed");
                                    this.setState({
                                        isMod: false,
                                    });
                                })
                        }
                    >
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </Button>
                ) : (
                    <Button
                        variant="outline-success"
                        className=" mr-sm-2"
                        onClick={() =>
                            actions
                                .addModerator(
                                    this.props.id,
                                    this.props.companyId
                                )
                                .then((res) => {
                                    alert("Added");
                                    this.setState({
                                        isMod: true,
                                    });
                                })
                        }
                    >
                        <FontAwesomeIcon icon={faPlusCircle} />
                    </Button>
                )}
            </div>
        );
    }
}

export default SearchUser;
