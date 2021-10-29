import React from 'react';
import { Navbar, Container, Col } from 'react-bootstrap';

class Footer extends React.Component {
    render() {
        let fullYear = new Date().getFullYear();

        return (
            <Navbar fixed="bottom" bg="light" variant="light">
                <Container>
                    <Col lg={12} className="text-center text-muted">
                        <div>© {fullYear} Ajil.mn. All rights reserved.</div>
                    </Col>
                </Container>
            </Navbar>
        )
    }
}

export default Footer;