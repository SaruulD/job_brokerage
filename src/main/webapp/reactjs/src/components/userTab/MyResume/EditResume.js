import React from "react";
import JoditEditor from "jodit-react";
import { Card, Button, Form, Col } from "react-bootstrap";
import * as actions from "../../../stores/actions/resume";
import history from "../../../history";

class EditResume extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resume_id: null,
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

    componentDidMount() {
        const resume_id = this.props.match.params.resume_id;
        actions
            .viewResume(resume_id)
            .then((res) => {
                this.setState({
                    resume_id: resume_id,
                    content: res.data.resume,
                    resumeName: res.data.name,
                });
            })
            .catch((err) => {});
    }

    editResume = (event) => {
        event.preventDefault();
        actions
            .editResume(
                this.state.resume_id,
                this.state.resumeName,
                this.state.content
            )
            .then((res) => {
                if (res.data != null) {
                    history.push(`/viewResume/${this.state.resume_id}`);
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
        return (
            <Card
                className={"border border-light bg-light text-dark"}
                style={{ width: "80%", margin: "0 auto" }}
            >
                <Card.Header>Миний анкет</Card.Header>
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
                        onClick={this.editResume}
                    >
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

export default EditResume;
