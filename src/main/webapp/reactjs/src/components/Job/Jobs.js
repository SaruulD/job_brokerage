import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Job from "./Job";
import JobDetails from "./JobDetails";
import InfiniteScroll from "react-infinite-scroll-component";

class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobList: [],
            pageNo: 0,
            job_id: 0,
            loading: false,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.jobList !== prevState.jobList) {
            return { jobList: nextProps.jobList };
        }
        if (nextProps.loading !== prevState.loading) {
            return { loading: nextProps.loading };
        }

        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.jobList !== this.props.jobList) {
            this.setState({
                jobList: this.props.jobList,
            });
        }

        if (prevProps.loading !== this.props.loading) {
            this.setState({
                loading: this.props.loading,
            });
        }
    }

    render() {
        const { jobList } = this.state;
        return (
            <Container style={{ backgroundColor: "#f7f7f7", marginTop: 5 }}>
                <Row style={{ height: "600px" }}>
                    <Col
                        sm={4}
                        style={{
                            height: "600px",
                            overflowY: "auto",
                            paddingLeft: 0,
                            paddingRight: 0,
                        }}
                    >
                        {this.props.saved ? (
                            <div>
                                {jobList.map((job) => (
                                    <Button
                                        variant="light"
                                        style={{ width: "100%" }}
                                        key={job.id}
                                        id={job.id}
                                        onClick={() =>
                                            this.setState({
                                                job_id: job.id,
                                            })
                                        }
                                    >
                                        <Job
                                            id={job.id}
                                            date={job.createdDate}
                                            title={job.job_title}
                                        />
                                    </Button>
                                ))}
                            </div>
                        ) : (
                            <div>
                                {Array.isArray(jobList) ? (
                                    <InfiniteScroll
                                        dataLength={jobList.length}
                                        next={this.props.fetchMoreData}
                                        hasMore={!this.props.loading}
                                        loader={<h4>Loading...</h4>}
                                        style={{ height: "600px" }}
                                    >
                                        {jobList.map((job) => (
                                            <Button
                                                variant="light"
                                                style={{ width: "100%" }}
                                                key={job.id}
                                                id={job.id}
                                                onClick={() =>
                                                    this.setState({
                                                        job_id: job.id,
                                                    })
                                                }
                                            >
                                                <Job
                                                    id={job.id}
                                                    date={job.createdDate}
                                                    title={job.job_title}
                                                />
                                            </Button>
                                        ))}
                                    </InfiniteScroll>
                                ) : (
                                    "No data"
                                )}
                            </div>
                        )}
                    </Col>
                    <Col sm={8} style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <div style={{ height: "600px", overflowY: "scroll" }}>
                            <JobDetails id={this.state.job_id} />
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Jobs;
