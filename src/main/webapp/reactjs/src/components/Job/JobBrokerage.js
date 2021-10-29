import React, { Component } from "react";
import Search from "../shared/Search";
import Jobs from "./Jobs";
import * as actions from "../../stores/actions/job";

class JobBrokerage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobList: [],
            pageNo: 0,
            selectCatList: "",
            selectTypeList: "",
            selectPostedDate: "",
            searchText: "",
            hasMore: true,
            loading: false,
        };
    }

    fetchMoreData = () => {
        const {
            pageNo,
            searchText,
            selectCatList,
            selectTypeList,
            selectPostedDate,
            jobList,
        } = this.state;
        setTimeout(() => {
            this.setState({
                loading: true,
                pageNo: pageNo + 1,
            });
            actions
                .searchJob(
                    searchText,
                    selectCatList,
                    selectTypeList,
                    selectPostedDate,
                    pageNo
                )
                .then((res) => {
                    this.setState({
                        jobList: jobList.concat(res.data.content),
                        loading: false,
                    });
                })
                .catch((err) => {
                    this.setState({
                        loading: false,
                    });
                });
        }, 1500);
    };

    componentDidMount() {
        actions
            .searchJob("", "", "", "", this.state.pageNo)
            .then((res) => {
                this.setState({
                    jobList: res.data.content,
                    pageNo: this.state.pageNo + 1,
                });
            })
            .catch((err) => {});
    }

    searchHandler = (
        searchText,
        selectCatList,
        selectTypeList,
        selectPostedDate
    ) => {
        actions
            .searchJob(
                searchText,
                selectCatList,
                selectTypeList,
                selectPostedDate,
                0
            )
            .then((res) => {
                this.setState({
                    jobList: res.data.content,
                    // loading: true,
                });
            })
            .catch((err) => {});
    };

    render() {
        return (
            <div>
                <Search job={true} searchHandler={this.searchHandler} />
                <Jobs
                    jobList={this.state.jobList}
                    fetchMoreData={this.fetchMoreData}
                    loading={this.state.loading}
                />
            </div>
        );
    }
}

export default JobBrokerage;
