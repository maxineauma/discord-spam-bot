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
  
class Spam extends React.Component {

    constructor(props) {
      super(props);

      this.handleSubmit = this.handleSubmit.bind(this);

      this.state = {
        spamStatus: 0,
        statusCode: ""
      }
    }

    handleSubmit = async (e) => {
      e.preventDefault();

      this.setState((state) => ({spamStatus:1}));
      let formData = e.target;
      let fileData = new FormData();

      fileData.append("file", formData[0].files[0]);
      fileData.append("account_email", formData[1].value);
      fileData.append("account_pass", formData[2].value);
      
      console.log(fileData.get("file"));
      await axios.post("/api/spam", fileData)
      .then((resp) => { this.setState({spamStatus:0, statusCode:resp.status}); })
      .catch((err) => { this.setState({spamStatus:0, statusCode:err.response.status}); });
    }
  
    render() {

        return(
            <>
                <Navbar bg="dark" variant="dark" className="p-3">
                  <Navbar.Brand>
                      Discord Spam Bot
                  </Navbar.Brand>
                  <Nav className="justify-content-center" activeKey="/spam">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/scrape">Scraper</Nav.Link>
                    <Nav.Link href="/spam">Spammer</Nav.Link>
                  </Nav>
                </Navbar>
        
                <Container className="p-5">
                  <Jumbotron className="p-5 bg-light rounded">  
                    <h1>Spamming Tool</h1>
                    <p>If you've obtained your list of victims from the scraper tool, or have your own list, now you'll want to spam them.</p>
                      
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group className="mb-3" controlId="target_ids">
                          <Form.Label>Target IDs File</Form.Label>
                          <Form.File disabled={this.state.spamStatus > 0 ? true : false}/>
                          <Form.Text className="text-muted">You can receive this from the <a href='/scrape'>Scraping Tool</a> or generate it yourself (not recommended).</Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="account_email">
                          <Form.Label>Account Email Address</Form.Label>
                          <Form.Control placeholder="Example: sample@mail.com" disabled={this.state.spamStatus > 0 ? true : false}/>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="account_pass">
                          <Form.Label>Account Password</Form.Label>
                          <Form.Control type="password" placeholder="Example: password" disabled={this.state.spamStatus > 0 ? true : false}/>
                          <Form.Text className="text-muted">Make sure this is a burner account, you don't want to get your account banned.</Form.Text>
                      </Form.Group>

                      {/*
                      <Form.Group className="mb-3" controlId="proxy">
                          <Form.Label>Proxy Address</Form.Label>
                          <Form.Control type="password" placeholder="Example: 127.0.0.1:5035"/>
                          <Form.Text className="text-muted">This is your own preference. Inputting nothing changes nothing.</Form.Text>
                      </Form.Group>
                      */}
          
                      <Button type="submit" variant={this.state.statusCode === 200 ? "success" : this.state.statusCode === 500 ? "danger" : "primary"} disabled={this.state.spamStatus > 0 ? true : false}>
                          {
                            this.state.spamStatus === 0 && this.state.statusCode === 200 ? "Attempt finished! Spam again." :
                            this.state.spamStatus === 0 && this.state.statusCode === 500 ? "Internal server error. Try again." :
                            this.state.spamStatus === 1 ? "Attempting to spam..." :
                            "Spam!"
                          }
                      </Button>
                    </Form>
                  </Jumbotron>
                </Container>
            </>
        )

    }
  }
  
  export default Spam;