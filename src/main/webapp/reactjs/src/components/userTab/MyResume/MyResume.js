import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import history from "../../../history";

class MyResume extends Component {
    goBack = () => {
        history.goBack();
    };

    render() {
        return (
            <Card
                className={"border border-light bg-light text-dark"}
                style={{ width: "80%", margin: "0 auto" }}
            >
                <Card.Header>Миний танилцуулга</Card.Header>
                <Card.Body>
                    <div
                        style={{
                            width: "100%",
                            margin: "0 auto",
                            textAlign: "center",
                        }}
                    >
                        <Link to={"mycv2"} className="nav-link">
                            {
                                <Button
                                    size="lg"
                                    style={{ width: 200 }}
                                    variant="outline-dark"
                                >
                                    Анкет
                                </Button>
                            }
                        </Link>
                    </div>
                    <div
                        style={{
                            width: "100%",
                            margin: "0 auto",
                            textAlign: "center",
                            marginTop: 20,
                        }}
                    >
                        <Link to={"myresumelist"} className="nav-link">
                            {
                                <Button
                                    size="lg"
                                    style={{ width: 200 }}
                                    variant="outline-dark"
                                >
                                    Товч намтар
                                </Button>
                            }
                        </Link>
                    </div>
                </Card.Body>
                <Card.Footer>
                    <Button size="sm" variant="info" onClick={this.goBack}>
                        Буцах
                    </Button>
                </Card.Footer>
            </Card>
        );
    }
}

export default MyResume;
