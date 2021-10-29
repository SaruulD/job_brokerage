import React from "react";
import { Card, Button, Form, Col, Table } from "react-bootstrap";
import * as actions from "../../../stores/actions/cv";
import history from "../../../history";

class CV4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: [],
            name: "",
            listening: 1,
            speaking: 1,
            reading: 1,
            writing: 1,
            edit: false,
            edit_id: 0,
        };
    }

    componentDidMount() {
        actions.langList().then((res) => {
            this.setState({
                lang: res.data,
            });
        });
    }

    deleteLang = (e) => {
        actions.deleteLang(e.target.id).then((res) => {
            this.setState({
                lang: this.state.lang.filter(
                    (language) => language.id !== res.data
                ),
            });
        });
    };

    userChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    editLang = (e) => {
        const id = parseInt(e.target.id);
        let obj = this.state.lang.filter((lang) => lang.id === id);
        obj = obj[0];
        this.setState({
            edit: true,
            edit_id: id,
            name: obj.name,
            listening: obj.listening,
            speaking: obj.speaking,
            writing: obj.writing,
            reading: obj.reading,
        });
    };

    addExp = (language, listening, speaking, reading, writing) => {
        this.setState({
            lang: [
                ...this.state.lang,
                {
                    language: language,
                    listening: listening,
                    speaking: speaking,
                    reading: reading,
                    writing: writing,
                },
            ],
        });
    };

    submitEditLang = (event) => {
        event.preventDefault();
        actions
            .editLang(
                event.target.id,
                this.state.name,
                this.state.listening,
                this.state.writing,
                this.state.speaking,
                this.state.reading
            )
            .then((res) => {
                let langs = this.state.lang.filter(
                    (lang) => lang.id !== res.data.id
                );
                this.setState({
                    lang: [...langs, res.data],
                    name: "",
                    listening: 1,
                    speaking: 1,
                    reading: 1,
                    writing: 1,
                    edit: false,
                    edit_id: 0,
                });
            });
    };

    submitExp = (event) => {
        event.preventDefault();
        actions
            .addLang(
                this.state.name,
                this.state.listening,
                this.state.speaking,
                this.state.reading,
                this.state.writing
            )
            .then((res) => {
                this.setState({
                    lang: [...this.state.lang, res.data],
                    name: "",
                    listening: 1,
                    speaking: 1,
                    reading: 1,
                    writing: 1,
                });
            })
            .catch((err) => {
                alert("Try again may be it maybe duplicated value");
            });
    };

    goBack = () => {
        history.goBack();
    };

    renderSwitch(param) {
        switch (param) {
            case 1:
                return "Дунд";
            case 2:
                return "Сайн";
            case 3:
                return "Онц";
            default:
                return "none";
        }
    }

    render() {
        const { name, writing, listening, speaking, reading } = this.state;
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
                                ? this.submitEditLang
                                : this.submitExp
                        }
                        id={this.state.edit ? this.state.edit_id : null}
                    >
                        <h5 style={{ textAlign: "center" }}>
                            2. Гадаад хэлний мэдлэг
                        </h5>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Гадаад хэлний нэр</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Гадаад хэлний нэр"
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Сонсож ойлгох</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="listening"
                                    value={listening}
                                    onChange={this.userChange}
                                >
                                    <option value="1" key="1" id="1">
                                        Дунд
                                    </option>
                                    <option value="2" key="2" id="2">
                                        Сайн
                                    </option>
                                    <option value="3" key="3" id="3">
                                        Онц
                                    </option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Ярих</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="speaking"
                                    value={speaking}
                                    onChange={this.userChange}
                                >
                                    <option value="1" key="1" id="1">
                                        Дунд
                                    </option>
                                    <option value="2" key="2" id="2">
                                        Сайн
                                    </option>
                                    <option value="3" key="3" id="3">
                                        Онц
                                    </option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Унших</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="reading"
                                    value={reading}
                                    onChange={this.userChange}
                                >
                                    <option value="1" key="1" id="1">
                                        Дунд
                                    </option>
                                    <option value="2" key="2" id="2">
                                        Сайн
                                    </option>
                                    <option value="3" key="3" id="3">
                                        Онц
                                    </option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Бичих</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="writing"
                                    value={writing}
                                    onChange={this.userChange}
                                >
                                    <option value="1" key="1" id="1">
                                        Дунд
                                    </option>
                                    <option value="2" key="2" id="2">
                                        Сайн
                                    </option>
                                    <option value="3" key="3" id="3">
                                        Онц
                                    </option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Button variant="primary" type="submit">
                            {this.state.edit ? "Засах" : "Нэмэх"}
                        </Button>
                    </Form>

                    <Table bordered hover style={{ marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th>Хэл</th>
                                <th>Сонсож ойлгох</th>
                                <th>Ярих</th>
                                <th>Унших</th>
                                <th>Бичих</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.lang.map((language, index) => {
                                return (
                                    <tr key={language.id}>
                                        <td>{language.name}</td>
                                        <td>
                                            {this.renderSwitch(
                                                language.listening
                                            )}
                                        </td>
                                        <td>
                                            {this.renderSwitch(
                                                language.speaking
                                            )}
                                        </td>
                                        <td>
                                            {this.renderSwitch(
                                                language.reading
                                            )}
                                        </td>
                                        <td>
                                            {this.renderSwitch(
                                                language.writing
                                            )}
                                        </td>
                                        <td>
                                            <Button
                                                id={language.id}
                                                variant="outline-info"
                                                onClick={this.editLang}
                                                size="sm"
                                            >
                                                Засах
                                            </Button>
                                            <Button
                                                id={language.id}
                                                variant="outline-danger"
                                                onClick={this.deleteLang}
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
                        onClick={() => history.push("/mycv4")}
                    >
                        Дараах
                    </Button>
                </Card.Footer>
            </Card>
        );
    }
}

export default CV4;
