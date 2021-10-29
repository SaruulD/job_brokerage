import React, { Component } from 'react'
import { Card, Button, Form, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class ChangePass extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            oldPass: '', newPass: ''
        }
    }

    userChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    
    render() {
        const {oldPass, newPass} = this.state;
        return (
            <Card className={"border border-light bg-light text-dark"} style={{width: '80%', margin: '0 auto'}}>
                <Card.Header>Миний бүртгэл</Card.Header>
                    <Form>
                    <Card.Body>
                        
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Хуучин нууц үг</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="password" name="oldPass"
                                    value={oldPass}
                                    onChange={this.userChange} 
                                    className={"bg-light text-dark"}
                                    placeholder="Хуучин нууц үг"
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Шинэ нууц үг</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="password" name="newPass"
                                    value={newPass}
                                    onChange={this.userChange} 
                                    className={"bg-light text-dark"}
                                    placeholder="Шинэ нууц үг"
                                />
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    </Form>
                    <Card.Footer>
                        <Link to={"myaccount"} style={{display: 'inline-block'}} className="nav-link">{<Button size="sm" variant="success">Хадгалах</Button>}</Link>
                        <Link to={"myaccount"} style={{display: 'inline-block'}} className="nav-link">{<Button size="sm" variant="danger">Буцах</Button>}</Link>
                    </Card.Footer>
            </Card>
        )
    }
}

export default ChangePass
