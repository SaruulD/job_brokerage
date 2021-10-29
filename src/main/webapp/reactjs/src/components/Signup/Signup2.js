import React from "react";
import { Card, Form, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Signup2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.userChange = this.userChange.bind(this);
    }

    initialState = {
        company: "",
        description: "",
        location: "",
    };

    userChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        const { company, description, location } = this.state;
        return (
            <div>
                <Card
                    className={"border border-light bg-light text-dark"}
                    style={{ width: "35%", margin: "0 auto" }}
                >
                    <Card.Header>Бүртгүүлэх</Card.Header>
                    <Form
                        onReset={this.resetUser}
                        onSubmit={this.register}
                        id="signUpForm"
                    >
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Компанийн нэр</Form.Label>
                                    <Form.Control
                                        required
                                        autoComplete="off"
                                        type="text"
                                        name="company"
                                        value={company}
                                        onChange={this.userChange}
                                        className={"bg-light text-dark"}
                                        placeholder="Enter name"
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Тайлбар</Form.Label>
                                    <Form.Control
                                        required
                                        autoComplete="off"
                                        type="text"
                                        name="description"
                                        value={description}
                                        onChange={this.userChange}
                                        className={"bg-light text-dark"}
                                        placeholder="Enter phone number"
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.File id="formcheck-api-regular">
                                        <Form.File.Label>Лого</Form.File.Label>
                                        <Form.File.Input />
                                    </Form.File>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Байршил</Form.Label>
                                    <Form.Control
                                        required
                                        autoComplete="off"
                                        type="text"
                                        name="location"
                                        value={location}
                                        onChange={this.userChange}
                                        className={"bg-light text-dark"}
                                        placeholder="Enter location"
                                    />
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{ textAlign: "center" }}>
                            <Link to={""} className="nav-link">
                                {
                                    <Button
                                        to={"signup2"}
                                        size="sm"
                                        variant="success"
                                    >
                                        Бүртгүүлэх
                                    </Button>
                                }
                            </Link>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Signup2;
