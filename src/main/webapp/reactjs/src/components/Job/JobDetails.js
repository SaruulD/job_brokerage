import React from "react";
import logo from "../../assets/reactjs-1.jpg";
import JoditEditor from "jodit-react";
import { Button, Modal, Form } from "react-bootstrap";
import * as actions from "../../stores/actions/resume";
import * as actionsJob from "../../stores/actions/job";
import * as actionsAuth from "../../stores/actions/auth";
import ResumeListItem from "../userTab/MyResume/ResumeListItem";
import { connect } from "react-redux";

class JobDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            resumes: [],
            job_title: "",
            category_id: 0,
            category: "",
            job_type_id: 0,
            job_type: "",
            salary: "",
            description: "",
            ageLimit: null,
            genderLimit: null,
            ageUp: 0,
            ageDn: 0,
            editor: "",
            showDetails: false,
            company_id: 0,
            company: "",
            selectedResume: "",
            authenticated: false,
            username: null,
            loading: false,
            moderator: false,
            role: null,
        };

        this.props.checkLogin();
    }

    config = {
        readonly: true,
        uploader: {
            insertImageAsBase64URI: true,
        },
        spellcheck: false,
        preset: "inline",
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.username !== prevState.username) {
            return {
                username: nextProps.username,
                authenticated: nextProps.authenticated,
                roles: nextProps.roles,
            };
        }
        return null;
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.username !== this.props.username) {
            this.setState({
                username: this.props.username,
                authenticated: this.props.authenticated,
                role: this.props.role,
            });
        }
        if (previousProps.id !== this.props.id) {
            actionsJob
                .JobById(this.props.id)
                .then((res) => {
                    this.setState({
                        jobId: this.props.id,
                        job_title: res.data.job_title,
                        description: res.data.description,
                        category_id: res.data.category_id,
                        job_type_id: res.data.job_type_id,
                        salary: res.data.salary,
                        ageLimit: res.data.ageLimit,
                        genderLimit: res.data.genderLimit,
                        ageDn: res.data.ageDn,
                        ageUp: res.data.ageUp,
                        showDetails: true,
                        company_id: res.data.company.id,
                        company: res.data.company.name,
                    });
                    actionsJob.JobTypeById(res.data.job_type_id).then((res) => {
                        this.setState({
                            job_type: res.data.name,
                        });
                    });
                    actionsJob.JobCatById(res.data.category_id).then((res) => {
                        this.setState({
                            category: res.data.name,
                        });
                    });
                })
                .catch((err) => {});
        }
    }

    changeResume = (event) => {
        this.setState({ selectedResume: event.currentTarget.value });
    };

    sendResume = () => {
        if (this.state.selectedResume !== "") {
            actions
                .sendResume(this.state.selectedResume, this.state.jobId)
                .then((res) => {
                    alert(res.data);
                    this.setState({
                        show: false,
                    });
                });
        }
    };

    handleClose = () =>
        this.setState({
            show: false,
        });
    handleShow = () => {
        actions
            .usersResumeList()
            .then((res) => {
                if (res.data !== "NO_CONTENT") {
                    this.setState({
                        resumes: res.data,
                    });
                }
            })
            .catch((err) => {});
        this.setState({
            show: true,
        });
    };
    render() {
        return (
            <div style={{ backgroundColor: "#fff" }}>
                {this.state.showDetails ? (
                    <div>
                        <img
                            alt="companyLogo"
                            src={logo}
                            width="100%"
                            height="300"
                            className="d-inline-block align-top"
                        />{" "}
                        <div style={{ display: "flex", paddingLeft: 20 }}>
                            <h5 style={{ width: "80%", marginTop: 10 }}>
                                {this.state.job_title}
                            </h5>
                            {this.state.authenticated ? (
                                <Button
                                    variant="success"
                                    onClick={this.handleShow}
                                >
                                    Анкет явуулах
                                </Button>
                            ) : (
                                <div></div>
                            )}
                        </div>
                        <div
                            style={{
                                fontSize: 16,
                                padding: 50,
                                paddingTop: 20,
                                paddingBottom: 20,
                            }}
                        >
                            <div
                                style={{ display: "inline-block", width: 150 }}
                            >
                                Салбар:
                                <br />
                                Нас:
                                <br />
                                Хүйс:
                                <br />
                                Цалин:
                                <br />
                                Ажлын цаг:
                                <br />
                                Компани:
                            </div>
                            <div
                                style={{
                                    display: "inline-block",
                                    fontWeight: "bold",
                                }}
                            >
                                {this.state.category}
                                <br />
                                {this.state.ageLimit === false
                                    ? "Хамаарахгүй"
                                    : this.state.ageDn +
                                      " - " +
                                      this.state.ageUp}
                                <br />
                                {this.state.genderLimit === null
                                    ? "Харгалзахгүй"
                                    : this.state.genderLimit === 0
                                    ? "Эрэгтэй"
                                    : "Эмэгтэй"}
                                <br />
                                {this.state.salary}
                                <br />
                                {this.state.job_type}
                                <br />
                                {this.state.company}
                            </div>
                            <br />
                            <br />
                            <JoditEditor
                                ref={this.state.editor}
                                value={this.state.description}
                                config={this.config}
                                tabIndex={1}
                                onBlur={(newContent) =>
                                    this.setState({ content: newContent })
                                }
                                onChange={(newContent) => {}}
                            />
                        </div>
                    </div>
                ) : (
                    ""
                )}
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Анкетаа сонгоно уу.</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.resumes.length > 0
                            ? this.state.resumes.map((resume) => {
                                  return (
                                      <Form.Check
                                          key={resume.id}
                                          custom
                                          id={resume.id}
                                          name="formResumeSelect"
                                          onChange={this.changeResume}
                                          value={resume.id}
                                          type="radio"
                                          label={
                                              <ResumeListItem
                                                  key={resume.id}
                                                  title={resume.name}
                                                  date={resume.updatedDate}
                                                  id={`${resume.id}`}
                                              />
                                          }
                                      />
                                  );
                              })
                            : ""}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Цуцлах
                        </Button>
                        <Button variant="success" onClick={this.sendResume}>
                            Илгээх
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.token !== null,
        loading: state.auth.loading,
        token: state.auth.token,
        username: state.auth.username,
        role: state.auth.role,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        checkLogin: () => dispatch(actionsAuth.authCheckState()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);
