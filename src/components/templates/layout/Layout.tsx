import "./Layout.scss"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from "react-router-dom";

export default function Layout(props:any) {
  
  const getBackButton = () => {
    if(props.backLink) {
      return (
        <Link to="/">Go back</Link>
      )              
    }
  }

  return (
      <>
        <Container fluid className="l-main__header">
          <Container>
            <Row>
              <Col className="p-0">
                <div className="l-main__headerWrapper px-4">
                  <h1 className="title  text-light">{props.title}</h1>
                  { getBackButton() }
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
        <Container className="l-main__content px-4">
            <Row>
              <Col>
                { props.children }
              </Col>
            </Row>
        </Container>
      </>
    );
  }