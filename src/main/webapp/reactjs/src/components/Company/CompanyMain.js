import React, { Component } from "react";
import Companies from "./Companies";
import Search from "../shared/Search";
import * as actions from "../../stores/actions/company";

class CompanyMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyList: [],
            pageNo: 0,
            searchText: "",
            hasMore: true,
            loading: false,
        };
    }

    fetchMoreData = () => {
        const { pageNo, searchText, companyList } = this.state;
        setTimeout(() => {
            this.setState({
                loading: true,
                pageNo: pageNo + 1,
            });
            actions
                .searchCompany(searchText, pageNo)
                .then((res) => {
                    this.setState({
                        companyList: companyList.concat(res.data.content),
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
            .searchCompany("", this.state.pageNo)
            .then((res) => {
                this.setState({
                    companyList: res.data.content,
                    pageNo: this.state.pageNo + 1,
                });
            })
            .catch((err) => {});
    }

    searchHandler = (searchText) => {
        actions
            .searchCompany(searchText, 0)
            .then((res) => {
                this.setState({
                    companyList: res.data.content,
                    // loading: true,
                });
            })
            .catch((err) => {});
    };
    render() {
        return (
            <div>
                <Search searchHandler={this.searchHandler} />
                <Companies
                    companyList={this.state.companyList}
                    fetchMoreData={this.fetchMoreData}
                    loading={this.state.loading}
                />
            </div>
        );
    }
}

export default CompanyMain;
