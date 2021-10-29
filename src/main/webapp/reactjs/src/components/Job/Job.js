import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/reactjs-1.jpg";
import * as actions from "../../stores/actions/user";
import * as actionsAuth from "../../stores/actions/auth";
import { connect } from "react-redux";
import history from "../../history";

class Job extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fav: false,
            authenticated: false,
            username: null,
            loading: false,
            moderator: false,
            role: null,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.username !== prevState.username) {
            return {
                username: nextProps.username,
                authenticated: nextProps.authenticated,
                roles: nextProps.roles,
            };
        }
        return null;
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.username !== this.props.username) {
            this.setState({
                username: this.props.username,
                authenticated: this.props.authenticated,
                role: this.props.role,
            });
        }
    }

    componentDidMount() {
        if (this.state.authenticated) {
            actions.isFav(this.props.id).then((res) => {
                this.setState({
                    fav: res,
                });
            });
        }
    }

    addToFav = () => {
        actions.addToFavList(this.props.id).then((res) => {
            this.setState({
                fav: true,
            });
        });
    };

    removeFromFav = () => {
        actions.removeFromFav(this.props.id).then((res) => {
            this.setState({
                fav: false,
            });
        });
    };

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
                        color: "#222",
                    }}
                >
                    <div>{this.props.date}</div>
                    <div
                        style={{
                            wordWrap: "break-word",
                            color: "#000",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            fontWeight: "bold",
                        }}
                    >
                        {this.props.title}
                    </div>
                    <div>{this.props.company}</div>
                </div>
                <div style={{}}>
                    {this.state.authenticated ? (
                        <div>
                            {this.state.fav ? (
                                <FontAwesomeIcon
                                    icon={faStar}
                                    style={{
                                        color: "#ffcc00",
                                        fontSize: 25,
                                        border: "1 solid #ff3300",
                                    }}
                                    onClick={this.removeFromFav}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faStar}
                                    style={{
                                        color: "#ddd",
                                        fontSize: 25,
                                        border: "1 solid",
                                        borderColor: "ff3300",
                                    }}
                                    onClick={this.addToFav}
                                />
                            )}
                        </div>
                    ) : (
                        <FontAwesomeIcon
                            icon={faStar}
                            style={{
                                color: "#ddd",
                                fontSize: 25,
                                border: "1 solid",
                                borderColor: "ff3300",
                            }}
                            onClick={() => history.push("/signin")}
                        />
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.token !== null,
        loading: state.auth.loading,
        token: state.auth.token,
        username: state.auth.username,
        role: state.auth.role,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        checkLogin: () => dispatch(actionsAuth.authCheckState()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Job);
