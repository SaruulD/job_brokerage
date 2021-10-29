import React, { Component } from "react";
import { Card, Button, Form, Col } from "react-bootstrap";
import history from "../../../history";
import * as actions from "../../../stores/actions/company";

export class EditCompany extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        company: "",
        description: "",
        location: "",
        show: false,
    };

    userChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    editCompany = (event) => {
        event.preventDefault();
        actions
            .editCompany(
                this.state.company_id,
                this.state.company,
                this.state.location,
                this.state.description
            )
            .then((res) => {
                if (res.data != null) {
                    history.push(`/viewCompany/${this.state.company_id}`);
                }
            })
            .catch((err) => {});
    };

    componentDidMount() {
        const company_id = this.props.match.params.company_id;
        actions
            .companyById(company_id)
            .then((res) => {
                this.setState({
                    company_id: company_id,
                    company: res.data.name,
                    location: res.data.location,
                    description: res.data.description,
                    created_at: res.data.created_at,
                });
            })
            .catch((err) => {});
    }

    render() {
        const { company, description, location } = this.state;
        return (
            <Card
                className={"border border-light bg-light text-dark"}
                style={{ width: "80%", margin: "0 auto" }}
            >
                <Card.Header
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <div style={{ paddingTop: 10 }}>Миний танилцуулгууд</div>
                </Card.Header>
                <Form>
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
                                    as="textarea"
                                    rows="3"
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
                </Form>
                <Card.Footer>
                    <Button size="sm" variant="info" onClick={this.editCompany}>
                        Хадгалах
                    </Button>
                    <Button
                        size="sm"
                        variant="info"
                        onClick={() => history.goBack()}
                        style={{ marginLeft: 15 }}
                    >
                        Буцах
                    </Button>
                </Card.Footer>
            </Card>
        );
    }
}

export default EditCompany;
