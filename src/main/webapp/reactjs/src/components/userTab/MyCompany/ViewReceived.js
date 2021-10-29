import React from "react";
import JoditEditor from "jodit-react";
import { Card, Button } from "react-bootstrap";
import history from "../../../history";
import * as actions from "../../../stores/actions/resume";

class ViewReceived extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resume_id: null,
            editor: "",
            content: "",
            resumeName: "",
        };
    }

    componentDidMount() {
        const resume_id = this.props.match.params.resume_id;
        actions
            .receivedResume(resume_id)
            .then((res) => {
                this.setState({
                    resume_id: resume_id,
                    content: res.data.resume,
                    resumeName: res.data.resume_name,
                });
            })
            .catch((err) => {});
    }

    // all options from https://xdsoft.net/jodit/doc/
    config = {
        readonly: true,
        uploader: {
            insertImageAsBase64URI: true,
        },
        spellcheck: false,
        preset: "inline",
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
                <Card.Header
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <div style={{ paddingTop: 10 }}>Ирсэн танилцуулга</div>
                </Card.Header>
                <Card.Body>
                    <h5>{this.state.resumeName}</h5>
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
                        variant="info"
                        onClick={() => history.goBack()}
                    >
                        Буцах
                    </Button>
                </Card.Footer>
            </Card>
        );
    }
}

export default ViewReceived;
