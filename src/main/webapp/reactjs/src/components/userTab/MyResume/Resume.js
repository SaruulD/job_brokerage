import React from "react";
import JoditEditor from "jodit-react";
import { Card, Button, Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as actions from "../../../stores/actions/resume";
import history from "../../../history";

class Resume extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editor: "",
            content: "",
            resumeName: "",
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

    render() {
        // if (this.props.authenticated === true) {
        //     return <Redirect to="/" />;
        // }
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

export default Resume;
