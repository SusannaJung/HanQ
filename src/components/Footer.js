// import node module libraries
import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Fragment>
      <div className="footer">
        <Container>
          <Row className="align-items-center g-0 border-top py-2">
            {/* Desc */}
            <Col className="text-center">
              <span>© 2022 WALAB. All Rights Reserved.</span>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default Footer;
