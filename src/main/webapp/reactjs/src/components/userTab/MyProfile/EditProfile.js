import React, { Component } from "react";
import { Card, Button, Form, Col } from "react-bootstrap";
import history from "../../../history";
import * as actions from "../../../stores/actions/profile";
import * as aimagAction from "../../../stores/actions/aimag";
import * as sumAction from "../../../stores/actions/sum";

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        profile_id: 0,
        familyName: "",
        birthDate: "",
        birthAimag: 1,
        birthSum: "",
        birthAddress: "",
        residentAimag: 1,
        residentSum: "",
        residentAddress: "",
        race: "",
        gender: 0,
        sums: [],
        residentSums: [],
        aimags: [],
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
        console.log(event.target.selectedIndex);
    };

    componentDidMount() {
        const profile_id = this.props.match.params.profile_id;
        actions
            .getProfileData(profile_id)
            .then((res) => {
                if (res.data === "NO_CONTENT") {
                    history.push("/createprofile");
                } else {
                    this.setState({
                        birthDate: res.data.birthdate,
                        birthAimag: res.data.birthAimag.id,
                        birthSum: res.data.birthSum.id,
                        birthAddress: res.data.birthAddress,
                        residentAimag: res.data.residentAimag.id,
                        residentSum: res.data.residentSum.id,
                        residentAddress: res.data.residentAddress,
                        race: res.data.race,
                        familyName: res.data.familyName,
                        gender: res.data.gender,
                    });
                    const res_aimag_id = parseInt(this.state.residentAimag);
                    sumAction.getSums(res_aimag_id).then((res) => {
                        this.setState({
                            residentSums: res.data,
                        });
                    });
                    const birth_aimag_id = parseInt(this.state.birthAimag);
                    sumAction.getSums(birth_aimag_id).then((res) => {
                        this.setState({
                            sums: res.data,
                        });
                    });
                    switch (res.data.gender) {
                        case false:
                            this.setState({
                                gender: 2,
                            });
                            break;
                        case true:
                            this.setState({
                                gender: 1,
                            });
                            break;
                        case null:
                            this.setState({
                                gender: 3,
                            });
                            break;
                        default:
                            this.setState({
                                gender: "",
                            });
                    }

                    // if (res.data.gender === null) {
                    //     this.setState({
                    //         gender: 3,
                    //     });
                    // }
                }
            })
            .catch((err) => {});

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
            .editProfile(
                this.props.match.params.profile_id,
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
            familyName,
            birthDate,
            birthAimag,
            birthSum,
            birthAddress,
            residentAimag,
            residentSum,
            residentAddress,
            race,
            gender,
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
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Хүйс</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={gender}
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

export default EditProfile;
