import React from "react";
import { Card } from "react-bootstrap";
// import Search from "../shared/Search";
import banner from "../../assets/banner.jpg";
import RecommendedJobs from "./RecommendedJobs";
import TopCompanies from "./TopCompanies";

class Home extends React.Component {
    render() {
        return (
            <Card className="bg-light text-dark">
                <img
                    src={banner}
                    alt="banner"
                    style={{ width: "100%", marginBottom: 50 }}
                />
                {/* <Search job={true} /> */}
                {/* <RecommendedJobs /> */}
                {/* <TopCompanies /> */}
            </Card>
        );
    }
}

export default Home;
