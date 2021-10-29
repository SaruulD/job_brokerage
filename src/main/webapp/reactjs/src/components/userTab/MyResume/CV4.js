import React, { Component } from "react";
import { Card, Button, Form, Col, Table } from "react-bootstrap";
import * as actions from "../../../stores/actions/cv";
import history from "../../../history";

class CV4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exp: [],
            institute: "",
            position: "",
            startAt: "",
            endAt: "",
            edit: false,
            edit_id: 0,
        };
    }

    componentDidMount() {
        actions.expList().then((res) => {
            this.setState({
                exp: res.data,
            });
        });
    }

    goBack = () => {
        history.goBack();
    };

    userChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    deleteExp = (e) => {
        actions.deleteExp(e.target.id).then((res) => {
            this.setState({
                exp: this.state.exp.filter((exp) => exp.id !== res.data),
            });
        });
    };

    editExp = (e) => {
        const id = parseInt(e.target.id);
        let obj = this.state.exp.filter((exp) => exp.id === id);
        obj = obj[0];
        this.setState({
            edit: true,
            edit_id: id,
            institute: obj.institute,
            position: obj.position,
            startAt: obj.startAt,
            endAt: obj.endAt,
        });
    };

    submitEditExp = (event) => {
        event.preventDefault();
        actions
            .editExp(
                event.target.id,
                this.state.institute,
                this.state.position,
                this.state.startAt,
                this.state.endAt
            )
            .then((res) => {
                let exps = this.state.exp.filter(
                    (exp) => exp.id !== res.data.id
                );
                this.setState({
                    exp: [...exps, res.data],
                    institute: "",
                    position: "",
                    startAt: "",
                    endAt: "",
                    edit: false,
                    edit_id: 0,
                });
            });
    };

    submitExp = (event) => {
        event.preventDefault();
        actions
            .addExp(
                this.state.institute,
                this.state.position,
                new Date(this.state.startAt),
                new Date(this.state.endAt)
            )
            .then((res) => {
                this.setState({
                    exp: [...this.state.exp, res.data],
                    institute: "",
                    position: "",
                    startAt: "",
                    endAt: "",
                });
            })
            .catch((err) => {});
    };

    render() {
        const { institute, position, startAt, endAt } = this.state;
        return (
            <Card
                className={"border border-light bg-light text-dark"}
                style={{ width: "80%", margin: "0 auto" }}
            >
                <Card.Header>Миний анкет</Card.Header>
                <Card.Body>
                    <Form
                        onSubmit={
                            this.state.edit
                                ? this.submitEditExp
                                : this.submitExp
                        }
                        id={this.state.edit ? this.state.edit_id : null}
                    >
                        <h5 style={{ textAlign: "center" }}>
                            3. Туршлагын талаарх мэдээлэл
                        </h5>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>
                                    Ажилласан байгууллага, газар
                                </Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="institute"
                                    value={institute}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Ажилласан байгууллага, газар"
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Албан тушаал</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="position"
                                    value={position}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Албан тушаал"
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Ажилд орсон он, сар</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="month"
                                    name="startAt"
                                    value={startAt}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Ажлаас гарсан он, сар</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="month"
                                    name="endAt"
                                    value={endAt}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Button variant="primary" type="submit">
                            {this.state.edit ? "Засах" : "Нэмэх"}
                        </Button>
                    </Form>

                    <Table bordered hover style={{ marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th>Ажилласан байгууллага, газар</th>
                                <th>Албан тушаал</th>
                                <th>Ажилд орсон он, сар</th>
                                <th>Ажлаас гарсан он, сар</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.exp.map((experience, index) => {
                                return (
                                    <tr key={experience.id}>
                                        <td>{experience.institute}</td>
                                        <td>{experience.position}</td>
                                        <td>{experience.startAt}</td>
                                        <td>{experience.endAt}</td>
                                        <td>
                                            <Button
                                                id={experience.id}
                                                variant="outline-info"
                                                onClick={this.editExp}
                                                size="sm"
                                            >
                                                Засах
                                            </Button>
                                            <Button
                                                id={experience.id}
                                                variant="outline-danger"
                                                onClick={this.deleteExp}
                                                size="sm"
                                            >
                                                Устгах
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                            <tr></tr>
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Button size="sm" variant="info" onClick={this.goBack}>
                        Буцах
                    </Button>
                    <Button
                        size="sm"
                        variant="success"
                        onClick={() => history.push("/myintroduction")}
                    >
                        Дараах
                    </Button>
                </Card.Footer>
            </Card>
        );
    }
}

export default CV4;
