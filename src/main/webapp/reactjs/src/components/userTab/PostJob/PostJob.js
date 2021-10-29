import React from "react";
import { Card, Button, Form, Col } from "react-bootstrap";
import JoditEditor from "jodit-react";
import * as actions from "../../../stores/actions/job";
import * as actionsCompany from "../../../stores/actions/company";
import history from "../../../history";

class PostJob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editor: null,
            content: "",
            ageLimit: false,
            ageUp: 0,
            ageDn: 0,
            genderLimit: false,
            job_title: "",
            salary: "Цалин тохиролцоно",
            selectCatList: "",
            selectTypeList: "",
            selectCompanyList: "",
            jobCategoryList: [],
            jobTypeList: [],
            companies: [],
            validated: false,
        };
    }

    componentDidMount() {
        actions
            .jobCategoryList()
            .then((res) => {
                this.setState({
                    jobCategoryList: res.data,
                });
            })
            .catch((err) => {});

        actions
            .jobTypeList()
            .then((res) => {
                this.setState({
                    jobTypeList: res.data,
                });
            })
            .catch((err) => {});

        actionsCompany
            .usersCompanyList()
            .then((res) => {
                this.setState({
                    companies: res.data,
                });
            })
            .catch((err) => {});
    }

    // rich text
    config = {
        readonly: false,
        uploader: {
            insertImageAsBase64URI: true,
        },
        spellcheck: false,
    };

    handleChange = (event) => {
        this.setState({
            ageLimit: event.target.checked,
        });
        if (!this.state.ageLimit) {
            this.setState({
                ageDn: 0,
                ageUp: 0,
            });
        }
    };

    handleGender = (event) => {
        this.setState({
            selectedGender: event.target.options.selectedIndex,
        });
    };

    handleGenderLimit = (event) => {
        this.setState({
            genderLimit: event.target.checked,
        });
    };

    handleJobType = (event) => {
        if (event.target.options.selectedIndex !== 0) {
            this.setState({
                selectTypeList: event.target.options.selectedIndex,
            });
        } else {
            this.setState({
                selectTypeList: "",
            });
        }
    };

    handleJobCategory = (event) => {
        if (event.target.options.selectedIndex !== 0) {
            this.setState({
                selectCatList: event.target.options.selectedIndex,
            });
        } else {
            this.setState({
                selectCatList: "",
            });
        }
    };

    handleCompany = (event) => {
        if (event.target.options.selectedIndex !== 0) {
            this.setState({
                selectCompanyList: event.target.options.selectedIndex,
            });
        } else {
            this.setState({
                selectCompanyList: "",
            });
        }
    };

    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.setState({
            validated: true,
        });
        this.postJob();
    };

    postJob = (event) => {
        actions
            .postJob(
                this.state.selectCompanyList,
                this.state.job_title,
                this.state.selectCatList,
                this.state.selectTypeList,
                this.state.genderLimit,
                this.state.ageUp,
                this.state.ageDn,
                this.state.content,
                this.state.salary,
                this.state.ageLimit,
                this.state.selectedGender
            )
            .then((res) => {
                if (res.data != null) {
                    history.push("/");
                }
            })
            .catch((err) => {});
    };

    render() {
        return (
            <Card
                className={"border border-light bg-light text-dark"}
                style={{ width: "80%", margin: "0 auto" }}
            >
                <Card.Header>Ажлын зар оруулах</Card.Header>
                <Form
                    noValidate
                    validated={this.state.validated}
                    onSubmit={this.handleSubmit}
                >
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Компани</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={this.handleCompany}
                                    isInvalid={
                                        this.state.selectCompanyList === ""
                                    }
                                >
                                    <option>---Компани сонгоно уу.---</option>
                                    {this.state.companies.length
                                        ? this.state.companies.map((data) => (
                                              <option
                                                  key={data.id}
                                                  data_key={data.id}
                                                  value={data.id}
                                              >
                                                  {data.name}
                                              </option>
                                          ))
                                        : ""}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Компани сонгоно уу.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="postjob_jobTitle">
                                <Form.Label>Ажлын нэр</Form.Label>
                                <Form.Control
                                    autoComplete="off"
                                    type="text"
                                    name="job_title"
                                    value={this.state.job_title}
                                    onChange={(e) =>
                                        this.setState({
                                            job_title: e.target.value,
                                        })
                                    }
                                    className={"bg-light text-dark"}
                                    placeholder="Ажлын нэр"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ажлын нэрээ оруулна уу.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Салбар</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={this.handleJobCategory}
                                    isInvalid={this.state.selectCatList === ""}
                                >
                                    <option>---Салбар сонгоно уу.---</option>
                                    {this.state.jobCategoryList.length
                                        ? this.state.jobCategoryList.map(
                                              (data) => (
                                                  <option
                                                      key={data.id}
                                                      data_key={data.id}
                                                      value={data.name}
                                                  >
                                                      {data.name}
                                                  </option>
                                              )
                                          )
                                        : ""}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Салбар сонгоно уу.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Цалин</Form.Label>
                                <Form.Control
                                    required
                                    autoComplete="off"
                                    type="text"
                                    name="salary"
                                    value={this.state.salary}
                                    onChange={(e) =>
                                        this.setState({
                                            salary: e.target.value,
                                        })
                                    }
                                    className={"bg-light text-dark"}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Цалин оруулна уу.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} controlId="postjob_jobType">
                                <Form.Label>Ажлын цаг</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={this.handleJobType}
                                    isInvalid={this.state.selectTypeList === ""}
                                >
                                    <option>---Ажлын цаг сонгоно уу.---</option>
                                    {this.state.jobTypeList.length
                                        ? this.state.jobTypeList.map((data) => (
                                              <option
                                                  key={data.id}
                                                  data_key={data.id}
                                                  value={data.name}
                                              >
                                                  {data.name}
                                              </option>
                                          ))
                                        : ""}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Ажлын цаг сонгоно уу.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formBasicCheckbox1">
                                <Form.Check
                                    type="checkbox"
                                    label="Насны хязгаартай эсэх"
                                    checked={this.state.ageLimit}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        {this.state.ageLimit ? (
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Насны доод хязгаар</Form.Label>
                                    <Form.Control
                                        required
                                        autoComplete="off"
                                        type="number"
                                        name="ageDn"
                                        value={this.state.ageDn}
                                        onChange={(e) =>
                                            this.setState({
                                                ageDn: e.target.value,
                                            })
                                        }
                                        className={"bg-light text-dark"}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Насны дээд хязгаар</Form.Label>
                                    <Form.Control
                                        required
                                        autoComplete="off"
                                        type="number"
                                        name="ageUp"
                                        value={this.state.ageUp}
                                        onChange={(e) =>
                                            this.setState({
                                                ageUp: e.target.value,
                                            })
                                        }
                                        className={"bg-light text-dark"}
                                    />
                                </Form.Group>
                            </Form.Row>
                        ) : (
                            ""
                        )}

                        <Form.Row>
                            <Form.Group as={Col} controlId="formBasicCheckbox2">
                                <Form.Check
                                    type="checkbox"
                                    label="Хүйс хамаарах эсэх"
                                    checked={this.state.genderLimit}
                                    onChange={this.handleGenderLimit}
                                />
                            </Form.Group>
                        </Form.Row>
                        {this.state.genderLimit ? (
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Хүйс</Form.Label>
                                    <Form.Control
                                        as="select"
                                        onChange={this.handleGender}
                                    >
                                        <option>Эрэгтэй</option>
                                        <option>Эмэгтэй</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        ) : (
                            ""
                        )}
                        <Form.Row>
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
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer>
                        <Button size="sm" variant="success" type="submit">
                            Зар оруулах
                        </Button>
                        <Button
                            size="sm"
                            variant="danger"
                            style={{ marginLeft: 15 }}
                            onClick={() => history.goBack()}
                        >
                            Буцах
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        );
    }
}

export default PostJob;
