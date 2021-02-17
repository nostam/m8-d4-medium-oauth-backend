import React, { Component } from "react";
import { Row, Col, Form, Button, Container, Badge } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

import "./styles.css";
class Login extends Component {
  state = {
    user: "",
    hidden: true,
  };
  url = `${process.env.REACT_APP_API_URL}/users/login`;
  submitData = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(this.url, {
        method: "POST",
        body: JSON.stringify(this.state.user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const { token, refreshToken } = await res.json();
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        this.props.history.push("/");
      } else {
        const { message } = await res.json();
        console.log(message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  onChangeHandler = (e) => {
    e.preventDefault();
    if (e.key === "Enter") this.submitData(e);
    this.setState({
      user: { ...this.state.user, [e.target.id]: e.currentTarget.value },
    });
  };
  toggleShow = (e) => {
    e.preventDefault();
    this.setState({ hidden: !this.state.hidden });
  };
  render() {
    const { user, hidden } = this.state;
    return (
      <div className="loginDiv">
        <Container>
          <Col className="loginCol mt-5">
            <div className={this.props.dontShowLogo ? "" : "shadowBox"}>
              <div className="mb-3">
                {this.props.dontShowLogo ? (
                  <h1 className="wlcT">Welcome to Medium</h1>
                ) : (
                  <h2>Sign in</h2>
                )}
                {this.props.dontShowLogo ? (
                  ""
                ) : (
                  <span>Stay updated on your world</span>
                )}
              </div>
              <Form onSubmit={(e) => this.submitData(e)}>
                <Form.Group>
                  <Form.Control
                    required
                    id="username"
                    value={user.username}
                    type="text"
                    size="lg"
                    placeholder="Email or Phone"
                    // onKeyDown={(e) => this.handleLogin(e)}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
                <Form.Group className="inputPwd">
                  <Form.Control
                    required
                    id="password"
                    value={user.password}
                    type={hidden ? "password" : "text"}
                    size="lg"
                    placeholder="Password"
                    onChange={(e) => this.onChangeHandler(e)}
                  />

                  <Badge
                    pill
                    className="inputToggle"
                    onClick={(e) => this.toggleShow(e)}
                  >
                    {hidden ? "show" : "hide"}
                  </Badge>
                </Form.Group>
                <Col className="loginCol">
                  <Button
                    type="submit"
                    className="loginBtn"
                    onClick={(e) => this.submitData(e)}
                  >
                    Sign in
                  </Button>
                </Col>
              </Form>
              <a className="forgetPwd" href="/">
                Forget your password?
              </a>
            </div>
            {this.props.dontShowLogo ? (
              ""
            ) : (
              <Row className="d-flex justify-content-around mt-5 mx-auto bg-transparent">
                New to Medium?{" "}
                <Link className="ml-1" to="/register">
                  Join now
                </Link>
              </Row>
            )}
          </Col>
        </Container>
      </div>
    );
  }
}
export default withRouter(Login);
