import React from "react";
import "./App.css";
import { Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./components/shared/NavigationBar";
import Footer from "./components/shared/Footer";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Signup2 from "./components/Signup/Signup2";
import JobBrokerage from "./components/Job/JobBrokerage";
import Home from "./components/Home/Home";
import MyAccount from "./components/userTab/MyAccount/MyAccount";
import ChangePass from "./components/userTab/MyAccount/ChangePass";
import MyResume from "./components/userTab/MyResume/MyResume";
import CompanyMain from "./components/Company/CompanyMain";
import CreateProfile from "./components/userTab/MyProfile/CreateProfile";
import CV2 from "./components/userTab/MyResume/CV2";
import CV3 from "./components/userTab/MyResume/CV3";
import CV4 from "./components/userTab/MyResume/CV4";
import Resume from "./components/userTab/MyResume/Resume";
import ViewResume from "./components/userTab/MyResume/ViewResume";
import EditResume from "./components/userTab/MyResume/EditResume";
import ResumeList from "./components/userTab/MyResume/ResumeList";
import MyCompanies from "./components/userTab/MyCompany/MyCompanies";
import MyProfile from "./components/userTab/MyProfile/MyProfile";
import EditProfile from "./components/userTab/MyProfile/EditProfile";
import AddCompany from "./components/userTab/MyCompany/AddCompany";
import EditCompany from "./components/userTab/MyCompany/EditCompany";
import PostJob from "./components/userTab/PostJob/PostJob";
import { Container, Row, Col } from "react-bootstrap";
import history from "./history";
import ViewCompany from "./components/userTab/MyCompany/ViewCompany";
import EditJob from "./components/userTab/PostJob/EditJob";
import SavedJobs from "./components/userTab/SavedJobs/SavedJobs";
import CreateResume from "./components/userTab/MyResume/CreateResume";
import ReceivedResumes from "./components/userTab/MyCompany/ReceivedResumes";
import ViewReceived from "./components/userTab/MyCompany/ViewReceived";

function App() {
    const marginTop = {
        marginTop: "20px",
        marginBottom: "50px",
    };

    return (
        <Router history={history}>
            <NavigationBar />
            <Container>
                <Row>
                    <Col style={marginTop}>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/signin" exact component={Signin} />
                            <Route path="/signup" exact component={Signup} />
                            <Route path="/signup2" exact component={Signup2} />
                            <Route
                                path="/myaccount"
                                exact
                                component={MyAccount}
                            />
                            <Route
                                path="/change_password"
                                exact
                                component={ChangePass}
                            />
                            <Route
                                path="/mycompany"
                                exact
                                component={MyCompanies}
                            />
                            <Route
                                path="/addcompany"
                                exact
                                component={AddCompany}
                            />
                            <Route
                                path="/myintroduction"
                                exact
                                component={MyResume}
                            />
                            <Route
                                path="/createprofile"
                                exact
                                component={CreateProfile}
                            />
                            <Route
                                path="/myprofile"
                                exact
                                component={MyProfile}
                            />
                            <Route
                                path="/editprofile/:profile_id"
                                render={(props) => <EditProfile {...props} />}
                            />
                            <Route path="/mycv2" exact component={CV2} />
                            <Route path="/mycv3" exact component={CV3} />
                            <Route path="/mycv4" exact component={CV4} />
                            <Route path="/myresume" exact component={Resume} />
                            <Route
                                path="/viewresume/:resume_id"
                                render={(props) => <ViewResume {...props} />}
                            />
                            <Route
                                path="/viewreceived/:resume_id"
                                render={(props) => <ViewReceived {...props} />}
                            />
                            <Route
                                path="/receivedresumes/:job_id"
                                render={(props) => (
                                    <ReceivedResumes {...props} />
                                )}
                            />
                            <Route
                                path="/editresume/:resume_id"
                                render={(props) => <EditResume {...props} />}
                            />
                            <Route
                                path="/myresumelist"
                                exact
                                component={ResumeList}
                            />
                            <Route
                                path="/editcompany/:company_id"
                                render={(props) => <EditCompany {...props} />}
                            />
                            <Route
                                path="/viewcompany/:company_id"
                                render={(props) => <ViewCompany {...props} />}
                            />
                            <Route
                                path="/editjob/:job_id"
                                render={(props) => <EditJob {...props} />}
                            />
                            <Route
                                path="/jobs"
                                exact
                                component={JobBrokerage}
                            />
                            <Route
                                path="/createresume"
                                exact
                                component={CreateResume}
                            />
                            <Route
                                path="/savedJobs"
                                exact
                                component={SavedJobs}
                            />
                            <Route
                                path="/companies"
                                exact
                                component={CompanyMain}
                            />
                            <Route path="/postjob" exact component={PostJob} />
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </Router>
    );
}

export default App;
