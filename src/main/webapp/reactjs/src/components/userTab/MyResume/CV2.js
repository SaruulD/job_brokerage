import React from "react";
import { Card, Button, Form, Col, Table } from "react-bootstrap";
import * as actions from "../../../stores/actions/cv";
import history from "../../../history";

class CV2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolName: "",
            startAt: "",
            endAt: "",
            degree: "",
            profession: "",
            edu: [],
            edit: false,
            edit_id: 0,
        };
    }

    goBack = () => {
        history.goBack();
    };

    userChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    deleteEdu = (e) => {
        actions.deleteEdu(e.target.id).then((res) => {
            this.setState({
                edu: this.state.edu.filter((edu) => edu.id !== res.data),
            });
        });
    };

    editEdu = (e) => {
        const id = parseInt(e.target.id);
        let obj = this.state.edu.filter((edu) => edu.id === id);
        obj = obj[0];
        this.setState({
            edit: true,
            edit_id: id,
            schoolName: obj.schoolName,
            startAt: obj.startAt,
            endAt: obj.endAt,
            profession: obj.profession,
            degree: obj.degree,
        });
    };

    componentDidMount() {
        actions.eduList().then((res) => {
            this.setState({
                edu: res.data,
            });
        });
    }

    submitEditEdu = (event) => {
        event.preventDefault();
        actions
            .editEdu(
                event.target.id,
                this.state.schoolName,
                this.state.startAt,
                this.state.endAt,
                this.state.degree,
                this.state.profession
            )
            .then((res) => {
                const fd = {
                    id: res.data.id,
                    schoolName: res.data.schoolName,
                    startAt: res.data.startAt,
                    endAt: res.data.endAt,
                    degree: res.data.degree,
                    profession: res.data.profession,
                };
                let eduList = this.state.edu.filter(
                    (edu) => edu.id !== res.data.id
                );
                eduList.push(fd);
                this.setState({
                    edu: eduList,
                    schoolName: "",
                    startAt: "",
                    endAt: "",
                    degree: "",
                    profession: "",
                    edit: false,
                    edit_id: 0,
                });
            });
    };

    submitEdu = (event) => {
        event.preventDefault();
        const form = event.target;
        const schoolName = form.elements["schoolName"].value;
        const startAt = form.elements["startAt"].value;
        const endAt = form.elements["endAt"].value;
        const degree = form.elements["degree"].value;
        const profession = form.elements["profession"].value;
        actions
            .addEdu(
                schoolName,
                new Date(startAt),
                new Date(endAt),
                degree,
                profession
            )
            .then((res) => {
                const fd = {
                    id: res.data.id,
                    schoolName: res.data.schoolName,
                    startAt: res.data.startAt,
                    endAt: res.data.endAt,
                    degree: res.data.degree,
                    profession: res.data.profession,
                };
                let eduList = this.state.edu;
                eduList.push(fd);
                this.setState({
                    edu: eduList,
                    schoolName: "",
                    startAt: "",
                    endAt: "",
                    degree: "",
                    profession: "",
                    edit: false,
                    edit_id: 0,
                });
                form.reset();
            })
            .catch((err) => {});
    };

    render() {
        const { startAt, endAt, profession, degree } = this.state;
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
                                ? this.submitEditEdu
                                : this.submitEdu
                        }
                        id={this.state.edit ? this.state.edit_id : null}
                    >
                        <h5 style={{ textAlign: "center" }}>
                            1. Боловсролын талаарх мэдээлэл
                        </h5>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Сургуулийн нэр</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="schoolName"
                                    value={this.state.schoolName}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Сургуулийн нэр"
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Элссэн он, сар</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="month"
                                    name="startAt"
                                    value={startAt}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Элссэн он, сар"
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Эзэмшсэн мэргэжил</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="profession"
                                    value={profession}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Сургуулийн нэр"
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Төгссөн он, сар</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="month"
                                    name="endAt"
                                    value={endAt}
                                    onChange={this.userChange}
                                    className={"bg-light text-dark"}
                                    placeholder="Төгссөн он, сар"
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Эзэмшсэн боловсрол</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="degree"
                                    value={degree}
                                    onChange={this.userChange}
                                >
                                    <option value="1" key="1" id="1">
                                        Бага
                                    </option>
                                    <option value="2" key="2" id="2">
                                        Дунд
                                    </option>
                                    <option value="3" key="3" id="3">
                                        Бүрэн дунд
                                    </option>
                                    <option value="4" key="4" id="4">
                                        Тусгай
                                    </option>
                                    <option value="5" key="5" id="5">
                                        Бакалавр
                                    </option>
                                    <option value="6" key="6" id="6">
                                        Магистр
                                    </option>
                                    <option value="7" key="7" id="7">
                                        Доктор
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
                                <th>Сургуулийн нэр</th>
                                <th>Элссэн он, сар</th>
                                <th>Төгссөн он, сар</th>
                                <th>Эзэмшсэн боловсрол</th>
                                <th>Мэргэжил</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.edu.map((education) => {
                                return (
                                    <tr key={education.id}>
                                        <td>{education.schoolName}</td>
                                        <td>{education.startAt}</td>
                                        <td>{education.endAt}</td>
                                        <td>
                                            {education.degree === 1
                                                ? "Бага"
                                                : education.degree === 2
                                                ? "Дунд"
                                                : education.degree === 3
                                                ? "Бүрэн дунд"
                                                : education.degree === 4
                                                ? "Тусгай"
                                                : education.degree === 5
                                                ? "Бакалавр"
                                                : education.degree === 6
                                                ? "Магистр"
                                                : education.degree === 7
                                                ? "Доктор"
                                                : "none"}
                                        </td>
                                        <td>{education.profession}</td>
                                        <td>
                                            <Button
                                                id={education.id}
                                                variant="outline-info"
                                                onClick={this.editEdu}
                                                size="sm"
                                            >
                                                Засах
                                            </Button>
                                            <Button
                                                id={education.id}
                                                variant="outline-danger"
                                                onClick={this.deleteEdu}
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
                        onClick={() => history.push("/mycv3")}
                    >
                        Дараах
                    </Button>
                </Card.Footer>
            </Card>
        );
    }
}

export default CV2;
