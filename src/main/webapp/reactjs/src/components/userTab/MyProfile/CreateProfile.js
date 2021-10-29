import React, { Component } from "react";
import { Card, Button, Form, Col } from "react-bootstrap";
import history from "../../../history";
import * as actions from "../../../stores/actions/profile";
import * as actionsUser from "../../../stores/actions/user";
import * as aimagAction from "../../../stores/actions/aimag";
import * as sumAction from "../../../stores/actions/sum";
class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        surname: "",
        givenName: "",
        familyName: "",
        birthDate: "",
        birthAimag: 1,
        birthSum: "",
        birthAddress: "",
        residentAimag: 1,
        residentSum: "",
        residentAddress: "",
        race: "",
        phoneNumber: "",
        email: "",
        gender: 0,
        sums: [],
        residentSums: [],
        aimags: [],
        profile_id: 1,
    };

    goBack = () => {
        history.goBack();
    };

    userChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleBirth = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });

        const aimag_id = parseInt(event.target.selectedIndex + 1); // TODO: get option id
        sumAction.getSums(aimag_id).then((res) => {
            this.setState({
                sums: res.data,
                // birthAimag: aimag_id,
            });
        });
    };

    handleResident = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });

        const aimag_id = parseInt(event.target.selectedIndex + 1); // TODO: get option id
        sumAction.getSums(aimag_id).then((res) => {
            this.setState({
                residentSums: res.data,
            });
        });
    };

    handleGender = (event) => {
        this.setState({
            gender: event.target.selectedIndex,
        });
        console.log("gender", event.target.selectedIndex);
        console.log("birthDate", this.state.birthDate);
    };

    componentDidMount() {
        actions
            .getProfileData(this.state.profile_id)
            .then((res) => {
                if (res.data !== "NO_CONTENT") {
                    history.push("/myprofile");
                }
            })
            .catch((err) => {});

        actionsUser
            .userGetAccount()
            .then((res) => {
                this.setState({
                    email: res.email,
                    givenName: res.givenname,
                    surname: res.surname,
                    phoneNumber: res.phoneNumber,
                });
            })
            .catch((err) => {
                console.log(err);
            });

        aimagAction.getAimag().then((res) => {
            this.setState({
                aimags: res,
            });
        });
    }

    aimagChanged = (e) => {
        const aimag_id = e.target.id; // TODO: get option id
        console.log(e);
        sumAction.getSums(aimag_id).then((res) => {
            this.setState({
                sums: res.data,
                birthAimag: aimag_id,
            });
        });
    };

    saveProfile = (event) => {
        event.preventDefault();
        actions
            .createProfile(
                this.state.race,
                new Date(this.state.birthDate),
                this.state.birthAimag,
                this.state.birthSum,
                this.state.birthAddress,
                this.state.residentAimag,
                this.state.residentSum,
                this.state.residentAddress,
                this.state.familyName,
                this.state.gender
            )
            .then((response) => {
                if (response.data != null) {
                    alert("Success");
                    history.push("/myprofile");
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
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Эцэг эхийн нэр</Form.Label>
                                <Form.Control
                                    disabled
                                    autoComplete="off"
                                    type="text"
                                    name="surname"
                                    value={surname}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Нэр</Form.Label>
                                <Form.Control
                                    disabled
                                    autoComplete="off"
                                    type="text"
                                    name="givenName"
                                    value={givenName}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
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
                                    <option key="1" id="1" value="1">
                                        Эрэгтэй
                                    </option>
                                    <option key="2" id="2" value="2">
                                        Эмэгтэй
                                    </option>
                                    <option key="3" id="3" value="3">
                                        Бусад
                                    </option>
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
                                    as="select"
                                    name="birthAimag"
                                    value={birthAimag}
                                    onChange={this.handleBirth}
                                >
                                    {this.state.aimags.map((aimag) => {
                                        return (
                                            <option
                                                value={aimag.id}
                                                key={aimag.id}
                                                id={aimag.id}
                                            >
                                                {aimag.name}
                                            </option>
                                        );
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Сум, дүүрэг</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="birthSum"
                                    value={birthSum}
                                    onChange={this.userChange}
                                >
                                    {
                                        this.state.sums.length > 0
                                            ? this.state.sums.map((sum) => {
                                                  return (
                                                      <option
                                                          id={sum.id}
                                                          key={sum.id}
                                                          value={sum.id}
                                                      >
                                                          {sum.name}
                                                      </option>
                                                  );
                                              })
                                            : ""
                                        // <small> Select aimag </small>
                                    }
                                </Form.Control>
                            </Form.Group>
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
                        </Form.Row>

                        <Form.Row>
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
                                    as="select"
                                    name="residentAimag"
                                    value={residentAimag}
                                    onChange={this.handleResident}
                                >
                                    {this.state.aimags.map((aimag) => {
                                        return (
                                            <option
                                                key={aimag.id}
                                                id={aimag.id}
                                                value={aimag.id}
                                            >
                                                {aimag.name}
                                            </option>
                                        );
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Сум, дүүрэг</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="residentSum"
                                    value={residentSum}
                                    onChange={this.userChange}
                                >
                                    {this.state.residentSums.length > 0
                                        ? this.state.residentSums.map((sum) => {
                                              return (
                                                  <option
                                                      id={sum.id}
                                                      key={sum.id}
                                                      value={sum.id}
                                                  >
                                                      {sum.name}
                                                  </option>
                                              );
                                          })
                                        : ""}
                                </Form.Control>
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
                    </Card.Body>
                    <Card.Footer
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button size="sm" variant="info" onClick={this.goBack}>
                            Буцах
                        </Button>
                        <Button size="sm" variant="success" type="submit">
                            Хадгалах
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        );
    }
}

export default CreateProfile;
