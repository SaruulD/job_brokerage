import React, { Component } from "react";
import { FormControl, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import * as actions from "../../stores/actions/job";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobCategoryList: [],
            jobTypeList: [],
            selectCatList: "",
            selectTypeList: "",
            selectPostedDate: "",
            postedDate: [],
            searchText: "",
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

        actions
            .jobPostedDate()
            .then((res) => {
                this.setState({
                    postedDate: res.data,
                });
            })
            .catch((err) => {});
    }

    doSearch = () => {
        this.props.searchHandler(
            this.state.searchText,
            this.state.selectCatList,
            this.state.selectTypeList,
            this.state.selectPostedDate
        );
    };

    companySearch = () => {
        this.props.searchHandler(this.state.searchText);
    };

    handleSearchText = (event) => {
        this.setState({
            searchText: event.target.value,
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

    handlePostedDate = (event) => {
        if (event.target.options.selectedIndex !== 0) {
            this.setState({
                selectPostedDate: event.target.options.selectedIndex,
            });
        } else {
            this.setState({
                selectPostedDate: "",
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

    handleKeyDown = (e) => {
        if (e.key === "Enter") {
            this.doSearch();
        }
    };

    render() {
        return (
            <Form
                inline
                style={{
                    backgroundColor: "#fff",
                    alignSelf: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <FormControl
                    type="text"
                    placeholder="Хайх"
                    name="searchText"
                    value={this.state.searchText}
                    onKeyDown={this.handleKeyDown}
                    onChange={this.handleSearchText}
                    onKeyPress={(e) => {
                        e.key === "Enter" && e.preventDefault();
                    }}
                />
                {this.props.job ? (
                    <Button
                        variant="outline-success"
                        className=" mr-sm-2"
                        onClick={this.doSearch}
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
                ) : (
                    <Button
                        variant="outline-success"
                        className=" mr-sm-2"
                        onClick={this.companySearch}
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
                )}

                {this.props.job ? (
                    <div>
                        <Form.Control
                            as="select"
                            onChange={this.handleJobCategory}
                        >
                            <option>---Салбар---</option>
                            {this.state.jobCategoryList.length
                                ? this.state.jobCategoryList.map((data) => (
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

                        <Form.Control
                            as="select"
                            onChange={this.handleJobType}
                            style={{ marginLeft: 5 }}
                        >
                            <option>---Ажлын цаг---</option>
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

                        <Form.Control
                            as="select"
                            onChange={this.handlePostedDate}
                            style={{ marginLeft: 5 }}
                        >
                            <option>---Нийтлэгдсэн хугацаа---</option>
                            {this.state.postedDate.length
                                ? this.state.postedDate.map((data) => (
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
                    </div>
                ) : (
                    <div></div>
                )}
            </Form>
        );
    }
}

export default Search;
