import React, { Component } from "react";
import { Card, Form, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../../stores/actions/auth";
import { Redirect } from "react-router-dom";

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameOrEmail: "",
            password: "",
        };
    }

    userChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    signin = (event) => {
        event.preventDefault();
        this.props.login(this.state.usernameOrEmail, this.state.password);
    };

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

    render() {
        if (this.props.authenticated === true) {
            return <Redirect to="/" />;
        }
        const { usernameOrEmail, password } = this.state;
        return (
            <Card
                className={"border border-light bg-light text-dark"}
                style={{ width: "35%", margin: "0 auto" }}
            >
                <Card.Header>Нэвтрэх</Card.Header>
                <Form onSubmit={this.signin}>
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>
                                    Нэвтрэх нэр эсвэл цахим шуудан
                                </Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="usernameOrEmail"
                                    value={usernameOrEmail}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Enter email"
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Нууц үг</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Enter password"
                                />
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{ textAlign: "center" }}>
                        <Button size="sm" variant="success" type="submit">
                            Нэвтрэх
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
