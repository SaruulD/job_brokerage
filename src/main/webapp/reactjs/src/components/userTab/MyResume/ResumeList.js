import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as actions from "../../../stores/actions/resume";
import ResumeListItem from "./ResumeListItem";
import history from "../../../history";

class ResumeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resumes: [],
        };
    }

    // async
    componentDidMount() {
        // await this.props.checkLogin()   required connect
        actions
            .usersResumeList()
            .then((res) => {
                if (res.data === "NO_CONTENT") {
                    history.push("/createprofile");
                } else {
                    this.setState({
                        resumes: res.data,
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
                <Card.Header
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <div style={{ paddingTop: 10 }}>Миний танилцуулгууд</div>
                    <div>
                        <Link to="createresume" style={{ marginRight: 10 }}>
                            <Button variant="outline-success">
                                Анкетнаас үүсгэх
                            </Button>
                        </Link>
                        <Link to="myresume">
                            <Button variant="outline-success">
                                Товч намтар нэмэх
                            </Button>
                        </Link>
                    </div>
                </Card.Header>
                <Card.Body>
                    {this.state.resumes.map((resume) => {
                        return (
                            <ResumeListItem
                                key={resume.id}
                                title={resume.name}
                                date={resume.updatedDate}
                                id={`${resume.id}`}
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

export default ResumeList;
