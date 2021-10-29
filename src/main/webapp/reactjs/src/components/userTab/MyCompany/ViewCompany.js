import React from "react";
import JoditEditor from "jodit-react";
import { Card, Button, Modal, Form, FormControl } from "react-bootstrap";
import * as actions from "../../../stores/actions/company";
import * as actionsJob from "../../../stores/actions/job";
import history from "../../../history";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PostedJob from "../../Company/PostedJob";
import SearchUser from "./SearchUser";

class ViewCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company_id: null,
            name: "",
            location: "",
            description: "",
            created_at: "",
            editor: "",
            jobList: [],
            userResult: [],
            searchText: "",
            moderators: [],
        };
    }

    componentDidMount() {
        const company_id = this.props.match.params.company_id;
        actions
            .companyById(company_id)
            .then((res) => {
                this.setState({
                    company_id: company_id,
                    name: res.data.name,
                    location: res.data.location,
                    description: res.data.description,
                    created_at: res.data.created_at,
                });
                actionsJob.jobByCompany(company_id).then((res) => {
                    this.setState({
                        jobList: res.data,
                    });
                });
                actions.moderatorList(company_id).then((res) => {
                    console.log(res.data);
                    this.setState({
                        moderators: res.data,
                    });
                });
            })
            .catch((err) => {});
    }

    handleClose = () =>
        this.setState({
            show: false,
        });
    handleShow = () => {
        this.setState({
            show: true,
        });
    };

    // all options from https://xdsoft.net/jodit/doc/
    config = {
        readonly: true,
        uploader: {
            insertImageAsBase64URI: true,
        },
        spellcheck: false,
        preset: "inline",
    };

    searchUser = () => {
        actions.searchUser(this.state.searchText).then((res) => {
            this.setState({
                userResult: res.data,
            });
        });
    };

    deleteCompany = (event) => {
        actions
            .deleteCompany(this.state.company_id)
            .then((res) => {
                alert("Success");
                history.push("/mycompany");
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
                <Card.Header
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <div style={{ paddingTop: 10 }}>Миний компани</div>
                    <Button variant="outline-success" onClick={this.handleShow}>
                        Хүний нөөц нэмэх
                    </Button>
                </Card.Header>
                <Card.Body>
                    <h5>{this.state.name}</h5>
                    <div style={{ display: "inline-block", width: 150 }}>
                        Байршил:
                    </div>
                    <div
                        style={{
                            display: "inline-block",
                            fontWeight: "bold",
                        }}
                    >
                        {this.state.location}
                    </div>
                    <br />
                    <br />
                    <JoditEditor
                        ref={this.state.editor}
                        value={this.state.description}
                        config={this.config}
                        tabIndex={1} // tabIndex of textarea
                        onChange={(newContent) => {}}
                    />

                    {Array.isArray(this.state.moderators) ? (
                        <div>
                            <h5>Хүний нөөцийн ажилтнууд:</h5>
                            {this.state.moderators.map((moderator) => (
                                <div key={moderator[1]}>
                                    <div
                                        style={{
                                            display: "inline-block",
                                            paddingLeft: 20,
                                            paddingRight: 20,
                                        }}
                                    >
                                        ●
                                    </div>
                                    <div
                                        style={{
                                            display: "inline-block",
                                            width: "20%",
                                        }}
                                    >
                                        {moderator[9]}
                                    </div>
                                    <div
                                        style={{
                                            display: "inline-block",
                                            width: "50%",
                                        }}
                                    >
                                        {moderator[8]} овогтой {moderator[4]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        ""
                    )}

                    {this.state.jobList.length > 0 ? (
                        <div style={{ marginTop: 10 }}>
                            <h5>Оруулсан зарууд:</h5>
                            {this.state.jobList.map((job) => (
                                <PostedJob
                                    moderator={true}
                                    key={job.id}
                                    id={job.id}
                                    title={job.job_title}
                                    date={job.createdDate}
                                    received_cv={job.received_cv}
                                />
                            ))}
                        </div>
                    ) : (
                        ""
                    )}
                </Card.Body>
                <Card.Footer
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <Button
                            size="sm"
                            variant="info"
                            onClick={() =>
                                history.push(
                                    `/editcompany/${this.state.company_id}`
                                )
                            }
                        >
                            Засах
                        </Button>
                        <Button
                            size="sm"
                            variant="info"
                            onClick={() => history.goBack()}
                            style={{ marginLeft: 15 }}
                        >
                            Буцах
                        </Button>
                    </div>
                    <Button
                        size="sm"
                        variant="danger"
                        onClick={this.deleteCompany}
                    >
                        Устгах
                    </Button>
                </Card.Footer>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Хүний нөөц нэмэх</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            inline
                            style={{
                                backgroundColor: "#fff",
                                alignSelf: "center",
                                alignItems: "center",
                                textAlign: "center",
                            }}
                        >
                            <div style={{ width: "100%" }}>
                                <FormControl
                                    type="text"
                                    placeholder="Хайх"
                                    name="searchText"
                                    value={this.state.searchText}
                                    onKeyDown={this.handleKeyDown}
                                    onChange={this.userChange}
                                    onKeyPress={(e) => {
                                        e.key === "Enter" && e.preventDefault();
                                    }}
                                />
                                <Button
                                    variant="outline-success"
                                    className=" mr-sm-2"
                                    onClick={this.searchUser}
                                >
                                    <FontAwesomeIcon icon={faSearch} />
                                </Button>
                            </div>
                            <br />
                            {Array.isArray(this.state.userResult) ? (
                                <div>
                                    {this.state.userResult.map((user) => {
                                        return (
                                            <SearchUser
                                                key={user.id}
                                                username={user.username}
                                                id={user.id}
                                                companyId={
                                                    this.state.company_id
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            ) : (
                                ""
                            )}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </Modal>
            </Card>
        );
    }
}

export default ViewCompany;
