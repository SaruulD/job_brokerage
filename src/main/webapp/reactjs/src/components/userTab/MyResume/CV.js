import React, { Component } from "react";
import { Card, Button, Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class CV extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        surname: "",
        givenName: "",
        familyName: "",
        birthDate: "",
        birthAimag: "",
        birthSum: "",
        birthAddress: "",
        residentAimag: "",
        residentSum: "",
        residentAddress: "",
        race: "",
        phoneNumber: "",
        email: "",
        gender: 0,
    };

    userChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleGender = (event) => {
        this.setState({
            gender: event.target.options.selectedIndex,
        });
    };

    saveProfile = (event) => {
        axios
            .post("http://localhost:8080/job/add/", {
                race: this.state.race,
                birthDate: this.state.birthDate,
                birthAimag: this.state.birthAimag,
                birthSum: this.state.birthSum,
                birthAddress: this.state.birthAddress,
                residentAimag: this.state.residentAimag,
                residentSum: this.state.residentSum,
                residentAddress: this.residentAddress,
                familyName: this.state.familyName,
                gender: this.state.gender,
            })
            .then((response) => {
                if (response.data != null) {
                    alert("Success");
                }
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };

    render() {
        const {
            surname,
            givenName,
            familyName,
            birthDate,
            birthAimag,
            birthSum,
            birthAddress,
            residentAimag,
            residentSum,
            residentAddress,
            race,
            phoneNumber,
            email,
        } = this.state;
        return (
            <Card
                className={"border border-light bg-light text-dark"}
                style={{ width: "80%", margin: "0 auto" }}
            >
                <Card.Header>Миний анкет</Card.Header>
                <Form onSubmit={this.saveProfile}>
                    <Card.Body>
                        <h5 style={{ textAlign: "center" }}>
                            1. Хувь хүний талаарх мэдээлэл
                        </h5>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Эцэг эхийн нэр</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="surname"
                                    value={surname}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Enter name"
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Нэр</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="givenName"
                                    value={givenName}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Enter name"
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Хүйс</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={this.handleGender}
                                >
                                    <option>Эрэгтэй</option>
                                    <option>Эмэгтэй</option>
                                    <option>Бусад</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Төрсөн он сар өдөр</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="date"
                                    name="birthDate"
                                    value={birthDate}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Enter name"
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Төрсөн аймаг, хот</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="birthAimag"
                                    value={birthAimag}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Enter name"
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Сум, дүүрэг</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="birthSum"
                                    value={birthSum}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Enter name"
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Төрсөн газар</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="birthAddress"
                                    value={birthAddress}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Enter name"
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Овог</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="familyName"
                                    value={familyName}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Enter name"
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Үндэс угсаа</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="race"
                                    value={race}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Enter name"
                                />
                            </Form.Group>
                        </Form.Row>

                        <h6>Оршин суугаа хаяг</h6>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Аймаг, хот</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="residentAimag"
                                    value={residentAimag}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Enter name"
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Сум, дүүрэг</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="residentSum"
                                    value={residentSum}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Enter name"
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Гэрийн хаяг</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="residentAddress"
                                    value={residentAddress}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Enter name"
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Утас</Form.Label>
                                <Form.Control
                                    disabled
                                    autoComplete="off"
                                    type="number"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Enter name"
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>И-мэйл хаяг</Form.Label>
                                <Form.Control
                                    disabled
                                    autoComplete="off"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Enter name"
                                />
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        {/* <Link to={"myintroduction"} style={{display: 'inline-block'}} className="nav-link">{<Button size="sm" variant="success">Хадгалах</Button>}</Link> */}
                        <Link
                            to={"myintroduction"}
                            style={{ display: "inline-block" }}
                            className="nav-link"
                        >
                            {
                                <Button size="sm" variant="info">
                                    Буцах
                                </Button>
                            }
                        </Link>
                        <Button size="sm" variant="success" type="submit">
                            Хадгалах
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        );
    }
}

export default CV;
