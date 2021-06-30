import React from 'react';

import { 
    Container, 
    Jumbotron,
    Card,
    Row, Col,
    Navbar, 
    Nav,
    Button,
    Alert,
    Badge
  } from 'react-bootstrap';
  
class Home extends React.Component {
  
    render() {

        return(
            <>
                <Navbar bg="dark" variant="dark" className="p-3">
                  <Navbar.Brand>
                      Discord Spam Bot<sup><small><Badge variant="primary">EARLY ACCESS</Badge></small></sup>
                  </Navbar.Brand>
                  <Nav className="justify-content-center" activeKey="/">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/scrape">Scraper</Nav.Link>
                    <Nav.Link href="/spam">Spammer</Nav.Link>
                  </Nav>
                </Navbar>
        
                <Container className="p-5">
                    <Jumbotron className="p-5 bg-light rounded">
                        <h2>Getting Started</h2>
                        <p>This is a Discord spam bot tool.</p>

                        <Alert variant="info"><strong>🔧 Functionality Warning:</strong> Be sure to log in at least once from your IP address on the Discord account you're using. It <strong>cannot</strong> have 2FA.</Alert>
                        <Alert variant="danger"><strong>🐞 Bug Warning:</strong> Inputting an invalid guild ID (w/ correct credentials) causes the scraper to hang, necessitating a refresh.</Alert>
                        <Alert variant="warning"><strong>🦗 Bug Advisory:</strong> The spamming script will not validate your credentials, and the maximum run-time is <strong>1 day</strong>, as per <code>puppeteer-cluster</code>'s limitations.</Alert>

                        <Row>
                            <Col>
                                <Card className="p-5">
                                    <Card.Body>
                                        <Card.Title><a href="/scrape">Scraper Tool</a> [✔️]</Card.Title>
                                        <Card.Subtitle>Scraping User IDs from Discord server</Card.Subtitle>
                                        <hr/>
                                        <p>
                                            This tool will make a POST request to <code>/api/scrape</code> and run <code>/scripts/scrapeMembers.py</code>.<br/><br/>
                                            <span>If all goes well, you can download <code>users.txt</code> and proceed to the spammer tool. Otherwise, check your console.</span>
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col>
                                <Card className="p-5">
                                    <Card.Body>
                                        <Card.Title><a href="/spam">Spammer Tool</a> [✔️]</Card.Title>
                                        <Card.Subtitle>Sending mass-message to retrieved User IDs</Card.Subtitle>
                                        <hr/>
                                        <p>
                                            This tool will make a POST request to <code>/api/spam</code> and run <code>/scripts/messageUser.js</code>.<br/><br/>
                                            <span>This script takes a while to complete, especially if your list is large, so please be patient! If it crashes, check your console.</span>
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                    </Jumbotron>
                </Container>
            </>
        )

    }
  }
  
  export default Home;