import React, { Component } from "react";
import ReceivedResume from "./ReceivedResume";
import { Card, Button } from "react-bootstrap";
import history from "../../../history";
import * as actions from "../../../stores/actions/resume";

class ReceivedResumes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resumes: [],
        };
    }

    componentDidMount() {
        const job_id = this.props.match.params.job_id;
        actions
            .jobResumes(job_id)
            .then((res) => {
                this.setState({
                    resumes: res.data,
                });
            })
            .catch((err) => {});
    }

    render() {
        return (
            <Card
                className={"border border-light bg-light text-dark"}
                style={{ width: "80%", margin: "0 auto" }}
            >
                <Card.Header>
                    <div style={{ paddingTop: 10 }}>Ирсэн танилцуулгууд</div>
                </Card.Header>
                <Card.Body>
                    {this.state.resumes.map((resume) => {
                        return (
                            <ReceivedResume
                                key={resume.id}
                                id={`${resume.id}`}
                                name={resume.resume_name}
                                user={resume.user}
                            />
                        );
                    })}
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

export default ReceivedResumes;
