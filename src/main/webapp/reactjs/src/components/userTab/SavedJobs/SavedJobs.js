import React, { Component } from "react";
import Jobs from "../../Job/Jobs";
import * as actions from "../../../stores/actions/user";

class SavedJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobList: [],
        };
    }

    componentDidMount() {
        actions
            .getFavList()
            .then((res) => {
                this.setState({
                    jobList: res.data,
                });
            })
            .catch((err) => {});
    }

    render() {
        return (
            <div>
                <Jobs saved={true} jobList={this.state.jobList} />
            </div>
        );
    }
}

export default SavedJobs;
