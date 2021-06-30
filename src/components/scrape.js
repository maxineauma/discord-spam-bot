import React from 'react';
import axios from 'axios';

import { 
    Container, 
    Jumbotron, 
    Navbar, 
    Nav,
    Form, 
    Button
  } from 'react-bootstrap';

class Scrape extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDownload = this.handleDownload.bind(this);

        this.state = {
            scrapeStatus: 0,
            statusCode: ""
        }
    }

    handleDownload = async(e) => {
      await axios.get('/api/download')
      .then((resp) => {
        const elem = document.createElement("a");
        const data = new Blob([resp.data], { type: "text/plain" });
        elem.href = URL.createObjectURL(data);
        elem.download = "users.txt";
        elem.click();
      });
    }
  
    handleSubmit = async (e) => {
      e.preventDefault();

      this.setState((state) => ({scrapeStatus:1, statusCode:0}));
      let formData = e.target;

      await axios.post('/api/scrape',
        {
          "account_email": formData[0].value,
          "account_pass": formData[1].value,
          "guild_id": formData[2].value,
          "channel_id": formData[3].value,
        },
      )
      .then((resp) => { this.setState({scrapeStatus:0, statusCode:resp.status}); })
      .catch((err) => { this.setState({scrapeStatus:0, statusCode:err.response.status}); });
    }
  
    render() {

        return(
            <>
                <Navbar bg="dark" variant="dark" className="p-3">
                  <Navbar.Brand>
                      Discord Spam Bot
                  </Navbar.Brand>
                  <Nav className="justify-content-center" activeKey="/scrape">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/scrape">Scraper</Nav.Link>
                    <Nav.Link href="/spam">Spammer</Nav.Link>
                  </Nav>
                </Navbar>
        
                <Container className="p-5">
                  <Jumbotron className="p-5 bg-light rounded">  
                    <h1>Scraping Tool</h1>
                    <p>If you've never used this before or are starting a new instance, you will want to scrape a server for its user ID list.</p>

                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" controlId="account_email">
                            <Form.Label>Account Email Address</Form.Label>
                            <Form.Control placeholder="Example: sample@mail.com" disabled={this.state.scrapeStatus > 0 ? true : false}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="account_pass">
                            <Form.Label>Account Password</Form.Label>
                            <Form.Control type="password" placeholder="Example: password" disabled={this.state.scrapeStatus > 0 ? true : false}/>
                            <Form.Text className="text-muted">Make sure this is a burner account, you don't want to get your account banned.</Form.Text>
                        </Form.Group>

                      <Form.Group className="mb-3" controlId="guild_id">
                          <Form.Label>Target Guild ID</Form.Label>
                          <Form.Control placeholder="Example: 620840315498004480" disabled={this.state.scrapeStatus > 0 ? true : false}/>
                          <Form.Text className="text-muted">You can get this by right clicking any server and selecting "Copy ID".</Form.Text>
                      </Form.Group>
          
                      <Form.Group className="mb-3" controlId="channel_id">
                          <Form.Label>Target Guild Channel ID</Form.Label>
                          <Form.Control placeholder="Example: 637376868965941248" disabled={this.state.scrapeStatus > 0 ? true : false}/>
                          <Form.Text className="text-muted">You can get this by right clicking any server's channel and selecting "Copy ID".</Form.Text>
                      </Form.Group>
          
                      <Button variant={this.state.statusCode === 200 ? "success" : this.state.statusCode === 400 ? "danger" : this.state.statusCode === 500 ? "danger" : "primary"} type="submit" disabled={this.state.scrapeStatus > 0 ? true : false}>
                          {
                            this.state.scrapeStatus === 0 && this.state.statusCode === 200 ? "Success! Scrape again." : 
                            this.state.scrapeStatus === 0 && this.state.statusCode === 400 ? "Bad request. Try again." : 
                            this.state.scrapeStatus === 0 && this.state.statusCode === 500 ? "Internal server error. Try again." :
                            this.state.scrapeStatus === 1 ? "Scraping..." :
                            "Scrape!"
                          } 
                      </Button>
                      
                      <p className={this.state.statusCode === 200 ? "d-block" : "d-none"}>
                        <Button variant="outline-success" onClick={this.handleDownload} className="mt-2">Download your requested data.</Button>
                      </p>
                      
                    </Form>

                  </Jumbotron>
                </Container>
            </>
        )

    }
  }
  
  export default Scrape;