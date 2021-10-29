import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MyCompany from "./MyCompany";
import * as actions from "../../../stores/actions/company";

class MyCompanies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
        };
    }

    componentDidMount() {
        actions
            .usersCompanyList()
            .then((res) => {
                this.setState({
                    companies: res.data,
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
                <Card.Header
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <div style={{ paddingTop: 10 }}>Миний компаниуд</div>
                    <Link to="addcompany">
                        <Button variant="outline-success">Компани нэмэх</Button>
                    </Link>
                </Card.Header>
                <Card.Body>
                    {this.state.companies.map((company) => {
                        return (
                            <MyCompany
                                key={company.id}
                                id={`${company.id}`}
                                title={company.name}
                                detail={company.received_cv}
                                url={`/editcompany/${company.id}`}
                            />
                        );
                    })}
                </Card.Body>
                <Card.Footer>
                    <Link to={""} className="nav-link">
                        {
                            <Button size="sm" variant="info">
                                Нүүр хуудас руу буцах
                            </Button>
                        }
                    </Link>
                </Card.Footer>
            </Card>
        );
    }
}

export default MyCompanies;
