import React from "react";
import JoditEditor from "jodit-react";
import { Card, Button, Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as actions from "../../../stores/actions/resume";
import * as actionsProfile from "../../../stores/actions/profile";
import history from "../../../history";

class CreateResume extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile_id: 1,
            editor: "",
            content: "",
            resumeName: "",
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
    }

    // all options from https://xdsoft.net/jodit/doc/
    config = {
        readonly: false,
        uploader: {
            insertImageAsBase64URI: true,
        },
        spellcheck: false,
        // preset: "inline",
    };

    postResume = (event) => {
        event.preventDefault();
        actions
            .createResume(this.state.resumeName, this.state.content)
            .then((res) => {
                if (res.data != null) {
                    history.push("/myresumelist");
                }
            })
            .catch((err) => {});
    };

    userChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    degreeSelect = (param) => {
        switch (param) {
            case 1:
                return "Бага";
            case 2:
                return "Дунд";
            case 3:
                return "Бүрэн дунд";
            case 4:
                return "Тусгай";
            case 5:
                return "Бакалавр";
            case 6:
                return "Магистр";
            case 7:
                return "Доктор";
            default:
                return "";
        }
    };

    levelSelect = (param) => {
        switch (param) {
            case 1:
                return "Дунд";
            case 2:
                return "Сайн";
            case 3:
                return "Онц";
            default:
                return "";
        }
    };

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

    componentDidMount() {
        actionsProfile
            .fullDetail()
            .then((res) => {
                if (res.data === "NO_CONTENT") {
                    history.push("/createprofile");
                } else {
                    let myCv;
                    const gender = this.renderGender(res.data.profile.gender);
                    myCv =
                        '<p style="text-align: left;"><strong>Хувийн мэдээлэл:</strong></p>';
                    myCv += '<hr id="null">';
                    myCv += `<table style="width: 389px; height: 104px;"><tbody>`;
                    myCv += `<tr><td style="border-color: rgb(255, 255, 255);">Овог, нэр:</td><td style="border-color: rgb(255, 255, 255);">${res.data.surname} ${res.data.givenname}</td></tr>`;
                    myCv += `<tr><td style="border-color: rgb(255, 255, 255);">Цахим шуудан:</td><td style="border-color: rgb(255, 255, 255);">${res.data.email}</td></tr>`;
                    myCv += `<tr><td style="border-color: rgb(255, 255, 255);">Төрсөн он сар өдөр:</td><td style="border-color: rgb(255, 255, 255);">${res.data.profile.birthdate}</td></tr>`;
                    myCv += `<tr><td style="border-color: rgb(255, 255, 255);">Хүйс:</td><td style="border-color: rgb(255, 255, 255);">${gender}</td></tr>"`;
                    myCv += `</tbody></table>`;
                    myCv += `<p><br></p>`;
                    myCv += `<p><strong>Мэргэжлийн зэрэг, төгссөн сургууль:</strong></p>`;
                    myCv += `<hr id="null">`;
                    res.data.educations.map((edu) => {
                        myCv += `<p>${edu.startAt} - ${
                            edu.endAt
                        } &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ${
                            edu.schoolName
                        }, ${this.degreeSelect(edu.degree)}- ${
                            edu.profession
                        }</p>`;
                    });
                    myCv += `<p><br></p><p><br></p>`;
                    myCv += "<p><strong>Гадаад хэлний мэдлэг:</strong></p>";
                    myCv += `<hr id="null">`;
                    myCv += `<table class="table table-bordered" >`;
                    myCv += `<tbody><tr><td style="text-align: center;">Хэлний нэр</td><td style="text-align: center;">Сонсож ойлгох</td><td style="text-align: center;">Ярих</td><td style="text-align: center;">Унших</td><td style="text-align: center;">Бичих</td></tr>`;
                    res.data.languages.map((lang) => {
                        myCv += `<tr><td>${
                            lang.name
                        }</td><td>${this.levelSelect(
                            lang.listening
                        )}</td><td>${this.levelSelect(
                            lang.speaking
                        )}</td><td>${this.levelSelect(
                            lang.reading
                        )}</td><td>${this.levelSelect(lang.writing)}</td></tr>`;
                    });
                    myCv += `</tbody></table><p><br></p><p><br></p><p><strong>Ажлын туршлага:</strong></p><hr id="null">`;
                    res.data.experiences.map((exp) => {
                        myCv += `<p>${exp.startAt} - ${exp.endAt}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ${exp.position}, ${exp.institute}</p>`;
                    });

                    this.setState({
                        content: myCv,
                    });
                }
            })
            .catch((err) => {});
    }

    render() {
        return (
            <Card
                className={"border border-light bg-light text-dark"}
                style={{ width: "80%", margin: "0 auto" }}
            >
                <Card.Header>Миний танилцуулга</Card.Header>
                <Card.Body>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCompany">
                            <Form.Label>Танилцуулгын нэр</Form.Label>
                            <Form.Control
                                required
                                autoComplete="off"
                                type="text"
                                name="resumeName"
                                value={this.state.resumeName}
                                onChange={this.userChange}
                                className={"bg-light text-dark"}
                                placeholder="Танилцуулгын нэр"
                            />
                        </Form.Group>
                    </Form.Row>
                    <JoditEditor
                        ref={this.state.editor}
                        value={this.state.content}
                        config={this.config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) =>
                            this.setState({ content: newContent })
                        } // preferred to use only this option to update the content for performance reasons
                        onChange={(newContent) => {}}
                    />
                </Card.Body>
                <Card.Footer>
                    <Button
                        size="sm"
                        variant="success"
                        onClick={this.postResume}
                    >
                        Хадгалах
                    </Button>
                    <Link
                        to={"myresumelist"}
                        style={{ display: "inline-block" }}
                        className="nav-link"
                    >
                        {
                            <Button size="sm" variant="danger">
                                Буцах
                            </Button>
                        }
                    </Link>
                </Card.Footer>
            </Card>
        );
    }
}

export default CreateResume;
