import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Info from "./Info";
import * as actionsUser from "../../../stores/actions/user";

class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            number: "",
        };
    }

    componentDidMount() {
        actionsUser
            .userGetAccount()
            .then((res) => {
                this.setState({
                    email: res.email,
                    name: res.username,
                    number: res.phoneNumber,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            email: nextProps.email,
            name: nextProps.username,
            number: nextProps.phoneNumber,
            authenticated: nextProps.authenticated,
        });
    }

    userChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        const { email, name, number } = this.state;
        return (
            <Card
                className={"border border-light bg-light text-dark"}
                style={{ width: "80%", margin: "0 auto" }}
            >
                <Card.Header>Миний бүртгэл</Card.Header>
                <Card.Body>
                    <Info title="Цахим шуудан" detail={email} />
                    <Info title="Нэр" detail={name} />
                    <Info title="Утасны дугаар" detail={number} />
                    <Info
                        title="Нууц үг"
                        detail="●●●●●●●●"
                        url="change_password"
                    />
                </Card.Body>
                <Card.Footer>
                    <Link to={""} className="nav-link">
                        {
                            <Button size="sm" variant="success">
                                Нүүр хуудас руу буцах
                            </Button>
                        }
                    </Link>
                </Card.Footer>
            </Card>
        );
    }
}

export default MyAccount;
