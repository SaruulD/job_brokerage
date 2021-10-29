import React, { Component } from "react";
import { Card, Button, Form, Col } from "react-bootstrap";
import * as actions from "../../../stores/actions/company";
import history from "../../../history";

class AddCompany extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        companyName: "",
        description: "",
        location: "",
        logo: "",
    };

    userChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    addCompany = (event) => {
        event.preventDefault();
        actions
            .ownerCreateCompany(
                this.state.companyName,
                this.state.description,
                this.state.location
            )
            .then((res) => {
                console.log(res.data);
                history.push("/mycompany");
            })
            .catch((err) => {});
    };

    render() {
        const { companyName, description, location } = this.state;
        return (
            <Card
                className={"border border-light bg-light text-dark"}
                style={{ width: "80%", margin: "0 auto" }}
            >
                <Card.Header>Компани бүртгэх</Card.Header>
                <Form onSubmit={this.addCompany}>
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCompany">
                                <Form.Label>Компанийн нэр</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="companyName"
                                    value={companyName}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Компанийн нэр"
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group
                                as={Col}
                                controlId="formGridDescription"
                            >
                                <Form.Label>Тайлбар</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    as="textarea"
                                    rows="3"
                                    type="text"
                                    name="description"
                                    value={description}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Тайлбар"
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridLogo">
                                <Form.File id="formcheck-api-regular">
                                    <Form.File.Label>Лого</Form.File.Label>
                                    <Form.File.Input />
                                </Form.File>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridLocation">
                                <Form.Label>Байршил</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="location"
                                    value={location}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Байршил"
                                />
                            </Form.Group>
                        </Form.Row>
                        Moderator
                        <br />
                        Anket
                    </Card.Body>

                    <Card.Footer>
                        <Button size="sm" variant="info" type="submit">
                            Хадгалах
                        </Button>
                        <Button
                            size="sm"
                            variant="info"
                            onClick={() => history.goBack()}
                            style={{ marginLeft: 10 }}
                        >
                            Буцах
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        );
    }
}

export default AddCompany;
