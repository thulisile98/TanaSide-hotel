import React from 'react'
import { Container } from 'react-bootstrap';
import { Col, Row } from "react-bootstrap"

const Footer = () => {

    let today = new Date()
  return (

    <footer className="bg-dark text-light py-3 footer mt-lg-5">
       <Container>
        <Row>
            <Col xs={12} md={12}  className="text-center">

            <p>
                &copy;{ today.getFullYear()} Mpumalanga Hotel
            </p>
            </Col>
        </Row>
       </Container>

        </footer>
  )
}

export default Footer