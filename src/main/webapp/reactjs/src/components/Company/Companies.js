import React, { Component } from "react";
import Company from "./Company";
import CompanyDetails from "./CompanyDetails";
import { Container, Row, Col, Button } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

class Companies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyList: [],
            pageNo: 0,
            company_id: "",
            loading: false,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.companyList !== prevState.companyList) {
            return { companyList: nextProps.companyList };
        }
        if (nextProps.loading !== prevState.loading) {
            return { loading: nextProps.loading };
        }

        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.companyList !== this.props.companyList) {
            this.setState({
                companyList: this.props.companyList,
            });
        }

        if (prevProps.loading !== this.props.loading) {
            this.setState({
                loading: this.props.loading,
            });
        }
    }

    render() {
        const { companyList } = this.state;
        return (
            <Container style={{ backgroundColor: "#f7f7f7", marginTop: 5 }}>
                <Row style={{ height: "80vh" }}>
                    <Col
                        sm={4}
                        style={{
                            height: "80vh",
                            overflowY: "scroll",
                            paddingLeft: 0,
                            paddingRight: 0,
                        }}
                    >
                        {companyList.length > 0 ? (
                            <InfiniteScroll
                                dataLength={companyList.length}
                                next={this.props.fetchMoreData}
                                hasMore={!this.props.loading}
                                loader={<h4>Loading...</h4>}
                                style={{ height: "600px" }}
                            >
                                {companyList.map((company) => (
                                    <Button
                                        variant="light"
                                        style={{ width: "100%" }}
                                        key={company.id}
                                        id={company.id}
                                        onClick={() =>
                                            this.setState({
                                                company_id: company.id,
                                            })
                                        }
                                    >
                                        <Company
                                            id={company.id}
                                            title={company.name}
                                            jobCount={company.jobCount}
                                        />
                                    </Button>
                                ))}
                            </InfiniteScroll>
                        ) : (
                            "No data"
                        )}
                    </Col>
                    <Col sm={8} style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <div
                            style={{
                                height: "80vh",
                                overflowY: "scroll",
                                backgroundColor: "#fff",
                            }}
                        >
                            <CompanyDetails id={this.state.company_id} />
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Companies;
