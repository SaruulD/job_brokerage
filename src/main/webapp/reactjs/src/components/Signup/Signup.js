import React from "react";
import { Card, Form, Col, Button } from "react-bootstrap";
import * as actions from "../../stores/actions/auth";
import { connect } from "react-redux";
import history from "../../history";

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.userChange = this.userChange.bind(this);
        this.register = this.register.bind(this);
        this.isOwner = this.isOwner.bind(this);
    }

    initialState = {
        email: "",
        password: "",
        surname: "",
        givenname: "",
        number: "",
        owner: false,
        username: "",
    };

    register = (event) => {
        event.preventDefault();
        this.props.signup(
            this.state.username,
            this.state.email,
            this.state.password,
            this.state.surname,
            this.state.givenname,
            this.state.number,
            this.state.owner
        );
        history.push("/");
    };

    userChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    isOwner = (event) => {
        this.setState({
            owner: event.target.checked,
        });
    };

    render() {
        const {
            email,
            password,
            number,
            surname,
            givenname,
            owner,
            username,
        } = this.state;
        return (
            <Card
                className={"border border-light bg-light text-dark"}
                style={{ width: "35%", margin: "0 auto" }}
            >
                <Card.Header>Бүртгүүлэх</Card.Header>
                <Form onSubmit={this.register}>
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Enter password"
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Цахим шуудан</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="email"
                                    value={email}
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
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridSurname">
                                <Form.Label>Овог</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="surname"
                                    value={surname}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Enter surname"
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridGivenname">
                                <Form.Label>Нэр</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="givenname"
                                    value={givenname}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Enter given name"
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group
                                as={Col}
                                controlId="formGridPhoneNumber"
                            >
                                <Form.Label>Утасны дугаар</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="number"
                                    value={number}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Enter phone number"
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridOwner">
                                <Form.Check
                                    type="checkbox"
                                    label="Company owner"
                                    checked={owner}
                                    onChange={this.isOwner}
                                />
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{ textAlign: "center" }}>
                        {this.state.owner === true ? (
                            // <Link to={"signup2"} className="nav-link">
                            //     {
                            <Button size="sm" variant="success" type="submit">
                                Бүртгүүлэх
                            </Button>
                        ) : (
                            //     }
                            // </Link>
                            // <Link to={"/"} className="nav-link">
                            //     {
                            <Button size="sm" variant="success" type="submit">
                                Бүртгүүлэх
                            </Button>
                            //     }
                            // </Link>
                        )}
                        {/* <Button to={"signup2"} size="sm" variant="success" type="submit">Бүртгүүлэх</Button> */}
                        {/* <Button size="sm" variant="info" type="reset">Reset</Button> */}
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
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        signup: (
            username,
            email,
            password,
            surname,
            givenname,
            phoneNumber,
            owner
        ) =>
            dispatch(
                actions.authSignup(
                    username,
                    email,
                    password,
                    surname,
                    givenname,
                    phoneNumber,
                    owner
                )
            ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
