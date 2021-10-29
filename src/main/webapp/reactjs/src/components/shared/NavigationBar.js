import React from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/reactjs-1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import * as actions from "../../stores/actions/auth";
import { connect } from "react-redux";

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            username: null,
            loading: false,
            moderator: false,
            role: null,
        };
        this.props.checkLogin();
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
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.username !== this.props.username) {
            this.setState({
                username: this.props.username,
                authenticated: this.props.authenticated,
                role: this.props.role,
            });
        }
    }
    logout = () => {
        this.props.logout();
    };

    render() {
        return (
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{" "}
                    Ajil.mn
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Link to={"/jobs"} className="nav-link">
                        Ажлын зар
                    </Link>
                    <Link to={"/companies"} className="nav-link">
                        Компани
                    </Link>
                </Nav>
                {this.state.authenticated === false ? (
                    <Nav>
                        <Link to={"/signin"} className="nav-link">
                            Нэвтрэх
                        </Link>
                        <div
                            style={{
                                borderLeft: "1px solid",
                                height: 30,
                                color: "#ccc",
                                marginTop: 5,
                            }}
                        ></div>
                        <Link to={"/signup"} className="nav-link">
                            Бүртгүүлэх
                        </Link>
                    </Nav>
                ) : (
                    <Nav>
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="light"
                                id="dropdown-basic"
                                style={{ width: 180 }}
                            >
                                <FontAwesomeIcon
                                    icon={faUserAlt}
                                    style={{ color: "#555" }}
                                />{" "}
                                {this.state.username}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Link
                                    to={"/myprofile"}
                                    className="nav-link"
                                    as={Dropdown.Item}
                                >
                                    Хувийн мэдээлэл
                                </Link>
                                <Link
                                    to={"/savedjobs"}
                                    className="nav-link"
                                    as={Dropdown.Item}
                                >
                                    Хадгалсан зарууд
                                </Link>
                                {this.state.role === "ROLE_USER" ? (
                                    <Link
                                        to={"/myintroduction"}
                                        className="nav-link"
                                        as={Dropdown.Item}
                                    >
                                        Миний танилцуулга
                                    </Link>
                                ) : (
                                    ""
                                )}

                                {this.state.role !== "ROLE_USER" ? (
                                    <Link
                                        to={"/mycompany"}
                                        className="nav-link"
                                        as={Dropdown.Item}
                                    >
                                        Компанийн жагсаалт
                                    </Link>
                                ) : (
                                    ""
                                )}
                                {this.state.role !== "ROLE_USER" ? (
                                    <Link
                                        to={"/postjob"}
                                        className="nav-link"
                                        as={Dropdown.Item}
                                    >
                                        Ажлын зар оруулах
                                    </Link>
                                ) : (
                                    <div></div>
                                )}
                                <Link
                                    to={"/myaccount"}
                                    className="nav-link"
                                    as={Dropdown.Item}
                                >
                                    Миний бүртгэл
                                </Link>
                                <Link
                                    to={"/"}
                                    className="nav-link"
                                    as={Dropdown.Item}
                                    onClick={this.logout}
                                >
                                    Гарах
                                </Link>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                )}
            </Navbar>
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
        login: (username, password) =>
            dispatch(actions.authLogin(username, password)),
        checkLogin: () => dispatch(actions.authCheckState()),
        logout: () => dispatch(actions.authLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
