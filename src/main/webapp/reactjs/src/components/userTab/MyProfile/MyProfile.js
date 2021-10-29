import React, { Component } from "react";
import { Card, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Info from "./Info";
import * as actions from "../../../stores/actions/profile";
import * as actionsUser from "../../../stores/actions/user";
import history from "../../../history";

class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        profile_id: 1,
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

    componentDidMount() {
        actions
            .getProfileData()
            .then((res) => {
                if (res.data === "NO_CONTENT") {
                    history.push("/createprofile");
                } else {
                    this.setState({
                        birthDate: res.data.birthdate,
                        birthAimag: res.data.birthAimag.name,
                        birthSum: res.data.birthSum.name,
                        birthAddress: res.data.birthAddress,
                        residentAimag: res.data.residentAimag.name,
                        residentSum: res.data.residentSum.name,
                        residentAddress: res.data.residentAddress,
                        race: res.data.race,
                        gender: res.data.gender,
                        profile_id: res.data.id,
                        familyName: res.data.familyName,
                    });
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
    }

    renderGender = (param) => {
        switch (param) {
            case true:
                return "Эрэгтэй";
            case false:
                return "Эмэгтэй";
            default:
                return "Бусад";
        }
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
            gender,
        } = this.state;
        return (
            <Card
                className={"border border-light bg-light text-dark"}
                style={{ width: "80%", margin: "0 auto" }}
            >
                <Card.Header
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <div style={{ paddingTop: 10 }}>Миний танилцуулгууд</div>
                    <Link to={"/myintroduction"} className="nav-link">
                        {<Button variant="outline-success">Танилцуулга</Button>}
                    </Link>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Info title="Эцэг эхийн нэр" details={surname} />
                        <Info title="Нэр" details={givenName} />
                    </Row>
                    <Row>
                        <Info title="Утасны дугаар" details={phoneNumber} />
                        <Info title="Цахим шуудан" details={email} />
                    </Row>
                    <Row>
                        <Info
                            title="Хүйс"
                            details={this.renderGender(gender)}
                        />
                        <Info title="Төрсөн он сар өдөр" details={birthDate} />
                    </Row>
                    <Row>
                        <Info title="Үндэс угсаа" details={race} />
                        <Info title="Овог" details={familyName} />
                    </Row>
                    <Row>
                        <Info title="Төрсөн аймаг хот" details={birthAimag} />
                        <Info title="Сум, дүүрэг" details={birthSum} />
                    </Row>
                    <Row>
                        <Info title="Төрсөн газар" details={birthAddress} />
                    </Row>
                    <Row>
                        <Info title="Аймаг, хот" details={residentAimag} />
                        <Info title="Сум, дүүрэг" details={residentSum} />
                    </Row>
                    <Row>
                        <Info title="Гэрийн хаяг" details={residentAddress} />
                    </Row>
                    <div
                        style={{
                            width: "100%",
                            margin: "0 auto",
                            textAlign: "center",
                            marginTop: 20,
                        }}
                    ></div>
                </Card.Body>

                <Card.Footer>
                    <Link
                        to={`editprofile/${this.state.profile_id}`}
                        className="nav-link"
                    >
                        <Button variant="info">Засах</Button>
                    </Link>
                </Card.Footer>
            </Card>
        );
    }
}

export default MyProfile;
