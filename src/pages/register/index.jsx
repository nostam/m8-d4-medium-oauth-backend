import React, { Component } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import Logo from "../../assets/medium_logo.svg";
import "./styles.css";
class SignUp extends Component {
  state = {
    user: {},
    hidden: true,
  };
  url = `${process.env.REACT_APP_API_URL}/users/register`;
  header = {
    "Content-Type": "application/json",
  };
  submitData = async () => {
    try {
      let payload = this.state.user;
      let response = await fetch(this.url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        this.props.history.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  onChangeHandler = (e) => {
    this.setState({
      user: { ...this.state.user, [e.target.id]: e.currentTarget.value },
    });
  };
  handleLogin = (e) => {
    if (e.keyCode === 13) {
      this.submitData(this.state.user);
    } else {
      this.setState({
        user: { ...this.state.user, [e.target.id]: e.currentTarget.value },
      });
    }
  };
  toggleShow = (e) => {
    e.preventDefault();
    this.setState({ hidden: !this.state.hidden });
  };
  render() {
    const { hidden, user } = this.state;
    return (
      <div className="signupDiv">
        <Container className="d-flex flex-column justify-content-center align-content-center">
          {/* <Col className="d-flex justify-content-center mx-auto mt-4 flex-column text-center">
            <img
              src={Logo}
              className="mb-4"
              alt="logo"
              style={{ height: "30px" }}
            />
            <h3>Make the most of your professional life</h3>
          </Col> */}
          <Col className="signupCol mt-5 signupBox">
            <div className="bg-white d-flex flex-column ">
              <Form>
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        required
                        id="firstName"
                        value={user.firstName}
                        type="text"
                        size="sm"
                        placeholder="Your first name"
                        onKeyDown={(e) => this.handleLogin(e)}
                        onChange={(e) => this.onChangeHandler(e)}
                      />
                    </Col>
                    <Col>
                      <Form.Label>Lastname</Form.Label>
                      <Form.Control
                        required
                        id="lastName"
                        value={user.lastName}
                        type="text"
                        size="sm"
                        placeholder="Your Lastname"
                        onKeyDown={(e) => this.handleLogin(e)}
                        onChange={(e) => this.onChangeHandler(e)}
                      />
                    </Col>
                  </Row>
                </Form.Group>
                {/* <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    id="email"
                    value={user.email}
                    type="text"
                    size="sm"
                    placeholder="Your Email"
                    onKeyDown={(e) => this.handleLogin(e)}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group> */}
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    id="username"
                    value={user.username}
                    type="text"
                    size="sm"
                    placeholder="Email or Phone"
                    onKeyDown={(e) => this.handleLogin(e)}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
                <Form.Group className="inputPwd">
                  <Form.Label>Password (6 or more characters)</Form.Label>
                  <Form.Control
                    required
                    id="password"
                    value={user.password}
                    type={hidden ? "password" : "text"}
                    size="sm"
                    placeholder="Password"
                    onKeyDown={(e) => this.handleLogin(e)}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
              </Form>
              <span>
                By clicking Agree & Join, you agree to the LinkedIn
                <a href="/">User Agreement</a>, <a href="/">Privacy Policy</a>,
                and
                <a href="/">Cookie Policy</a>.
              </span>
              <Col className="signupCol px-0">
                <Button
                  // className="signupBtn"
                  variant="outline-secondary"
                  onClick={() => this.submitData()}
                >
                  Agree & Join
                </Button>
              </Col>
            </div>
            <Row className="d-flex justify-content-around mt-4 mx-auto ">
              Already on Medium?{" "}
              <Link className="ml-1" to="/login">
                {" "}
                Sign in
              </Link>
            </Row>
          </Col>
        </Container>
      </div>
    );
  }
}

export default withRouter(SignUp);
